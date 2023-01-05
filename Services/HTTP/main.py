from fastapi import FastAPI,Response, HTTPException, Depends,Request,Cookie
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
from data import FAKE_ADMIN,FAKE_USERS,FAKE_EMPLOYMENTS,FAKE_ADMINS_DETAILS
from datetime import timedelta
from typing import Tuple, Optional, Any

from fastapi.responses import StreamingResponse

from uuid import UUID, uuid4
from auth.SessionData import SessionData,User
from auth.BasicVerifier import BasicVerifier
from fastapi_sessions.backends.implementations import InMemoryBackend
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters
import socket

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

templates = Jinja2Templates(directory="dist")
@app.get("/")
async def index(request:Request, session_data: Optional[SessionData] = Depends(cookie)): # cookie:str | None = Cookie(default=None)
    if str(session_data) == 'No session cookie attached to request':
        return templates.TemplateResponse("index.html", {"request": request})
    else:
        return templates.TemplateResponse("menu.html", context={'request': request})
    

@app.post("/login")
async def login(request:Request, user: User):

    host_name = socket.gethostname()
    client_ip = socket.gethostbyname(host_name)

    print("Host name is: {}".format(host_name))
    print("Client IP Address: {}".format(client_ip))


    if FAKE_ADMIN.get(user.username) is None or FAKE_ADMIN[user.username] != user.password:
        return HTMLResponse(content="No permissions!", status_code=403)
    response = templates.TemplateResponse("menu.html", context={'request': request})
    session = uuid4()
    data = SessionData(username=user.username)
    await backend.create(session, data)
    cookie.attach_to_response(response, session)
    print(f"created session for {user.username}")
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