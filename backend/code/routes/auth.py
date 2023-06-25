from fastapi import APIRouter, status, HTTPException, Depends
from config.db import conn
from hashlib import sha1
from datetime import datetime, timedelta
import secrets
import smtplib
import os
from fastapi.responses import JSONResponse
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from models.user import loginUser, users
from models.token import tokens
from models.company import companies
from schemas.token import TokenEntity
from schemas.user import validate_password, hash
from fastapi_sessions.backends.implementations import InMemoryBackend
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters
from auth.BasicVerifier import BasicVerifier
from auth.SessionData import SessionData
from uuid import UUID, uuid4
from schemas.user import UserEntity

auth = APIRouter(
    prefix="/api/auth",
    tags=["Auth"],
)

cookie_params = CookieParameters()
cookie = SessionCookie(
    cookie_name="cookie",
    identifier="general_verifier",
    auto_error=True,
    secret_key="MosheTomerPeri",
    cookie_params=cookie_params,
)
backend = InMemoryBackend[UUID, SessionData]()
verifier = BasicVerifier(
    identifier="general_verifier",
    auto_error=True,
    backend=backend,
    auth_http_exception=HTTPException(
        status_code=403, detail="invalid session"),
)


@auth.post("/login")
async def login(user: loginUser):
    # Get User from DB
    query = users.select().where(users.c.email == user.email)
    data = conn.execute(query).fetchall()
    print("auth", data)
    if len(data) == 0:
        return JSONResponse("Invalid User!", status_code=status.HTTP_401_UNAUTHORIZED)
    user_entity = UserEntity(data[0], False)

    is_successfull = validate_password(user.password, user_entity.password)

    if is_successfull:
        response = JSONResponse("Welcome :)", status_code=status.HTTP_200_OK)
        session = uuid4()
        query_company = companies.select().where(
            companies.c.companyID == user_entity.companyID)
        data_company = conn.execute(query_company).fetchone()
        sessionData = SessionData(
            email=user.email,
            companyName=data_company[1],
            companyID=user_entity.companyID,
            fullName=user_entity.fullName,
            isSysAdmin=user_entity.isSysAdmin,
            isCompanyAdmin=user_entity.isCompanyAdmin,
            phone=user_entity.phone,
            birthdate=user_entity.birthdate.strftime("%d/%h/%Y")
        )
        await backend.create(session, sessionData)
        cookie.attach_to_response(response, session)
        return response
    else:
        response = JSONResponse(
            "Invalid User!", status_code=status.HTTP_401_UNAUTHORIZED)
        return response


@auth.get("/whoami", dependencies=[Depends(cookie)])
async def whoami(session_data: SessionData = Depends(verifier)):
    return session_data


@auth.post("/logout")
async def del_session(session_id: UUID = Depends(cookie)):
    response = JSONResponse({}, status_code=status.HTTP_200_OK)
    response.delete_cookie("cookie")
    return response


@auth.get('/sendMail')
def send_mail(email: str):

    # check if the email is exist in the db
    db_select_user = conn.execute(users.select().where(
        users.c.email == email)).fetchone()
    if db_select_user is None:
        return JSONResponse("Forbidden", status_code=status.HTTP_403_FORBIDDEN)

    # create token
    random_value = secrets.token_hex(16)
    token = sha1(random_value.encode()).hexdigest()

    # expired
    expired = datetime.now() + timedelta(minutes=15)
    expired = expired.strftime('%Y-%m-%d %H:%M:%S')

    # save in DB
    conn.execute(tokens.insert().values(
        token=token,
        email=email,
        expired=expired
    ))
    conn.commit()

    # send mail
    EMAIL_USER = os.environ.get('EMAIL_USER')
    EMAIL_PASS = os.environ.get('EMAIL_PASS')

    # Setup the MIME
    message = MIMEMultipart()
    message['From'] = EMAIL_USER
    message['To'] = email
    message['Subject'] = 'Change password'
    message.attach(
        MIMEText(f"Your token for change password: {token}", 'plain'))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, [email], message.as_string())
    return JSONResponse("Sent", status_code=status.HTTP_202_ACCEPTED)


@auth.get('/checkToken')
def check_token(email: str, token: str):
    # check if the email and token is exist in the db
    query = tokens.select().where((tokens.c.email == email) & (tokens.c.token == token))
    db_select_token = conn.execute(query).fetchone()
    expired_token = datetime.strptime(TokenEntity(db_select_token)[
                                      'expired'], '%Y-%m-%d %H:%M:%S')
    is_expired = datetime.now() > expired_token
    if db_select_token is None or is_expired:
        return JSONResponse("Forbidden", status_code=status.HTTP_403_FORBIDDEN)
    else:
        response = JSONResponse(
            "Token Accepted", status_code=status.HTTP_202_ACCEPTED)
        # Set 'newpassword' value to true
        response.set_cookie("newpassword", "true")
        return response


@auth.get('/resetPassword')
def reset_password(email: str, password: str):
    # check if the email
    query = users.select().where(users.c.email == email)
    db_select_user = conn.execute(query).fetchone()
    if db_select_user is None:
        response.delete_cookie("newpassword")
        return JSONResponse("Forbidden", status_code=status.HTTP_403_FORBIDDEN)
    else:
        update_query = users.update().where(
            users.c.email == email).values(password=hash(password))
        conn.execute(update_query)
        conn.commit()
        response = JSONResponse(
            "Token Accepted", status_code=status.HTTP_202_ACCEPTED)
        response.delete_cookie("newpassword")
        return response


def reset_password_attempts(email: str, token: str):
    mycursor = conn.cursor()
    sql = "UPDATE User SET password_attempts = 0 WHERE email = %s"
    val = (email,)
    mycursor.execute(sql, val)
    conn.commit()


def plus_password_attempts(email: str, password_attempts: int):
    password_attempts = password_attempts + 1
    mycursor = conn.cursor()
    sql = "UPDATE User SET password_attempts = %s WHERE email = %s"
    val = (password_attempts, email)
    mycursor.execute(sql, val)
    conn.commit()
