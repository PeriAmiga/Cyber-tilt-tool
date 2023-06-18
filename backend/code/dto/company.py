from pydantic import BaseModel
from typing import Optional


class CompanyDTO(BaseModel):
    name: str
    address: str
    isActivate: Optional[bool] = True
