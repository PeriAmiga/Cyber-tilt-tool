
from pydantic import BaseModel
from datetime import datetime, date
import bcrypt
from typing import Optional


class LogIn():
    email: str
    password: str


class User(BaseModel):
    userID: int
    password: str
    email: str
    fullName: str
    phone: str
    birthdate: date
    registerDate: datetime
    companyID: Optional[int] = None
    isSysAdmin: bool
    isCompanyAdmin: bool
    isActive: bool
    companyName: Optional[str] = None


def UserEntity(item, isDict=False) -> User:
    if len(item) < 12:
        user = User(
            userID=int(item[0]),
            password=item[1],
            fullName=item[2],
            email=item[3],
            phone=item[4],
            birthdate=item[5],
            registerDate=item[6],
            companyID=item[7],
            isSysAdmin=bool(item[8]),
            isCompanyAdmin=bool(item[9]),
            isActive=bool(item[10])
        )
    else:
        user = User(
            userID=int(item[0]),
            password=item[1],
            fullName=item[2],
            email=item[3],
            phone=item[4],
            birthdate=item[5],
            registerDate=item[6],
            companyID=item[7],
            isSysAdmin=bool(item[8]),
            isCompanyAdmin=bool(item[9]),
            isActive=bool(item[10]),
            companyName=item[12],
        )
    if isDict:
        return user.dict()
    return user


def UsersEntity(entity, isDict=False) -> list:
    return [UserEntity(item, isDict) for item in entity]


def hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def validate_password(password: str, password_hash: str) -> bool:
    return bcrypt.hashpw(password.encode('utf-8'), password_hash.encode('utf-8')) == password_hash.encode('utf-8')
