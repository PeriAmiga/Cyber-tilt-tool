from pydantic import BaseModel
from datetime import datetime


class CreateReportDTO(BaseModel):
    attackerIP: str
    trapID: int
    companyID: int
    serviceID: int
