import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Drawer, Dropdown, Flex, Image, Layout, Menu, Typography } from 'antd';
import {
    BookFill,
    ChatFill,
    HouseFill,
    KeyFill,
    List,
    PeopleFill,
    PersonCheckFill,
    PersonHeart,
    Search,
} from 'react-bootstrap-icons';
import { LogoutOutlined } from '@ant-design/icons';

const imgSrc = require('../../assets/images/logoWFC.png');

const { Text } = Typography;
const { Header } = Layout;

const items = [
    { key: '', label: 'Trang chủ', icon: <HouseFill size={20} /> },
    { key: 'history', label: 'Lịch sử nghỉ phép', icon: <Search size={18} /> },
    {
        type: 'group',
        label: (
            <Text strong style={{ color: '#007bff' }}>
                Dành cho Leader
            </Text>
        ),
        children: [
            { key: 'leader', label: 'Duyệt nghỉ phép', icon: <PersonCheckFill size={20} /> },
        ],
    },
    {
        type: 'group',
        label: (
            <Text strong style={{ color: '#dc3545' }}>
                Dành cho Manager
            </Text>
        ),
        children: [
            { key: 'manager', label: 'Quản lý nghỉ phép', icon: <PersonHeart size={20} /> },
            { key: 'user', label: 'Quản lý nhân viên', icon: <PeopleFill size={20} /> },
        ],
    },
];

const HeaderComponent = () => {
    const [openDrawer, setOpenDraw] = useState(false);

    const navigate = useNavigate();

    const handleMenuClick = useCallback(e => navigate(`./${e.key}`), [navigate]);

    const handleOpenDraw = useCallback(() => setOpenDraw(prevOpen => !prevOpen), []);

    return (
        <Header
            style={{
                alignItems: 'center',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0px 20px ',
            }}
        >
            <Link to="/">
                <Image alt="Logo WineFood" preview={false} src={imgSrc} width={270} />
            </Link>
            <Flex justify="space-between" gap={8}>
                <Dropdown
                    menu={{
                        items: [
                            { key: 'password', label: 'Đổi mật khẩu', icon: <KeyFill size={20} /> },

                            {
                                key: 'feedback',
                                label: 'Góp ý - Báo lỗi',
                                icon: <ChatFill size={18} />,
                            },
                            {
                                key: 'manual',
                                label: 'Hướng dẫn sử dụng',
                                icon: <BookFill size={18} />,
                            },
                            {
                                key: 'logout',
                                label: 'Đăng xuất',
                                icon: <LogoutOutlined size={20} />,
                                onClick: () => {
                                    sessionStorage.removeItem('accessToken');
                                    localStorage.removeItem('accessToken');
                                    navigate('/login');
                                },
                            },
                        ],
                    }}
                >
                    <Avatar style={{ backgroundColor: '#52c41a' }}>SANG</Avatar>
                </Dropdown>
                <List style={{ cursor: 'pointer', fontSize: 36 }} onClick={handleOpenDraw} />
            </Flex>
            <Drawer
                footer={
                    <Text style={{ fontSize: 16 }}>
                        Version <b>1.0.0</b>
                    </Text>
                }
                onClose={handleOpenDraw}
                open={openDrawer}
                placement="right"
                title="Menu"
                width={320}
                styles={{ footer: { textAlign: 'center' } }}
            >
                <Menu
                    defaultSelectedKeys={''}
                    items={items}
                    mode="inline"
                    onClick={handleMenuClick}
                />
            </Drawer>
        </Header>
    );
};

export default HeaderComponent;

// import { Alert, Col, Image, Row, Typography } from 'antd';

// import React from 'react';

// import { Link } from 'react-router-dom';
// import Marquee from 'react-fast-marquee';
// const { Text } = Typography;
// const imgSrc = require('../../assets/images/logo.png');
// const HeaderComponent = () => (
//     <Row>
//         <Col xs={24} sm={10} md={8} lg={6}>
//             <Link to="/">
//                 <Image alt="Logo WineFood" preview={false} src={imgSrc} width={270} />
//             </Link>
//         </Col>
//         <Col xs={24} sm={14} md={16} lg={18}>
//             <Alert
//                 banner
//                 message={
//                     <Marquee gradient={false} pauseOnHover>
//                         <Text style={{ color: '#007bff' }}>
//                             Nhằm cải thiện{' '}
//                             <b>
//                                 <i>Phần mềm nghỉ phép</i>
//                             </b>{' '}
//                             được tốt hơn. Mong mọi người đóng góp ý kiến vào phần{' '}
//                             <b>
//                                 <i>Góp ý - Báo lỗi (chức năng này nằm trong Menu)</i>
//                             </b>
//                             . Xin cảm ơn.
//                         </Text>
//                     </Marquee>
//                 }
//                 showIcon={false}
//                 type={'info'}
//                 style={{ height: 60, margin: '10px 20px 10px 10px' }}
//             />
//         </Col>
//     </Row>
// );

// export default HeaderComponent;
