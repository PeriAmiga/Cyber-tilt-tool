from fastapi import APIRouter, status
from fastapi.responses import ORJSONResponse
from config.db import conn
from models.index import logs, reports, attackers, companies_Services
from schemas.index import Log, LogsEntity, LogEntity
from datetime import datetime
import uuid
from dto.report import CreateReportDTO

# TODO: imp auth
logger = APIRouter(
    prefix="/api/log",
    tags=["Logger"],
    default_response_class=ORJSONResponse
)

"""
Test
"""


@logger.get('get_all')
async def get_all():
    data = conn.execute(logs.select()).fetchall()
    return LogsEntity(data)


"""
Add new log
"""


@logger.post('')
async def add_log(log: Log):
    now = datetime.now()
    conn.execute(logs.insert().values(
        sessionID=log.sessionID,
        createAt=now.strftime("%Y-%m-%d %H:%M:%S"),
        description=log.description
    ))
    conn.commit()
    return ORJSONResponse('CREATED', status_code=status.HTTP_201_CREATED)

"""
Create new report and return `SessionID`
"""


@logger.post('/init')
async def init(report: CreateReportDTO):
    attacker = conn.execute(attackers.select().where(
        attackers.c.ip == report.attackerIP
    )).fetchone()
    if attacker is None:
        attacker = conn.execute(attackers.insert().values(
            ip=report.attackerIP
        )).first()
    session_id = uuid.uuid4().hex
    now = datetime.now()
    # create first log
    conn.execute(logs.insert().values(
        sessionID=session_id,
        createAt=now.strftime("%Y-%m-%d %H:%M:%S"),
        description="INIT Report"
    ))
    # get id of link of company to service
    companies_services_data = conn.execute(companies_Services.select().where(
        (companies_Services.c.companyID == report.companyID) & (
            companies_Services.c.serviceID == report.serviceID)
    )).fetchone()
    # create report
    conn.execute(reports.insert().values(
        companies_services_id=int(companies_services_data[0]),
        attackerID=attacker[0],
        trapID=report.trapID,
        sessionLogID=session_id,
        createAt=now.strftime("%Y-%m-%d %H:%M:%S"),
    ))
    conn.commit()
    return ORJSONResponse(session_id, status_code=status.HTTP_201_CREATED)

"""
Get logs by SessionID
"""


@logger.get('/{session}')
async def get_logs_by_session(session: str):
    query = logs.select().where(
        logs.c.sessionID == session)
    data = conn.execute(query).fetchall()
    return ORJSONResponse(LogsEntity(data), status_code=status.HTTP_200_OK)
