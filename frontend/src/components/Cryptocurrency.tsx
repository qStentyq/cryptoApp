import React, { useState, useEffect, FC } from 'react';
import millify from 'millify'
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoAPI';
// import { useGetCryptos2Query } from '../services/cryptoAPI';

export interface SimplifiedOrNot { 
    simplified? : boolean
}


const Cryptocurrencies: FC<SimplifiedOrNot> = ({simplified}) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  // const { data2: cryptosList2, isFetching2 } = useGetCryptos2Query()
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin: any) => coin.name.toLowerCase()
    .includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  }, [cryptosList,searchTerm])

  const isRender = !simplified ? <div className='search-crypto'>
  <Input placeholder='Search Cryptosss' onChange={(e) => setSearchTerm(e.target.value)}/>
</div> : ''
  if(isFetching) return 'Loading....'
  return (
    <>
      {isRender} 
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency: any) => (
          <Col xs = {24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                  <Card 
                    title = {`${currency.rank}. ${currency.name}`}
                    extra ={<img className='crypto-image' src = {currency.iconUrl} alt ={currency.name}/>}
                    hoverable
                  >
                    <p>Price: {millify(currency.price, {precision: 5})}</p>
                    <p>Market cap: {millify(currency.marketCap)}</p>
                    <p>Daily change: {millify(currency.change)}%</p>
                  </Card>
              </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies