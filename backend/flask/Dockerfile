FROM python:3.9-slim

COPY . /app

RUN pip3 install flask

RUN pip3 install pandas

RUN pip3 install apscheduler

RUN pip3 install pymysql

RUN pip3 install sklearn

RUN pip3 install cryptography

WORKDIR /app

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
