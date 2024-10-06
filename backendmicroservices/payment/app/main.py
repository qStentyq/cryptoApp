from fastapi import FastAPI
from starlette.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.background import BackgroundTasks
from pydantic import BaseModel
from redis_om import get_redis_connection, HashModel
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials = True,
    allow_origins = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8000',
                     'http://localhost:8001'],
    allow_methods = ['*'],
    allow_headers = ['*']
)

redis = get_redis_connection(
    host = 'redis-16021.c135.eu-central-1-1.ec2.redns.redis-cloud.com',
    port = 16021,
    password = 'v5X7N2lmV1GbvQVA0NACWnqJ6EmhswxP',
    decode_responses = True
)

class Order(HashModel):
    product_id: str
    price: float
    quantity: int
    status: str #pending, completed, refunded

    class Meta:
        database = redis

@app.get('/orders') 
def all ():
    return [format(pk) for pk in Order.all_pks()]

@app.get('/orders/{pk}')
def get (pk: str):
    # order = Order.get(pk)
    # print(order)
    # redis.xadd('refund_order', order.dict(), '*')
    return Order.get(pk)

@app.post('/orders')
async def create(request: Request, background_tasks: BackgroundTasks): #id, quantity
    body = await request.json()

    req = requests.get('http://localhost:8000/products/%s' % body['id'])
    product = req.json()
    order = Order(
        product_id = body['id'],
        price = product['price'],
        quantity = body['quantity'],
        status = 'pending'
    )
    order.save()
    background_tasks.add_task(order_completed, order)

    return order

def order_completed(order : Order):
    # time.sleep(3)
    order.status = 'completed'
    order.save()
    redis.xadd('order_completed', order.dict(), '*')