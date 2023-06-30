from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, Boolean, Date
from config.db import meta
from pydantic import BaseModel

users = Table(
    'User', meta,
    Column('userID', Integer, primary_key=True),
    Column('password', String(64)),
    Column('fullName', String(256)),
    Column('email', String(256)),
    Column('phone', String(15)),
    Column('birthdate', Date),
    Column('registerDate', DateTime),
    Column('companyID', Integer,  ForeignKey('Company.companyID')),
    Column('isSysAdmin', Boolean),
    Column('isCompanyAdmin', Boolean),
    Column('isActive', Boolean),
)


class loginUser(BaseModel):
    email: str
    password: str
