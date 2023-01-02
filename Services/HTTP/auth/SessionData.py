from pydantic import BaseModel

class SessionData(BaseModel):
    username: str


class User(BaseModel):
    username: str
    password: str