from datetime import date
from pydantic import BaseModel
from typing import Optional


class UserDTO(BaseModel):
    password: str
    email: str
    fullName: str
    phone: str
    birthdate: date
    companyID:  Optional[int] = 1
    isSysAdmin: bool = False
    isCompanyAdmin: bool = False
    isActive: bool = True
