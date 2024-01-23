import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Dropdown, Form, Table, Tag, Typography } from 'antd';
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
    ModalEditComponent,
    ModalErrorComponent,
    ModalErrorOtherComponent,
    ModalReasonComponent,
    ModalSuccessComponent,
} from '../components';

import { createConnection } from '../utils';

const { Text } = Typography;

const HistoryPage = () => {
    console.log('Run HistoryPage...');

    const [loading, setLoading] = useState(false);

    const [history, setHistory] = useState([]);

    const [leaveType, setLeaveType] = useState([]);

    const [modalEdit, setModalEdit] = useState({
        open: false,
        onFinish: () => {},
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

    const [formEdit] = Form.useForm();
    const [formReason] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getHistory();
        getLeaveType();
    }, []);

    const getLeaveType = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/leave/type`);

            setLeaveType(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const getHistory = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/leave/list/history`);

            setHistory(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const cancelLeave = async id => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).put(
                `/leave/list/history/cancel/${id}`
            );

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getHistory();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const requestCancelLeave = async (
        id,
        requestReason,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason
    ) => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).put(
                `/leave/list/history/request-cancel/${id}`,
                {
                    requestReason,
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
                        Đã gửi yêu cầu lên cấp trên
                        <br />
                        <b>{response.data.receiver}</b>
                        <br />
                        qua <b>Zalo</b>
                    </Text>
                ),
                open: true,
            });

            getHistory();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const requestEditLeave = async (
        id,
        actualLeaveTypeId,
        actualLeaveType,
        actualLeaveDay,
        actualFromDate,
        actualToDate,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason
    ) => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).put(
                `/leave/list/history/request-edit/${id}`,
                {
                    actualLeaveTypeId,
                    actualLeaveType,
                    actualLeaveDay,
                    actualFromDate,
                    actualToDate,
                    bookLeaveType,
                    bookLeaveDay,
                    bookFromDate,
                    bookToDate,
                    reason,
                }
            );

            setModalEdit({ open: false });

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

            getHistory();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
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
                                label: 'Điều chỉnh',
                                icon: <EditFilled />,
                                onClick: () => {
                                    formEdit.setFieldsValue({
                                        id: record.id,
                                        actualLeaveTypeId: record.bookLeaveTypeId,
                                        actualLeaveDay: record.bookLeaveDay,
                                        actualFromDate: dayjs(record.bookFromDate),
                                        actualToDate: dayjs(record.bookToDate),
                                    });

                                    setModalEdit({
                                        onFinish: values =>
                                            requestEditLeave(
                                                record.id,
                                                values.actualLeaveTypeId,
                                                leaveType.find(
                                                    l => l.id === values.actualLeaveTypeId
                                                )?.nameVN,
                                                values.actualLeaveDay,
                                                values.actualFromDate,
                                                values.actualToDate,
                                                record.bookLeaveType,
                                                record.bookLeaveDay,
                                                record.bookFromDate,
                                                record.bookToDate,
                                                record.reason
                                            ),
                                        open: true,
                                    });
                                },
                                style: {
                                    color: '#faad14',
                                },
                            },
                            {
                                key: 2,
                                label: 'Hủy phép',
                                icon: <StopFilled />,
                                onClick: () => {
                                    if (record.deleteRequest) {
                                        setModalErrorOther({
                                            message: (
                                                <ul>
                                                    <li>
                                                        <b>Bạn đã tự huỷ</b> yêu cầu nghỉ phép này.
                                                    </li>
                                                    <li>
                                                        <b>Bạn đã yêu cầu hủy</b> yêu cầu nghỉ phép
                                                        này.
                                                    </li>
                                                </ul>
                                            ),
                                            open: true,
                                            title: 'KHÔNG THỂ HUỶ PHÉP',
                                        });
                                    } else if (
                                        record.leaderApproved === 1 ||
                                        record.managerApproved === 1
                                    ) {
                                        setModalReason({
                                            open: true,
                                            onFinish: values =>
                                                requestCancelLeave(
                                                    record.id,
                                                    values.reason,
                                                    record.bookLeaveType,
                                                    record.bookLeaveDay,
                                                    record.bookFromDate,
                                                    record.bookToDate,
                                                    record.reason
                                                ),
                                        });
                                    } else {
                                        cancelLeave(record.id);
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
                    if (record.tracking === 1 && [1, 6].includes(record.roleId))
                        return <Tag color="#108ee9">Đã gửi Leader</Tag>;
                    if (record.tracking === 2 || [2, 3, 4, 5].includes(record.roleId))
                        return <Tag color="#52c41a">Đã gửi Manager</Tag>;
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
                        else if ([1, 6].includes(record.roleId))
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
                        if (!record.deleteRequest) {
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
                        }
                    },
                },
                {
                    title: 'Huỷ phép',
                    dataIndex: 'managerApprovedDelete',
                    key: 'managerApprovedDelete',
                    ellipsis: true,
                    render: (_, record) => {
                        if (record.deleteRequest) {
                            if (record.managerApprovedDelete === 0)
                                return <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
                            else if (record.managerApprovedDelete === 1)
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
                        }
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
            title: <Link to="/history">History</Link>,
        },
    ];

    return (
        <ContentComponent loading={loading} items={itemsBreadcrumb}>
            <Table
                bordered
                columns={columns}
                dataSource={history}
                scroll={{ x: true }}
                showSorterTooltip={false}
            />
            <ModalEditComponent
                afterClose={() => formEdit.resetFields()}
                form={formEdit}
                leaveType={leaveType}
                loading={loading}
                onCancel={() => setModalEdit({ open: false })}
                onFinish={modalEdit.onFinish}
                onOk={() => formEdit.submit()}
                open={modalEdit.open}
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

export default HistoryPage;
