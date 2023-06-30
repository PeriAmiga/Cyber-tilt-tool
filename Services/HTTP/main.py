from fastapi import FastAPI,Response, HTTPException, Depends,Request,Cookie
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
from data import FAKE_ADMIN,FAKE_USERS,FAKE_EMPLOYMENTS,FAKE_ADMINS_DETAILS, SQL_INJECTION_LOGIN, SQL_INJECTION_DAMAGE
from datetime import timedelta, datetime
from typing import Tuple, Optional, Any

from fastapi.responses import StreamingResponse

from uuid import UUID, uuid4
from auth.SessionData import SessionData,User
from auth.BasicVerifier import BasicVerifier
from fastapi_sessions.backends.implementations import InMemoryBackend
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters
import socket

from config.db import mydb

app = FastAPI()

cookie_params = CookieParameters()
# Uses UUID
cookie = SessionCookie(
    cookie_name="cookie",
    identifier="general_verifier",
    auto_error=False,
    secret_key="DONOTUSE",
    cookie_params=cookie_params,
)
backend = InMemoryBackend[UUID, SessionData]()
verifier = BasicVerifier(
    identifier="general_verifier",
    auto_error=True,
    backend=backend,
    auth_http_exception=HTTPException(status_code=403, detail="invalid session"),
)

host_name = socket.gethostname()
client_ip = socket.gethostbyname(host_name)


templates = Jinja2Templates(directory="dist")
@app.get("/")
async def index(request:Request, session_data: Optional[SessionData] = Depends(cookie)): # cookie:str | None = Cookie(default=None)
    if str(session_data) == 'No session cookie attached to request':
        return templates.TemplateResponse("index.html", {"request": request})
    else:
        return templates.TemplateResponse("menu.html", context={'request': request})
    


def write_attacker_details():
    f = open("dist/loginIP.txt", "a")
    f.write(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")}: ')
    f.write(f"Client IP: {client_ip} ")
    f.write(f"Host Name: {host_name}\n")
    f.close()

def init_report(host):



def is_access_fake_login():
    ## get item by IP from ipfollow
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Services_HTTP_IPFOLLOW WHERE ip = %s"
    val = (client_ip, )
    mycursor.execute(sql, val)
    data = mycursor.fetchall()
    print("data", data)
    if len(data) == 0:
        mycursor = mydb.cursor()
        sql = "INSERT INTO Services_HTTP_IPFOLLOW (ip, counter, last_date_login) VALUES (%s, %s, %s)"
        now = datetime.now().strftime("%Y-%m-%d")
        val = (client_ip, '1', now)
        mycursor.execute(sql, val)
    else:
        ip_data = data[0]
        last_date_login = datetime.strptime(ip_data[3], "%Y-%m-%d")
        now = datetime.now().strftime("%Y-%M-%D")
        delta = datetime.strptime(now) - last_date_login
        days = delta.days
        if days >= 2:
            update_Services_HTTP_IPFOLLOW(1, ip_data[0])
        elif int(ip_data[2]) == 5:
            update_Services_HTTP_IPFOLLOW(0, ip_data[0])
            return True
        else:
            counter = int(ip_data[2]) + 1
            update_Services_HTTP_IPFOLLOW(counter, ip_data[0])
    return False
        
def update_Services_HTTP_IPFOLLOW(counter, id):
    mycursor = mydb.cursor()
    sql = "UPDATE Services_HTTP_IPFOLLOW SET counter = %s, last_date_login = %s WHERE ip_id = %s"
    val = (counter, datetime.now().strftime("%Y-%m-%d"), id)
    mycursor.execute(sql, val)

@app.post("/login")
async def login(request:Request, user: User):
    is_login_sql_injection = any(str.lower() in user.username.lower() or str.lower() in user.password.lower() for str in SQL_INJECTION_LOGIN)

    if any(str.lower() in user.username.lower() or str.lower() in user.password.lower() for str in SQL_INJECTION_DAMAGE):
        return HTMLResponse(content="No permissions!", status_code=403)

    if not is_login_sql_injection and (FAKE_ADMIN.get(user.username) is None or FAKE_ADMIN[user.username] != user.password):
        if not is_access_fake_login():
            return HTMLResponse(content="No permissions!", status_code=403)

    init_report(request.client.host)

    response = templates.TemplateResponse("menu.html", context={'request': request})
    session = uuid4()
    data = SessionData(username=user.username)
    await backend.create(session, data)
    cookie.attach_to_response(response, session)
    return response

@app.get("/UsersDetails", dependencies=[Depends(cookie)])
def usersDetails(session_data: Optional[SessionData] = Depends(cookie)):
    if str(session_data) == 'No session cookie attached to request':
        raise HTTPException(
            status_code=403,
            detail="Not authenticated"
        )
    return JSONResponse(content=FAKE_USERS, status_code=200)
@app.get("/EmploymentsDetails", dependencies=[Depends(cookie)])
def getEmployments(session_data: Optional[SessionData] = Depends(cookie)):
    if str(session_data) == 'No session cookie attached to request':
        raise HTTPException(
            status_code=403,
            detail="Not authenticated"
        )
    return JSONResponse(content=FAKE_EMPLOYMENTS, status_code=200)
@app.get("/AdministratorDetails", dependencies=[Depends(cookie)])
def getAdministratorDetails(session_data: Optional[SessionData] = Depends(cookie)):
    print("session_data", session_data)
    if str(session_data) == 'No session cookie attached to request':
        raise HTTPException(
            status_code=403,
            detail="Not authenticated"
        )
    return JSONResponse(content=FAKE_ADMINS_DETAILS, status_code=200)


@app.get("/whoami", dependencies=[Depends(cookie)])
async def whoami(session_data: SessionData = Depends(verifier)):
    return session_data
@app.post("/create_session/{name}")
async def create_session(name: str, response: Response):
    session = uuid4()
    data = SessionData(username=name)
    await backend.create(session, data)
    cookie.attach_to_response(response, session)
    return f"created session for {name}"
@app.post("/logout")
async def del_session(request:Request , session_id: UUID = Depends(cookie)):
    response = templates.TemplateResponse("index.html", {"request": request})
    response.delete_cookie("cookie")
    print("session_id", session_id)
    return response

@app.post("/delete_session")
async def del_session(response: Response, session_id: UUID = Depends(cookie)):
    await backend.delete(session_id)
    cookie.delete_from_response(response)
    return "deleted session"

app.mount("/", StaticFiles(directory="dist", html = True), name="static")