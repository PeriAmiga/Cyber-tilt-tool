FROM python:3.11.0
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip3 install -r /app/requirements.txt
COPY ./code /app/
EXPOSE 80

COPY ./ssl/MPT.crt /ssl/MPT.crt
COPY ./ssl/MPT.key /ssl/MPT.key
COPY ./ssl/MPT.pem /ssl/MPT.pem

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile", "/ssl/MPT.key", "--ssl-certfile", "/ssl/MPT.crt", "--reload"]