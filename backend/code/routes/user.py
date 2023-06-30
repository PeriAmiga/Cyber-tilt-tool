from fastapi import APIRouter, status, Depends
from fastapi.responses import ORJSONResponse, JSONResponse
from config.db import conn
from models.index import reports, users, companies
from schemas.index import hash
from .auth import cookie
from auth.SessionData import SessionData
from .auth import verifier
import re
import config.common
from dto.user import UserDTO
from datetime import datetime, date

user = APIRouter(
    prefix="/api/user",
    tags=["User"],
    default_response_class=ORJSONResponse
)
config_ = config.common.load_config()


@user.get('/')
async def getAll():
    data = conn.execute(users.select()).fetchall()
    return ORJSONResponse(data, status_code=status.HTTP_200_OK)


@user.get('/register')
async def register(password: str, email: str, fullName: str, phone: str, birthdate: date, companyName: str):
    is_match = re.fullmatch(config_['regex_password'], password)
    if not is_match:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST,
                            content="The password must include:\nAt least 10 characters \n any of the special characters: @#$%^&+=! \n numbers: 0-9 \n lowercase letters: a-z \n uppercase letters: A-Z")

    # Checking that the email does not exist
    db_select_user = conn.execute(users.select().where(
        users.c.email == email or users.c.phone == phone)).fetchone()
    if db_select_user is not None:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="BAD_REQUEST")

    password = hash(password)

    query = companies.select().where(companies.c.name == companyName)
    companyID = conn.execute(query).fetchone()
    companyID = companyID[0]
    conn.execute(users.insert().values(
        email=email,
        password=password,
        phone=phone,
        fullName=fullName,
        birthdate=birthdate,
        registerDate=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        companyID=companyID,
        isSysAdmin=False,
        isCompanyAdmin=False,
        isActive=True
    ))
    conn.commit()

    return JSONResponse(status_code=status.HTTP_201_CREATED, content="")
