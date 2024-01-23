import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Dropdown, Form, Space, Table, Tag, Typography } from 'antd';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    EditFilled,
    StopFilled,
    SyncOutlined,
} from '@ant-design/icons';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

import {
    ContentComponent,
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalErrorOtherComponent,
    ModalReasonComponent,
    ModalSuccessComponent,
} from '../components';

import { createConnection, getUniqueName } from '../utils';

const { Text } = Typography;

const LeaderPage = () => {
    console.log('Run LeaderPage...');

    const [loading, setLoading] = useState(false);

    const [leader, setLeader] = useState([]);

    const [modalConfirm, setModalConfirm] = useState({
        onOk: () => {},
        open: false,
        message: '',
    });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalErrorOther, setModalErrorOther] = useState({
        open: false,
        title: '',
        message: '',
    });

    const [modalReason, setModalReason] = useState({
        open: false,
        onFinish: () => {},
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        message: '',
    });

    const [formReason] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getLeader();
    }, []);

    const getLeader = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/leave/list/leader`);

            setLeader(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const approveLeave = async (
        id,
        userName,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason
    ) => {
        try {
            const response = await createConnection(accessToken).put(
                `/leave/list/leader/approved/${id}`,
                {
                    userName,
                    department,
                    bookLeaveType,
                    bookLeaveDay,
                    bookFromDate,
                    bookToDate,
                    reason,
                }
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Đã gửi yêu cầu lên cấp trên
                        <br />
                        <b>{response.data.receiver}</b>
                        <br />
                        qua <b>Zalo</b>
                    </Text>
                ),
                open: true,
            });

            getLeader();
        } catch (error) {
            setModalConfirm({ open: false });

            setModalError({ open: true, error });
        }
    };

    const rejectLeave = async (
        id,
        rejectReason,
        userId,
        userName,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason
    ) => {
        try {
            const response = await createConnection(accessToken).put(
                `/leave/list/leader/rejected/${id}`,
                {
                    rejectReason,
                    userId,
                    userName,
                    department,
                    bookLeaveType,
                    bookLeaveDay,
                    bookFromDate,
                    bookToDate,
                    reason,
                }
            );

            setModalReason({ open: false });

            setModalSuccess({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Đã gửi thông báo từ chối đến nhân viên
                        <br />
                        <b>{response.data.receiver}</b>
                        <br />
                        qua <b>Zalo</b>
                    </Text>
                ),
                open: true,
            });

            getLeader();
        } catch (error) {
            setModalReason({ open: false });

            setModalError({ open: true, error });
        }
    };

    const columns = [
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            fixed: 'left',
            render: (_, record) => (
                <Dropdown
                    arrow={true}
                    menu={{
                        items: [
                            {
                                key: 1,
                                label: 'Phê duyệt',
                                icon: <EditFilled />,
                                onClick: () => {
                                    if (
                                        record.leaderApproved === 1 ||
                                        record.managerApproved === 1
                                    ) {
                                        setModalErrorOther({
                                            message: (
                                                <ul>
                                                    <li>
                                                        <b>Bạn đã phê duyệt</b> yêu cầu nghỉ phép
                                                        này.
                                                    </li>
                                                    <li>
                                                        <b>Manager đã phê duyệt</b> yêu cầu nghỉ
                                                        phép này.
                                                    </li>
                                                </ul>
                                            ),
                                            open: true,
                                            title: 'KHÔNG THỂ PHÊ DUYỆT',
                                        });
                                    } else {
                                        setModalConfirm({
                                            message: (
                                                <Space direction="vertical" align="center">
                                                    Bạn có chắc duyệt yêu cầu nghỉ phép của
                                                    <b>{record.userName}</b>
                                                </Space>
                                            ),
                                            onOk: () =>
                                                approveLeave(
                                                    record.id,
                                                    record.userName,
                                                    record.department,
                                                    record.bookLeaveType,
                                                    record.bookLeaveDay,
                                                    record.bookFromDate,
                                                    record.bookToDate,
                                                    record.reason
                                                ),
                                            open: true,
                                        });
                                    }
                                },
                                style: {
                                    color: '#1677ff',
                                },
                            },
                            {
                                key: 2,
                                label: 'Từ chối',
                                icon: <StopFilled />,
                                onClick: () => {
                                    if (
                                        record.leaderApproved === 0 ||
                                        record.managerApproved === 0 ||
                                        record.managerApproved === 1
                                    ) {
                                        setModalErrorOther({
                                            message: (
                                                <ul>
                                                    <li>
                                                        <b>Bạn đã từ chối</b> yêu cầu nghỉ phép này.
                                                    </li>
                                                    <li>
                                                        <b>Manager đã từ chối</b> yêu cầu nghỉ phép
                                                        này.
                                                    </li>
                                                    <li>
                                                        <b>Manager đã phê duyệt</b> yêu cầu nghỉ
                                                        phép này.
                                                    </li>
                                                </ul>
                                            ),
                                            open: true,
                                            title: 'KHÔNG THỂ TỪ CHỐI',
                                        });
                                    } else {
                                        setModalReason({
                                            open: true,
                                            onFinish: values =>
                                                rejectLeave(
                                                    record.id,
                                                    values.reason,
                                                    record.userId,
                                                    record.userName,
                                                    record.department,
                                                    record.bookLeaveType,
                                                    record.bookLeaveDay,
                                                    record.bookFromDate,
                                                    record.bookToDate,
                                                    record.reason
                                                ),
                                        });
                                    }
                                },
                                style: { color: '#ff4d4f' },
                            },
                        ],
                    }}
                    placement={'bottomLeft'}
                >
                    <ThreeDotsVertical />
                </Dropdown>
            ),
        },
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Lộ trình',
            dataIndex: 'tracking',
            key: 'tracking',
            ellipsis: true,
            render: (_, record) => {
                if (record.managerApprovedDelete) return <Tag color="#ff4d4f">Đã hủy</Tag>;
                else {
                    if (record.tracking === 1) return <Tag color="#108ee9">Đã gửi Leader</Tag>;
                    if (record.tracking === 2) return <Tag color="#52c41a">Đã gửi Manager</Tag>;
                }
            },
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            filters: getUniqueName(leader, 'userId', 'userName'),
            filterSearch: true,
            onFilter: (value, record) => record.userName.includes(value),
            render: (_, record) => {
                if (!record.managerApprovedDelete) {
                    if (!record.managerApproved) {
                        return (
                            <Text strong style={{ color: '#1677ff' }}>
                                {record.userName}
                            </Text>
                        );
                    } else {
                        return <Text strong>{record.userName}</Text>;
                    }
                } else {
                    return (
                        <Text delete strong type={'danger'}>
                            {record.userName}
                        </Text>
                    );
                }
            },
        },
        {
            title: 'Loại phép',
            children: [
                {
                    title: 'Đăng ký',
                    dataIndex: 'bookLeaveType',
                    key: 'bookLeaveType',
                    ellipsis: true,
                },
                {
                    title: 'Thực tế',
                    dataIndex: 'actualLeaveType',
                    key: 'actualLeaveType',
                    ellipsis: true,
                    render: (_, record) => {
                        if (record.actualLeaveTypeID) {
                            if (record.managerApprovedLeaveType) {
                                return (
                                    <>
                                        <CheckCircleFilled style={{ color: '#52c41a' }} />{' '}
                                        {record.actualLeaveType}
                                    </>
                                );
                            } else {
                                return (
                                    <Tag
                                        bordered={false}
                                        color="processing"
                                        icon={<SyncOutlined spin />}
                                        style={{ paddingLeft: 0, backgroundColor: 'white' }}
                                    >
                                        {record.actualLeaveType}
                                    </Tag>
                                );
                            }
                        }
                    },
                },
            ],
        },
        {
            title: 'Số ngày',
            children: [
                {
                    title: 'Đăng ký',
                    dataIndex: 'bookLeaveDay',
                    key: 'bookLeaveDay',
                    ellipsis: true,
                },
                {
                    title: 'Thực tế',
                    dataIndex: 'actualLeaveDay',
                    key: 'actualLeaveDay',
                    ellipsis: true,
                    render: (_, record) => {
                        if (record.actualLeaveDay) {
                            if (record.managerApprovedLeaveDay) {
                                return (
                                    <>
                                        <CheckCircleFilled style={{ color: '#52c41a' }} />{' '}
                                        {record.actualLeaveDay}
                                    </>
                                );
                            } else {
                                return (
                                    <Tag
                                        bordered={false}
                                        color="processing"
                                        icon={<SyncOutlined spin />}
                                        style={{ paddingLeft: 0, backgroundColor: 'white' }}
                                    >
                                        {record.actualLeaveDay}
                                    </Tag>
                                );
                            }
                        }
                    },
                },
            ],
        },
        {
            title: 'Từ ngày',
            dataIndex: 'bookFromDate',
            key: 'bookFromDate',
            ellipsis: true,
            render: (_, record) =>
                record.actualFromDate && record.managerApprovedLeaveDay
                    ? dayjs(record.actualFromDate).format('HH:mm DD/MM/YYYY')
                    : dayjs(record.bookFromDate).format('HH:mm DD/MM/YYYY'),
        },
        {
            title: 'Đến ngày',
            dataIndex: 'bookToDate',
            key: 'bookToDate',
            ellipsis: true,
            render: (_, record) =>
                record.actualToDate && record.managerApprovedLeaveDay
                    ? dayjs(record.actualToDate).format('HH:mm DD/MM/YYYY')
                    : dayjs(record.bookToDate).format('HH:mm DD/MM/YYYY'),
        },
        {
            title: 'Lý do',
            dataIndex: 'reason',
            key: 'reason',
            ellipsis: true,
        },
        {
            title: 'Ngày yêu cầu',
            dataIndex: 'requestDate',
            key: 'requestDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Xác nhận',
            children: [
                {
                    title: 'Tổ trưởng',
                    dataIndex: 'leaderApproved',
                    key: 'leaderApproved',
                    ellipsis: true,
                    render: (_, record) => {
                        if (record.leaderApproved === 0)
                            return <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
                        else if (record.leaderApproved === 1)
                            return <CheckCircleFilled style={{ color: '#52c41a' }} />;
                        else
                            return (
                                <Tag
                                    bordered={false}
                                    color="processing"
                                    icon={<SyncOutlined spin />}
                                    style={{ paddingLeft: 0, backgroundColor: 'white' }}
                                >
                                    Waiting...
                                </Tag>
                            );
                    },
                },
                {
                    title: 'Quản lý',
                    dataIndex: 'managerApproved',
                    key: 'managerApproved',
                    ellipsis: true,
                    render: (_, record) => {
                        if (record.managerApproved === 0)
                            return <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
                        else if (record.managerApproved === 1)
                            return <CheckCircleFilled style={{ color: '#52c41a' }} />;
                        else if (record.leaderApproved === 1)
                            return (
                                <Tag
                                    bordered={false}
                                    color="processing"
                                    icon={<SyncOutlined spin />}
                                    style={{ paddingLeft: 0, backgroundColor: 'white' }}
                                >
                                    Waiting...
                                </Tag>
                            );
                    },
                },
            ],
        },
        {
            title: 'Lý do từ chối',
            children: [
                {
                    title: 'Tổ trưởng',
                    dataIndex: 'leaderRejectReason',
                    key: 'leaderRejectReason',
                    ellipsis: true,
                },
                {
                    title: 'Quản lý',
                    dataIndex: 'managerRejectReason',
                    key: 'managerRejectReason',
                    ellipsis: true,
                },
            ],
        },
    ];

    const itemsBreadcrumb = [
        {
            title: <Link to="/">Home</Link>,
        },
        {
            title: <Link to="/leader">Leader</Link>,
        },
    ];

    return (
        <ContentComponent loading={loading} items={itemsBreadcrumb}>
            <Table
                bordered
                columns={columns}
                dataSource={leader}
                scroll={{ x: true }}
                showSorterTooltip={false}
            />
            <ModalConfirmComponent
                onCancel={() => setModalConfirm({ open: false })}
                onOk={modalConfirm.onOk}
                open={modalConfirm.open}
                message={modalConfirm.message}
            />
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />
            <ModalErrorOtherComponent
                onOk={() => setModalErrorOther({ open: false })}
                open={modalErrorOther.open}
                title={modalErrorOther.title}
                message={modalErrorOther.message}
            />
            <ModalReasonComponent
                afterClose={() => formReason.resetFields()}
                form={formReason}
                loading={loading}
                onCancel={() => setModalReason({ open: false })}
                onFinish={modalReason.onFinish}
                onOk={() => formReason.submit()}
                open={modalReason.open}
            />
            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
        </ContentComponent>
    );
};

export default LeaderPage;
