FROM python:3.11.9-slim


COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD uvicorn main:app --host 0.0.0.0  --log-level debug --port 8001 & python consumer.py
