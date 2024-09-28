import requests
import time
from selenium import webdriver
from bs4 import BeautifulSoup

driver = webdriver.Chrome()
driver.get('https://www.coingecko.com/en/exchanges')
time.sleep(3)

html = driver.page_source
# Используем BeautifulSoup для парсинга

soup = BeautifulSoup(html, 'html.parser')

# Получаем данные о биржах (например, названия бирж, объемы торгов и другие параметры)
exchanges = []

# Ищем таблицу с данными о биржах
table = soup.find('table')  # Найдем таблицу с биржами
driver.quit()
if table:
    rows = table.find_all('tr')[2:]  # Пропустим заголовок таблицы
    for row in rows:
        # print(row)
        cols = row.find_all('td')
        # print(cols)

        # Извлекаем данные из каждого столбца
        rank = cols[0].get_text(strip=True)
        rank = rank.split(" ")[0]
        # print(rank)
        name = cols[1].get_text(strip=True).split(' ')[0]
        trust_score = cols[2].get_text(strip=True)
        volume24h_normilized = cols[3].get_text(strip=True)
        volume24h = cols[4].get_text(strip=True)
        monthly_visits = cols[5].get_text(strip = True)


        # Сохраняем данные в словаре
        exchange_data = {
            'rank': rank,
            'name': name,
            'trust_score': trust_score,
            'volume24h_normilized': volume24h_normilized,
            'volume24h' : volume24h,
            'monthly_visits' : monthly_visits


        }

        exchanges.append(exchange_data)

# Пример словаря для передачи внешнему API
params = {
    'exchanges': exchanges
}

# Выводим данные
for exchange in exchanges:
    print(exchange)
