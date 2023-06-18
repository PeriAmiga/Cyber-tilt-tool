from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, Boolean, Date
from config.db import meta
from pydantic import BaseModel

companys = Table(
    'Company', meta,
    Column('companyID', Integer, primary_key=True),
    Column('name', String(128)),
    Column('address', String),
    Column('isActivate', Boolean),
)
