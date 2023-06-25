
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
        "sessionLogID": item[4],
        "companies_services_id": item[6],
        "companies_services_name": item[7],
        "companies_services_port": int(item[8]),
        "attackerIP": item[12],
        "attackerLocation": item[13],
        "trapName": item[15],
        "trapDescription": item[17],
        "companyName": item[20]
    }


def ReportsEntity(entity) -> list:
    return [ReportEntity(item) for item in entity]
