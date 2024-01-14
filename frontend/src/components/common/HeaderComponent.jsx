import React, { useState } from 'react';
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

const HeaderComponent = ({ name }) => {
    const [openDrawer, setOpenDraw] = useState(false);

    const navigate = useNavigate();

    return (
        <Header
            style={{
                backgroundColor: 'white',
                padding: '0px 8px ',
            }}
        >
            <Flex align="center" justify="space-between">
                <List
                    style={{ cursor: 'pointer', fontSize: 36 }}
                    onClick={() => setOpenDraw(prevOpen => !prevOpen)}
                />
                <Link to="/">
                    <Image alt="Logo WineFood" preview={false} src={imgSrc} width={240} />
                </Link>
                {name && (
                    <Dropdown
                        arrow
                        menu={{
                            items: [
                                {
                                    key: 'password',
                                    label: 'Đổi mật khẩu',
                                    icon: <KeyFill size={20} />,
                                },

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
                        placement="bottomLeft"
                    >
                        <Avatar style={{ backgroundColor: '#00822d' }}>
                            {name.split(' ').pop()}
                        </Avatar>
                    </Dropdown>
                )}
            </Flex>
            <Drawer
                footer={
                    <Text style={{ fontSize: 16 }}>
                        Version <b>1.0.0</b>
                    </Text>
                }
                onClose={() => setOpenDraw(prevOpen => !prevOpen)}
                open={openDrawer}
                placement="left"
                title="Menu"
                width={300}
                styles={{ footer: { textAlign: 'center' } }}
            >
                <Menu
                    defaultSelectedKeys={''}
                    items={items}
                    mode="inline"
                    // Nếu navigate ./ thì sẽ đi vào route con
                    onClick={e => navigate(`/${e.key}`)}
                />
            </Drawer>
        </Header>
    );
};

export default HeaderComponent;
