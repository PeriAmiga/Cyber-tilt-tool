from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, Boolean, Date
from config.db import meta
from pydantic import BaseModel

tokens = Table(
    'Token', meta,
    Column('id', Integer, primary_key=True),
    Column('token', String(125)),
    Column('email', String(45)),
    Column('expired', String(100)),
)