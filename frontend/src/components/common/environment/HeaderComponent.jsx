import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Drawer, Dropdown, Flex, Image, Layout, Menu, Select, Typography } from 'antd';
import {
    GlobalOutlined,
    HddFilled,
    LogoutOutlined,
    ReadFilled,
    ScheduleFilled,
    SlidersFilled,
    SnippetsFilled,
} from '@ant-design/icons';
import { HouseFill, List, PeopleFill } from 'react-bootstrap-icons';

const imgSrc = require('../../../assets/images/logo/logoWFC.png');

const { Text } = Typography;
const { Header } = Layout;

const items = [
    { key: '', label: 'Trang chủ', icon: <HouseFill size={20} /> },
    {
        type: 'group',
        label: (
            <Text strong style={{ color: '#dc3545' }}>
                Dành cho Member
            </Text>
        ),
        children: [
            {
                key: 'evaluate-section',
                label: 'Phần đánh giá',
                icon: <ReadFilled size={20} />,
                children: [
                    {
                        key: 'evaluate-office',
                        label: 'OFFICE',
                    },
                    {
                        key: 'evaluate-shirozake',
                        label: 'SHIROZAKE',
                    },
                    {
                        key: 'evaluate-bottling',
                        label: 'BOTTLING',
                    },
                    {
                        key: 'evaluate-toyo',
                        label: 'TOYO',
                    },
                ],
            },
            {
                key: 'result-section',
                label: 'Phần kết quả',
                icon: <ScheduleFilled size={20} />,
            },
        ],
    },
    {
        type: 'group',
        label: (
            <Text strong style={{ color: '#00822d' }}>
                Dành cho Admin
            </Text>
        ),
        children: [
            {
                key: 'content-evaluate',
                label: 'Nội dung đánh giá',
                icon: <HddFilled size={20} />,
            },
            {
                key: 'content',
                label: 'Quản lý nội dung',
                icon: <SnippetsFilled size={20} />,
            },
            {
                key: 'classify',
                label: 'Quản lý phân loại',
                icon: <SlidersFilled size={20} />,
            },
            {
                key: 'user',
                label: 'Quản lý nhân viên',
                icon: <PeopleFill size={20} />,
            },
        ],
    },
];

const HeaderComponent = ({ language, name }) => {
    const [openDrawer, setOpenDraw] = useState(false);

    const navigate = useNavigate();

    return (
        <Header
            style={{
                backgroundColor: '#d7ebda',
                padding: '0px 8px ',
            }}
        >
            <Flex align="center" justify="space-between">
                <List
                    onClick={() => setOpenDraw(prevOpen => !prevOpen)}
                    style={{ cursor: 'pointer', fontSize: 36 }}
                />
                <Link to="/vesinh">
                    <Image alt="Logo WineFood" preview={false} src={imgSrc} width={240} />
                </Link>
                <Flex gap={8}>
                    <Select
                        defaultValue={language}
                        options={[
                            {
                                value: 'VI',
                                label: 'VI',
                            },
                            {
                                value: 'JP',
                                label: 'JP',
                            },
                        ]}
                        suffixIcon={<GlobalOutlined size={20} style={{ color: '#2db7f5' }} />}
                    />
                    {name && (
                        <Dropdown
                            arrow
                            menu={{
                                items: [
                                    {
                                        key: 'logout',
                                        label: 'Đăng xuất',
                                        icon: <LogoutOutlined size={20} />,
                                        onClick: () => {
                                            sessionStorage.removeItem('accessToken');
                                            localStorage.removeItem('accessToken');
                                            navigate('/vesinh/login');
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
            </Flex>
            <Drawer
                footer={
                    <Text style={{ fontSize: 16 }}>
                        Version <b>2.0.1</b>
                    </Text>
                }
                onClose={() => setOpenDraw(prevState => !prevState)}
                open={openDrawer}
                placement="left"
                title="Menu"
                width={300}
                styles={{
                    content: { backgroundColor: '#d7ebda' },
                    footer: { textAlign: 'center' },
                }}
            >
                <Menu
                    defaultSelectedKeys={''}
                    items={items}
                    mode="inline"
                    // Nếu navigate ./ thì sẽ đi vào route con
                    onClick={e => {
                        setOpenDraw(prevState => !prevState);
                        navigate(`/vesinh/${e.key}`);
                    }}
                    style={{ backgroundColor: '#d7ebda' }}
                />
            </Drawer>
        </Header>
    );
};

export default HeaderComponent;
