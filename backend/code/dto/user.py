from datetime import date
from pydantic import BaseModel


class UserDTO(BaseModel):
    password: str
    email: str
    fullName: str
    phone: str
    birthdate: date
    companyID: int
    isSysAdmin: bool = False
    isCompanyAdmin: bool = False
    isActive: bool = True
