import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Alert,
    Avatar,
    Drawer,
    Dropdown,
    Flex,
    Form,
    Image,
    Layout,
    Menu,
    Tour,
    Typography,
} from 'antd';
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

import {
    ModalChangePassword,
    ModalErrorComponent,
    ModalErrorOtherComponent,
    ModalFeedback,
    ModalSuccessComponent,
} from '../../components';

import { createConnection } from '../../utils';

const imgSrc = require('../../assets/images/logo/logoWFC.png');
const imgSubMenu = require('../../assets/images/manual/sub-menu.PNG');
const imgMainMenu = require('../../assets/images/manual/main-menu.PNG');

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
    const [loading, setLoading] = useState(false);

    const [openDrawer, setOpenDraw] = useState(false);

    const [openTour, setOpenTour] = useState(
        localStorage.getItem('localOpenTour') === 'false' ? false : true
    );

    const [modalChangePass, setModalChangePass] = useState({
        onFinish: () => {},
        open: false,
    });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalFeedback, setModalFeedback] = useState({
        onFinish: () => {},
        open: false,
    });

    const [modalErrorOther, setModalErrorOther] = useState({
        open: false,
        title: '',
        message: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        message: '',
    });

    const navigate = useNavigate();

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [form] = Form.useForm();
    const [formFeedback] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const changePassword = async ({ oldPassword, newPassword, confirmPassword }) => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).post(
                '/leave/user/change-password',
                {
                    oldPassword,
                    newPassword,
                    confirmPassword,
                }
            );

            setModalChangePass({ open: false });

            setModalSuccess({
                message: response?.data?.message,
                open: true,
            });
        } catch (error) {
            const errorCode = error?.response?.data?.error;

            if (errorCode === -1084) {
                setModalErrorOther({
                    title: 'THẤT BẠI',
                    open: true,
                    message: 'Mật khẩu cũ không chính xác!',
                });
            } else if (errorCode === -1085) {
                setModalErrorOther({
                    title: 'THẤT BẠI',
                    open: true,
                    message: 'Mật khẩu mới không trùng khớp!',
                });
            } else {
                setModalError({ error, open: true });
            }
        } finally {
            setLoading(false);
        }
    };

    const feedback = async ({ feedback, fileList }) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append('feedback', feedback);
            fileList.fileList.forEach(file => {
                formData.append('fileList', file.originFileObj);
            });

            const response = await createConnection(accessToken).post('/leave/feedback', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setModalFeedback({ open: false });

            setModalSuccess({
                message: response?.data?.message,
                open: true,
            });
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Header
            style={{
                backgroundColor: 'white',
                padding: '0px 8px ',
            }}
        >
            <Flex align="center" justify="space-between">
                <Flex justify="center" ref={ref3}>
                    <List
                        onClick={() => setOpenDraw(prevOpen => !prevOpen)}
                        style={{ cursor: 'pointer', fontSize: 36 }}
                    />
                </Flex>
                <Link ref={ref2} to="/nghiphep">
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
                                    onClick: () => {
                                        setModalChangePass({
                                            onFinish: values => changePassword(values),
                                            open: true,
                                        });
                                    },
                                },
                                {
                                    key: 'feedback',
                                    label: 'Góp ý - Báo lỗi',
                                    icon: <ChatFill size={18} />,
                                    onClick: () =>
                                        setModalFeedback({
                                            onFinish: values => feedback(values),
                                            open: true,
                                        }),
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
                                        navigate('/nghiphep/login');
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
                        navigate(`/nghiphep/${e.key}`);
                    }}
                />
            </Drawer>
            <Tour
                arrow
                mask={{
                    color: 'rgba(72,72,72,.4)',
                }}
                onClose={() => {
                    setOpenTour(prevState => !prevState);
                    localStorage.setItem('localOpenTour', false);
                }}
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
                        cover: <img alt="sub-menu.png" src={imgSubMenu} />,
                        target: () => ref1.current,
                    },
                    {
                        title: 'LOGO',
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
                        cover: <img alt="main-menu.png" src={imgMainMenu} />,
                        target: () => ref3.current,
                    },
                ]}
            />
            <ModalChangePassword
                afterClose={() => form.resetFields()}
                form={form}
                loading={loading}
                onCancel={() => setModalChangePass({ open: false })}
                onOk={() => form.submit()}
                open={modalChangePass.open}
                onFinish={modalChangePass.onFinish}
            />
            <ModalErrorComponent
                message={modalError.message}
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                title={modalError.title}
            />
            <ModalErrorOtherComponent
                onOk={() => setModalErrorOther({ open: false })}
                open={modalErrorOther.open}
                title={modalErrorOther.title}
                message={modalErrorOther.message}
            />
            <ModalFeedback
                afterClose={() => formFeedback.resetFields()}
                form={formFeedback}
                loading={loading}
                onCancel={() => setModalFeedback({ open: false })}
                onOk={() => formFeedback.submit()}
                open={modalFeedback.open}
                onFinish={modalFeedback.onFinish}
            />
            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
        </Header>
    );
};

export default HeaderComponent;
