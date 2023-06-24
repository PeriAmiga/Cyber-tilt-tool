from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.sql.sqltypes import Integer, String, DateTime
from config.db import meta
from sqlalchemy.orm import relationship

reports = Table(
    'Report', meta,
    Column('reportID', Integer, primary_key=True),
    Column('createAt', DateTime),
    Column('attackerID', Integer, ForeignKey('Attacker.attackerID')),
    Column('trapID', Integer, ForeignKey('Trap.trapID')),
    Column('sessionLogID', String(32), ForeignKey('Log.sessionID')),
    Column('companies_services_id', Integer,
           ForeignKey('Companies_Services.ID'))
)
