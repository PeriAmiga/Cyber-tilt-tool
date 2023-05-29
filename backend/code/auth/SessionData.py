from pydantic import BaseModel
from typing import Optional


class SessionData(BaseModel):
    fullName: str
    email: str
    companyName: str
    companyID: Optional[int] = None
    isSysAdmin: bool
    isCompanyAdmin: bool
