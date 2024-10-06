import sys 
import os
current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
parent = os.path.dirname(parent)
sys.path.append(parent)
from payment.app.main import redis
from main import Product 
import time 


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