import { Layout, Menu, Typography } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
    { key: '', label: 'Trang chủ', icon: <HouseFill size={20} /> },
    { key: 'password', label: 'Đổi mật khẩu', icon: <KeyFill size={20} /> },
    { key: 'feedback', label: 'Góp ý - Báo lỗi', icon: <ChatFill size={18} /> },
    { key: 'manual', label: 'Hướng dẫn sử dụng', icon: <BookFill size={18} /> },
    { key: 'history', label: 'Lịch sử nghỉ phép', icon: <Search size={18} /> },
    {
        key: '6',
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
        key: '8',
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

const SiderComponent = ({ defaultOpenKeys, defaultSelectedKeys }) => {
    const navigate = useNavigate();

    const handleMenuClick = useCallback(e => navigate(`./${e.key}`), [navigate]);

    return (
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
};

export default SiderComponent;
