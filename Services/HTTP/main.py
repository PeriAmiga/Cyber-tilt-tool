from typing import Union
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.get("/login")
def login(username: str, password: str):
    return {
        "UserName": username,
        "Password" : password
    }

app.mount("/", StaticFiles(directory="dist", html = True), name="static")