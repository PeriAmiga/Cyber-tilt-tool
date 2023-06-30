from fastapi import APIRouter, status, Depends
from fastapi.responses import ORJSONResponse, JSONResponse
from config.db import conn
from models.index import companies, users, companies_Services, service
from schemas.index import companiesEntity
from .auth import cookie
from auth.SessionData import SessionData
from .auth import verifier
from dto.company import CompanyDTO
from schemas.user import UsersEntity


company = APIRouter(
    prefix="/api/company",
    tags=["Company"],
    default_response_class=ORJSONResponse
)


@company.get("/", dependencies=[Depends(cookie)])
async def get_all(session_data: SessionData = Depends(verifier)):
    if not session_data.isSysAdmin:
        return ORJSONResponse("UNAUTHORIZED", status_code=status.HTTP_401_UNAUTHORIZED)

    data = conn.execute(companies.select()).fetchall()
    return ORJSONResponse(companiesEntity(data), status_code=status.HTTP_200_OK)


@company.post("/", dependencies=[Depends(cookie)])
async def create(companyDTO: CompanyDTO):
    conn.execute(companies.insert().values(
        name=companyDTO.name,
        address=companyDTO.address,
        isActivate=companyDTO.isActivate,
    ))
    conn.commit()
    return ORJSONResponse("", status_code=status.HTTP_201_CREATED)

@company.get("/users", dependencies=[Depends(cookie)])
async def get_users(session_data: SessionData = Depends(verifier)):
    if session_data.isSysAdmin:
        q = users.join(companies)
        data = conn.execute(q.select()).fetchall()
        return ORJSONResponse(UsersEntity(data, True), status_code=status.HTTP_200_OK)
    elif session_data.isCompanyAdmin:
        data = conn.execute(users.select().where(users.c.companyID == session_data.companyID)).fetchall()
        return ORJSONResponse(UsersEntity(data, True), status_code=status.HTTP_200_OK)
    return ORJSONResponse("UNAUTHORIZED", status_code=status.HTTP_401_UNAUTHORIZED)

@company.get('/register')
async def register(companyName: str, address: str):
    # Checking that the company does not exist
    db_select_company = conn.execute(companies.select().where(companies.c.name == companyName)).fetchone()
    if db_select_company is not None:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="BAD_REQUEST")

    conn.execute(companies.insert().values(
        name=companyName,
        address=address,
        isActivate=True
    ))
    conn.commit()

    return JSONResponse(status_code=status.HTTP_201_CREATED, content="")

#@company.get('/companies', dependencies=[Depends(cookie)])
#async def companies(session_data: SessionData = Depends(verifier)):
    #if session_data.isSysAdmin:
        #q = companies.join(companies_Services)
        #query = joined_table.select().where(companies.c.companyID == companies_Services.c.companyID)
        #data = conn.execute(q.select()).fetchall()
        #print("LOOK HERE:", data)
        #return JSONResponse("data", status_code=status.HTTP_200_OK)
    #return JSONResponse("UNAUTHORIZED", status_code=status.HTTP_401_UNAUTHORIZED)