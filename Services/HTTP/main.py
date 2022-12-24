from typing import Union
from fastapi import FastAPI,Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from data import FAKE,USERS

app = FastAPI()

@app.get("/login", response_class=HTMLResponse)
def login(username: str, password: str,response: Response):
    if FAKE[username] is NULL and FAKE[username] != password:
        return "<h4>No permissions!</h4>"
    response.set_cookie(key="admin", value="ture")
    return """
               <html>
                   <head>
                       <title>bla</title>
                   </head>
                   <body>
                   <b>tesrt</b>
                   </body>
               </html>
               """

@app.get("/UsersDetails")
def login():
    #if not isAdmin:
    #    return ORJSONResponse("No permissions!", status_code=status.HTTP_403_FORBIDDEN)
    return JSONResponse(content=USERS, status_code=200)

app.mount("/", StaticFiles(directory="dist", html = True), name="static")