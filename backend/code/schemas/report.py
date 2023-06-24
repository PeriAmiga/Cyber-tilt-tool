
from pydantic import BaseModel
from datetime import datetime


class Report(BaseModel):
    reportID: int
    createAt: datetime
    companies_services_id: int
    attackerID: int
    trapID: int
    sessionLogID: str


def ReportEntity(item) -> dict:
    return {
        "reportID": item[0],
        "createAt": str(item[1]),
        # "companies_services_id": item[2],
        "attackerID": item[3],
        "trapID": item[4],
        "sessionLogID": item[5],
        "companies_services_id": item[6],
        "companies_services_name": item[7],
        "companies_services_port": int(item[8]),
        "companyID": int(item[9]),
        "serviceID": int(item[10])
    }


def ReportsEntity(entity) -> list:
    return [ReportEntity(item) for item in entity]
