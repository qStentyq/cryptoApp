from redis_om import get_redis_connection
from main import Product 
import time 

redis = get_redis_connection(
    host = 'redis-16021.c135.eu-central-1-1.ec2.redns.redis-cloud.com',
    port = 16021,
    password = 'v5X7N2lmV1GbvQVA0NACWnqJ6EmhswxP',
    decode_responses = True
)

key = 'order_completed'

group = 'inventory-group'

try:
    redis.xgroup_create(key, group)
except:
    print('Group already exists')


while True: 
    try:
        results = redis.xreadgroup(group, key, {key: '>'}, None)
        if results != []: 
            
            for result in results:
                print(1)
                obj = result[1][0][1]
                
                try:
                    product = Product.get(obj['product_id'])
                    print(product)
                    product.quantity = product.quantity - int(obj['quantity'])
                    product.save()
                except:
                    print('Zapros est')
                    redis.xadd('refund_order', obj, '*')


    except Exception as e:
        print(str(e))
    time.sleep(1)