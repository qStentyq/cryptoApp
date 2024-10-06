import { useState, FC } from "react";
import { Select, Typography, Row, Col, Card } from "antd";

import { useGetNewsQuery } from "../services/cryptoNewsAPI";
import { useGetCryptosQuery } from "../services/cryptoAPI";

import { SimplifiedOrNot } from "./Cryptocurrency";

const { Title } = Typography;
const { Option } = Select;

const News: FC<SimplifiedOrNot> = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews, isLoading, isError } = useGetNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

    if (isLoading) return "Loading...";
    if (isError) return "Error fetching data";

    if (!cryptoNews?.articles) return "No articles found";

    console.log(cryptoNews);
    return (
        <>
            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className='select-news'
                            placeholder='Select a Crypto'
                            optionFilterProp='children'
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value='Cryptocurency'>Cryptocurrency</Option>
                            {data?.data?.coins?.map((currency: any) => (
                                <Option value={currency.name}>{currency.name}</Option>
                            ))}
                        </Select>
                    </Col>
                )}
                {cryptoNews.articles.map((news: any, i: number) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} target='_blank' rel='noreferrer'>
                                <div className='news-image-container'>
                                    <Title className='news-title' level={4}>
                                        {news.title}{" "}
                                    </Title>
                                    <img
                                        src='https://assets.finbold.com/uploads/2024/02/Best-life-changing-cryptocurrency-to-buy-in-2024.jpg'
                                        alt='article image'
                                        className='newsimg'
                                    />
                                </div>
                                <p>Article by {news?.publisher?.name}</p>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default News;
