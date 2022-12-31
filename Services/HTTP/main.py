from typing import Union
from fastapi import FastAPI,Response,Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from data import FAKE_ADMIN,FAKE_USERS,FAKE_EMPLOYMENTS,FAKE_ADMINS_DETAILS

app = FastAPI()

@app.get("/login")
def login(username: str, password: str,response: Response):
    if FAKE_ADMIN.get(username) is None or FAKE_ADMIN[username] != password:
        # response.delete_cookies(key="Admin")
        return HTMLResponse(content="No permissions!", status_code=403)
    response.set_cookie(key="Admin", value="true", secure=True)
    html = """
        <div class="container">
            <div class="vertical-center">
                <p class="p-container">
                    <button id="btn1">Users Details</button>
                    <button id="btn2">Company Employments Details</button>
                    <button id="btn3">Administrator Details</button>
                </p>
            </div>
        </div>
        <div class="table"></div>
        <script src="script.js"></script>
        """
    return HTMLResponse(content=html, status_code=200)


@app.get("/UsersDetails")
def usersDetails(request: Request):
    isAdmin = request.cookies.get("Admin")
    if (isAdmin != "true"):
        return JSONResponse(content="No permissions!", status_code=403)
    return JSONResponse(content=FAKE_USERS, status_code=200)

@app.get("/EmploymentsDetails")
def getEmployments(request: Request):
    isAdmin = request.cookies.get("Admin")
    if (isAdmin != "true"):
        return JSONResponse(content="No permissions!", status_code=403)
    return JSONResponse(content=FAKE_EMPLOYMENTS, status_code=200)

@app.get("/AdministratorDetails")
def getAdministratorDetails(request: Request):
    isAdmin = request.cookies.get("Admin")
    if (isAdmin != "true"):
        return JSONResponse(content="No permissions!", status_code=403)
    return JSONResponse(content=FAKE_ADMINS_DETAILS, status_code=200)

app.mount("/", StaticFiles(directory="dist", html = True), name="static")