from fastapi import APIRouter, status
from fastapi.responses import ORJSONResponse
from config.db import conn
from models.attacker import attackers
from schemas.index import AttackerEntity
from dto.attacker import AttackerDTO

attacker = APIRouter(
    prefix="/api/attacker",
    tags=["Attacker"],
    default_response_class=ORJSONResponse
)


@attacker.get('/{id}')
async def get_attacker_by_id(id: int):
    att = conn.execute(attackers.select().where(
        attackers.c.attackerID == id)).fetchone()
    return AttackerEntity(att)


@attacker.get('/ip/{ip}')
async def get_attacker_by_ip(ip: str):
    att = conn.execute(attackers.select().where(
        attackers.c.ip == ip)).fetchone()
    if att is None:
        return ORJSONResponse(content="Not Found", status_code=status.HTTP_404_NOT_FOUND)
    return ORJSONResponse(content=AttackerEntity(att), status_code=200)


# If the ip exists, return the ID; if not, create and return ID
@attacker.post('')
async def get_attacker(attackerDTO: AttackerDTO):
    res_attacker_by_ip = await get_attacker_by_ip(attackerDTO.ip)
    if res_attacker_by_ip.status_code == 200:
        return ORJSONResponse(content=res_attacker_by_ip.body.AttackerID, status_code=200)
    else:
        result = conn.execute(attackers.insert(attackerDTO))
        return ORJSONResponse(content=result.scalars().unique().first(), status_code=201)
