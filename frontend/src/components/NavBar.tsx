import { Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
    HomeOutlined,
    MoneyCollectOutlined,
    BulbOutlined,
    FundOutlined,
    ShoppingCartOutlined,
    BuildOutlined,
} from "@ant-design/icons";

import icon from "../images/digital_5445217.png";
const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large' />
                <Typography.Title level={2} className='logo'>
                    <Link to='/'> Crypto app</Link>
                </Typography.Title>
                {/* <Button className='menu-control-container'>

            </Button> */}
            </div>
            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />}>
                    <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined />}>
                    <Link to='/exchanges'>Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />}>
                    <Link to='/news'>News</Link>
                </Menu.Item>
                {/* <Menu.Item icon={<ProjectOutlined />}>
                <Link to="/projects">Cryptoprojects</Link>
            </Menu.Item> */}
                <Menu.Item icon={<BuildOutlined />}>
                    <Link to='/coinbuilder'>Coin Builder</Link>
                </Menu.Item>
                <Menu.Item icon={<ShoppingCartOutlined />}>
                    <Link to='/store'>Our Store</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default Navbar;
