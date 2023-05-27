from fastapi import APIRouter, status, Depends
from fastapi.responses import ORJSONResponse, JSONResponse
from config.db import conn
from models.index import reports, users
from schemas.index import ReportsEntity, hash
from .auth import cookie
from auth.SessionData import SessionData
from .auth import verifier
import re
import config.common
from dto.user import UserDTO
from datetime import datetime

user = APIRouter(
    prefix="/api/user",
    tags=["User"],
    default_response_class=ORJSONResponse
)
config_ = config.common.load_config()


@user.get('/getReports', dependencies=[Depends(cookie)])
async def getReports(session_data: SessionData = Depends(verifier)):
    data = conn.execute(reports.select().where(
        reports.c.companyID == session_data.companyID))
    return ORJSONResponse(ReportsEntity(data), status_code=status.HTTP_200_OK)


@user.post('/register')
async def register(user: UserDTO):
    is_match = re.fullmatch(config_['regex_password'], user.password)
    if not is_match:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST,
                            content="The password must include:\nAt least 10 characters \n any of the special characters: @#$%^&+=! \n numbers: 0-9 \n lowercase letters: a-z \n uppercase letters: A-Z")
    user.password = hash(user.password)

    conn.execute(users.insert().values(
        email=user.email,
        password=user.password,
        phone=user.phone,
        fullName=user.fullName,
        birthdate=user.birthdate,
        registerDate=datetime.now(),
        companyID=user.companyID,
        isSysAdmin=user.isSysAdmin,
        isCompanyAdmin=user.isCompanyAdmin,
        isActive=user.isActive
    ))

    return JSONResponse(status_code=status.HTTP_201_CREATED, content="")
