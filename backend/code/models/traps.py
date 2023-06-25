from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, Boolean, Date
from config.db import meta
from pydantic import BaseModel

traps = Table(
    'Trap', meta,
    Column('trapID', Integer, primary_key=True),
    Column('name', String(30)),
    Column('serviceID', Integer, ForeignKey('Service.serviceID')),
    Column('description', String),
    Column('isActivate', Boolean),
)
