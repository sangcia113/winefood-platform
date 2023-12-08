import { Layout, Menu, Typography } from 'antd';
import React from 'react';
import {
    BookFill,
    ChatFill,
    HouseFill,
    KeyFill,
    PeopleFill,
    PersonCheckFill,
    PersonHeart,
    Search,
} from 'react-bootstrap-icons';

const { Text } = Typography;

const { Sider } = Layout;

const items = [
    { key: '1', label: 'Trang chủ', icon: <HouseFill size={20} /> },
    { key: '2', label: 'Đổi mật khẩu', icon: <KeyFill size={20} /> },
    { key: '3', label: 'Góp ý - Báo lỗi', icon: <ChatFill size={18} /> },
    { key: '4', label: 'Hướng dẫn sử dụng', icon: <BookFill size={18} /> },
    { key: '5', label: 'Lịch sử nghỉ phép', icon: <Search size={18} /> },
    {
        key: '6',
        type: 'group',
        label: (
            <Text strong style={{ color: '#007bff' }}>
                Dành cho Leader
            </Text>
        ),
        children: [{ key: '7', label: 'Duyệt nghỉ phép', icon: <PersonCheckFill size={20} /> }],
    },
    {
        key: '8',
        type: 'group',
        label: (
            <Text strong style={{ color: '#dc3545' }}>
                Dành cho Manager
            </Text>
        ),
        children: [
            { key: '9', label: 'Quản lý nghỉ phép', icon: <PersonHeart size={20} /> },
            { key: '10', label: 'Quản lý nhân viên', icon: <PeopleFill size={20} /> },
        ],
    },
];

const SiderComponent = ({ defaultOpenKeys, defaultSelectedKeys, handleMenuClick }) => (
    <Sider breakpoint="xxl" collapsible collapsedWidth="0" theme="light" width="270">
        <Menu
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={defaultSelectedKeys}
            items={items}
            mode="inline"
            // Navigate route
            onClick={handleMenuClick}
        />
    </Sider>
);

export default SiderComponent;
