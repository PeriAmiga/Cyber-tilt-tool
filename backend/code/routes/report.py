from fastapi import APIRouter, status, Depends
from fastapi.responses import ORJSONResponse, JSONResponse
from config.db import conn
from schemas.index import ReportsEntity
from .auth import cookie
from auth.SessionData import SessionData
from .auth import verifier
from models.index import reports, companies_Services

report = APIRouter(
    prefix="/api/report",
    tags=["Report"],
    default_response_class=ORJSONResponse
)


@report.get("/", dependencies=[Depends(cookie)])
async def get_all(session_data: SessionData = Depends(verifier)):
    if session_data is None or not session_data.isSysAdmin:
        return ORJSONResponse("UNAUTHORIZED", status_code=status.HTTP_401_UNAUTHORIZED)
    q = reports.join(companies_Services,
                     companies_Services.c.companyID == session_data.companyID).select()
    data = conn.execute(q).fetchall()
    print(data)
    return ORJSONResponse(ReportsEntity(data), status_code=status.HTTP_200_OK)
