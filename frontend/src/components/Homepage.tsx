import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoAPI";
import { Cryptocurrencies, News } from "../components";

const { Title } = Typography;
const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return "Loading...";

    return (
        <>
            <Title level={2} className='heading'>
                Global Crypto Stats
            </Title>
            <Row>
                {/* span = 12 means 12 spaces, which means half of the screen*/}
                <Col span={12}>
                    <Statistic title='Total Cryptocurrencises' value={globalStats.total} />
                    <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} />
                    <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} />
                    <Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)} />
                    <Statistic title='Total Markets' value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>
                    Top 10 Cryptocurrencies by Market volume{" "}
                </Title>
                <Title level={3} className='show-more'>
                    <Link to='/cryptocurrencies'>Show more</Link>
                </Title>
            </div>
            <Cryptocurrencies simplified />
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>
                    Latest crypto News{" "}
                </Title>
                <Title level={3} className='show-more'>
                    <Link to='/news'>Show more</Link>
                </Title>
            </div>
            <News simplified />
        </>
    );
};

export default Homepage;
