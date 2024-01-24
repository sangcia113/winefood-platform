import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Avatar, Drawer, Dropdown, Flex, Image, Layout, Menu, Tour, Typography } from 'antd';
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

    const [openTour, setOpenTour] = useState(true);

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const navigate = useNavigate();

    return (
        <Header
            style={{
                backgroundColor: 'white',
                padding: '0px 8px ',
            }}
        >
            <Flex align="center" justify="space-between">
                <div ref={ref3}>
                    <List
                        onClick={() => setOpenDraw(prevOpen => !prevOpen)}
                        style={{ cursor: 'pointer', fontSize: 36 }}
                    />
                </div>
                <Link ref={ref2} to="/">
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
                                    onClick: () => setOpenTour(prevState => !prevState),
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
                        <Avatar ref={ref1} style={{ backgroundColor: '#00822d' }}>
                            {name.split(' ').pop()}
                        </Avatar>
                    </Dropdown>
                )}
            </Flex>
            <Drawer
                footer={
                    <Text style={{ fontSize: 16 }}>
                        Version <b>4.0.1</b>
                    </Text>
                }
                onClose={() => setOpenDraw(prevState => !prevState)}
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
                    onClick={e => {
                        setOpenDraw(prevState => !prevState);
                        navigate(`/${e.key}`);
                    }}
                />
            </Drawer>
            <Tour
                arrow
                mask={{
                    color: 'rgba(72,72,72,.4)',
                }}
                onClose={() => setOpenTour(prevState => !prevState)}
                open={openTour}
                placement="bottom"
                steps={[
                    {
                        title: 'MENU PHỤ',
                        description: (
                            <Alert
                                message={
                                    <>
                                        <i>- Đổi mật khẩu</i>
                                        <br />
                                        <i>- Góp ý - Báo lỗi</i>
                                        <br />
                                        <i>- Hướng dẫn sử dụng</i>
                                    </>
                                }
                                type="info"
                            />
                        ),
                        cover: (
                            <img
                                alt="manual-avatar.png"
                                src={require('../../assets/images/manual/avatar.PNG')}
                            />
                        ),
                        target: () => ref1.current,
                    },
                    {
                        title: 'Logo',
                        description: (
                            <Alert message="Thao tác nhanh để quay về trang chủ" type="info" />
                        ),
                        target: () => ref2.current,
                    },
                    {
                        title: 'MENU CHÍNH',
                        description: (
                            <Alert
                                message={
                                    <>
                                        <i>- Trang chủ</i>
                                        <br />
                                        <i>- Lịch sử nghỉ phép</i>
                                        <br />
                                        <i>- Duyệt nghỉ phép</i>
                                        <br />
                                        <i>- Quản lý nghỉ phép</i>
                                        <br />
                                        <i>- Quản lý nhân viên</i>
                                    </>
                                }
                                type="info"
                            />
                        ),
                        cover: (
                            <img
                                alt="manual-menu.png"
                                src={require('../../assets/images/manual/menu.PNG')}
                            />
                        ),
                        target: () => ref3.current,
                    },
                ]}
            />
        </Header>
    );
};

export default HeaderComponent;
