
from pydantic import BaseModel
from datetime import datetime


class Attacker(BaseModel):
    AttackerID: int
    ip: str
    location: str


def AttackerEntity(item, isDict=True) -> Attacker:
    attacker = Attacker(
        AttackerID=int(item[0]),
        ip=item[1],
        location=item[2]
    )

    if isDict:
        return attacker.dict()
    return attacker


def AttackersEntity(entity, isDict=True) -> list:
    return [AttackerEntity(item, isDict) for item in entity]
