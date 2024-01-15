import React, { useEffect, useState } from 'react';

import {
    ContentComponent,
    ModalEditComponent,
    ModalErrorComponent,
    ModalErrorOtherComponent,
    ModalReasonComponent,
    ModalSuccessComponent,
} from '../components';
import { Dropdown, Form, Table, Tag } from 'antd';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    EditFilled,
    StopFilled,
    SyncOutlined,
} from '@ant-design/icons';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL = process.env.REACT_APP_API_URL;

const HistoryPage = () => {
    console.log('Run HistoryPage...');

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const [modalEdit, setModalEdit] = useState({});

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
        getLeaveList();
    }, []);

    const getLeaveList = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${URL}/api/leave/list/history`, {
                headers: {
                    Authorization: accessToken,
                },
            });

            setDataSource(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const cancelLeave = async id => {
        try {
            const response = await axios.put(
                `${URL}/api/leave/list/cancel/${id}`,
                {},
                {
                    headers: {
                        Authorization: accessToken,
                    },
                }
            );

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getLeaveList();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const requestCancelLeave = async (
        id,
        requestReason,
        leaveType,
        leaveDay,
        fromDate,
        toDate,
        reason
    ) => {
        try {
            const response = await axios.put(
                `${URL}/api/leave/list/request-cancel/${id}`,
                { requestReason, leaveType, leaveDay, fromDate, toDate, reason },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                }
            );

            setModalReason({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getLeaveList();
        } catch (error) {
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
                                label: 'Hủy phép',
                                icon: <StopFilled />,
                                onClick: () => {
                                    if (record.deleted || record.deleteRequest) {
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
                            {
                                key: 2,
                                label: 'Điều chỉnh',
                                icon: <EditFilled />,
                                onClick: () => {},
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
                if (record.deleted) return <Tag color="#ff4d4f">Đã xóa</Tag>;
                else {
                    if (record.tracking === 1) return <Tag color="#108ee9">Đã gửi Leader</Tag>;
                    if (record.tracking === 2) return <Tag color="#52c41a">Đã gửi Manager</Tag>;
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
                    render: (_, record) =>
                        record.actualLeaveType &&
                        record.managerApprovedLeaveType && (
                            <>
                                <CheckCircleFilled style={{ color: '#52c41a' }} />{' '}
                                {record.actualLeaveType}
                            </>
                        ),
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
                    render: (_, record) =>
                        record.actualLeaveDay &&
                        record.managerApprovedLeaveDay && (
                            <>
                                <CheckCircleFilled style={{ color: '#52c41a' }} />{' '}
                                {record.actualLeaveDay}
                            </>
                        ),
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
                        if (!record.deleted) {
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
                        }
                    },
                },
                {
                    title: 'Quản lý',
                    dataIndex: 'managerApproved',
                    key: 'managerApproved',
                    ellipsis: true,
                    render: (_, record) => {
                        if (!record.deleted && !record.deleteRequest) {
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
                dataSource={dataSource}
                scroll={{ x: true }}
                showSorterTooltip={false}
            />
            <ModalEditComponent afterClose={() => formEdit.resetFields()} />
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
                onCancel={() => setModalReason({ open: false })}
                onOk={() => formReason.submit()}
                open={modalReason.open}
                form={formReason}
                onFinish={modalReason.onFinish}
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
