
from pydantic import BaseModel
from datetime import datetime


class Token(BaseModel):
    id: int
    token: str
    email: str
    expired: str


def TokenEntity(item) -> dict:
    return {
        "id": item[0],
        "token": item[1],
        "email": item[2],
        "expired": item[3],
    }


def TokensEntity(entity) -> list:
    return [TokenEntity(item) for item in entity]
