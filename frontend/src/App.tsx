import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import {
    Navbar,
    Exchanges,
    Homepage,
    Cryptocurrencies,
    News,
    CryptoDetails,
    CoinFactory,
    Notifier,
    Observer,
    Povedenn,
    Store,
    Products,
    ProductsCreate,
} from "./components";
import "./App.css";

const App = () => {
    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Routes>
                            <Route path='/' element={<Homepage />} />
                            <Route path='/exchanges' element={<Exchanges />} />
                            <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                            <Route path='/crypto/:coind' element={<CryptoDetails />} />
                            <Route path='/news' element={<News />} />
                            {/* <Route path='/projects' element={<BuilderEx />} /> */}
                            <Route path='/coinbuilder' element={<CoinFactory />} />
                            <Route path='/decorator' element={<Notifier />} />
                            <Route path='/observer' element={<Observer />} />
                            <Route path='/povedenn' element={<Povedenn />} />
                            <Route path='/store' element={<Store />} />
                            <Route path='/prod' element={<Products />} />
                            <Route path='/create' element={<ProductsCreate />} />
                        </Routes>
                    </div>
                </Layout>
                <div className='footer'>
                    <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
                        CryptoApp, <br />
                        Designed in 2024
                    </Typography.Title>
                    <Space>
                        <Link to='/'>Home</Link>
                        <Link to='/exchanges'>Exchanges</Link>
                        <Link to='/news'>News</Link>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default App;
