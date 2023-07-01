
from pydantic import BaseModel
from typing import Optional


class Company(BaseModel):
    companyID: int
    name: str
    address: str
    isActivate: bool
    serviceName: Optional[any] = None  # ??


def CompanyEntity(item, isDict=True) -> Company:
    company = Company(
        companyID=int(item[0]),
        name=item[1],
        address=item[2],
        isActivate=item[3],
    )
    if isDict:
        return company.dict()
    return company


def CompaniesEntity(entity, isDict=True) -> list:
    return [CompanyEntity(item, isDict) for item in entity]
