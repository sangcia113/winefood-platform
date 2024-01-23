import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ReactApexChart from 'react-apexcharts';

import {
    Avatar,
    DatePicker,
    Divider,
    Dropdown,
    Flex,
    Form,
    QRCode,
    Space,
    Table,
    Tabs,
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    ReadFilled,
    StopFilled,
    SyncOutlined,
    TagFilled,
    UnlockFilled,
} from '@ant-design/icons';
import { PencilFill, ThreeDotsVertical } from 'react-bootstrap-icons';

import {
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalErrorOtherComponent,
    ModalSuccessComponent,
    ModalReasonComponent,
    ContentComponent,
} from '../components';

import { createConnection, getUniqueName } from '../utils';

const { RangePicker } = DatePicker;
const { Text } = Typography;

const ManagerPage = () => {
    console.log('Run ManagerPage...');

    const [loading, setLoading] = useState(false);
    const [leaveList, setLeaveList] = useState([]);
    const [leaveListOther, setLeaveListOther] = useState([]);
    const [leaveListStatistics, setLeaveListStatistics] = useState([]);
    const [totalWaiting, setTotalWaiting] = useState(0);

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

    const [form] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getLeaveList();
        getLeaveListOther();
        getLeaveListStatistics();
    }, []);

    const getDataSource = async (url, params = {}, setDataSource) => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(url, {
                params,
            });

            const arrData = response.data.map(item => ({
                ...item,
                key: item.id,
            }));

            setDataSource(arrData);
        } catch (error) {
            setModalError({ open: true, error });
        } finally {
            setLoading(false);
        }
    };

    const getLeaveList = async () => {
        await getDataSource(`/leave/list/manager`, {}, setLeaveList);

        getTotalWaiting();
    };

    const getLeaveListByDate = async (startDate, endDate) => {
        await getDataSource(
            `/leave/list/manager/search`,
            {
                startDate: dayjs(startDate).format('YYYY-MM-DD'),
                endDate: dayjs(endDate).format('YYYY-MM-DD'),
            },
            setLeaveList
        );

        getTotalWaiting();
    };

    const getLeaveListOther = async () => {
        await getDataSource(`/leave/list/manager/other`, {}, setLeaveListOther);
    };

    const getLeaveListOtherByDate = async (startDate, endDate) => {
        await getDataSource(
            `/leave/list/manager/other/search`,
            {
                startDate: dayjs(startDate).format('YYYY-MM-DD'),
                endDate: dayjs(endDate).format('YYYY-MM-DD'),
            },
            setLeaveListOther
        );
    };

    const getLeaveListStatistics = async () => {
        await getDataSource(`/leave/list/manager/statistics`, {}, setLeaveListStatistics);
    };

    const getLeaveListStatisticsByDate = async (startDate, endDate) => {
        await getDataSource(
            `/leave/list/manager/statistics/search`,
            {
                startDate: dayjs(startDate).format('YYYY-MM-DD'),
                endDate: dayjs(endDate).format('YYYY-MM-DD'),
            },
            setLeaveListStatistics
        );
    };

    const getTotalWaiting = () => {
        const total = leaveList.reduce(
            (accumulator, currentValue) =>
                !currentValue.managerApproved && !currentValue.deleteRequest
                    ? accumulator + 1
                    : accumulator,
            0
        );

        setTotalWaiting(total);
    };

    const approveLeave = async (
        id,
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
                `/leave/list/manager/approved/${id}`,
                {
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

            setModalConfirm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getLeaveList();
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
                `/leave/list/manager/rejected/${id}`,
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

            getLeaveList();
        } catch (error) {
            setModalReason({ open: false });

            setModalError({ open: true, error });
        }
    };

    const approveLeaveType = async id => {
        try {
            const response = await createConnection(accessToken).put(
                `/leave/list/manager/approved-leave-type/${id}`
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });
        } catch (error) {
            setModalConfirm({ open: false });

            setModalError({ open: true, error });
        }
    };

    const approveLeaveDay = async (
        id,
        actualLeaveDay,
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
                `/leave/list/manager/approved-leave-day/${id}`,
                {
                    actualLeaveDay,
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

            setModalConfirm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });
        } catch (error) {
            setModalConfirm({ open: false });

            setModalError({ open: true, error });
        }
    };

    const approveRequestDelete = async id => {
        try {
            const response = await createConnection(accessToken).put(
                `/leave/list/manager/approved-request-delete/${id}`
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });
        } catch (error) {
            setModalConfirm({ open: false });

            setModalError({ open: true, error });
        }
    };

    const columnsLeaveList = [
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
                                icon: <PencilFill />,
                                onClick: () => {
                                    if (record.managerApproved === 1) {
                                        setModalErrorOther({
                                            message: (
                                                <ul>
                                                    <li>
                                                        <b>Bạn đã phê duyệt</b> yêu cầu nghỉ phép
                                                        này.
                                                    </li>
                                                </ul>
                                            ),
                                            open: true,
                                            title: 'KHÔNG THỂ PHÊ DUYỆT',
                                        });
                                    } else {
                                        console.log(record);
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
                                                    record.userId,
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
                                style: { color: '#52c41a' },
                            },
                            {
                                key: 2,
                                label: 'Từ chối',
                                icon: <StopFilled />,
                                onClick: () => {
                                    if (record.managerApproved === 0) {
                                        setModalErrorOther({
                                            message: (
                                                <ul>
                                                    <li>
                                                        <b>Bạn đã từ chối</b> yêu cầu nghỉ phép này.
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
                            {
                                key: 3,
                                label: 'Xác nhận',
                                icon: <CheckCircleFilled />,
                                children: [
                                    {
                                        key: 4,
                                        label: 'Loại phép',
                                        icon: <TagFilled />,
                                        style: { color: '#c41d7f' },
                                        onClick: () => {
                                            if (
                                                !record.actualLeaveTypeId ||
                                                record.managerApprovedLeaveType === 1
                                            ) {
                                                setModalErrorOther({
                                                    message: (
                                                        <ul>
                                                            <li>
                                                                Không có yêu cầu điều chỉnh{' '}
                                                                <b>loại nghỉ phép thực tế.</b>
                                                            </li>
                                                            <li>
                                                                <b>Bạn đã xác nhận điều chỉnh</b>{' '}
                                                                loại nghỉ phép thực tế này.
                                                            </li>
                                                        </ul>
                                                    ),
                                                    open: true,
                                                    title: 'KHÔNG THỂ XÁC NHẬN',
                                                });
                                            } else {
                                                setModalConfirm({
                                                    message: (
                                                        <Space direction="vertical" align="center">
                                                            Bạn có chắc xác nhận loại phép của
                                                            <b>{record.userName}</b>
                                                        </Space>
                                                    ),
                                                    onOk: () =>
                                                        approveLeaveType(
                                                            record.id,
                                                            record.actualLeaveType,
                                                            record.userId,
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
                                    },
                                    {
                                        key: 5,
                                        label: 'Số ngày',
                                        icon: <ReadFilled />,
                                        style: { color: '#1677ff' },
                                        onClick: () => {
                                            if (
                                                !record.actualLeaveDay ||
                                                record.managerApprovedLeaveDay === 1
                                            ) {
                                                setModalErrorOther({
                                                    message: (
                                                        <ul>
                                                            <li>
                                                                Không có yêu cầu điều chỉnh{' '}
                                                                <b>số ngày nghỉ phép thực tế.</b>
                                                            </li>
                                                            <li>
                                                                <b>Bạn đã xác nhận điều chỉnh</b> số
                                                                ngày nghỉ phép thực tế này.
                                                            </li>
                                                        </ul>
                                                    ),
                                                    open: true,
                                                    title: 'KHÔNG THỂ XÁC NHẬN',
                                                });
                                            } else {
                                                setModalConfirm({
                                                    message: (
                                                        <Space direction="vertical" align="center">
                                                            Bạn có chắc xác nhận số ngày nghỉ phép
                                                            của
                                                            <b>{record.userName}</b>
                                                        </Space>
                                                    ),
                                                    onOk: () =>
                                                        approveLeaveDay(
                                                            record.id,
                                                            record.actualLeaveDay,
                                                            record.userId,
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
                                    },
                                    {
                                        key: 6,
                                        label: 'Huỷ phép',
                                        icon: <UnlockFilled />,
                                        style: { color: '#531dab' },
                                        onClick: () => {
                                            if (
                                                !record.deleteRequest ||
                                                record.managerApprovedDelete === 1
                                            ) {
                                                setModalErrorOther({
                                                    message: (
                                                        <ul>
                                                            <li>
                                                                Không có yêu cầu <b>hủy phép.</b>
                                                            </li>
                                                            <li>
                                                                <b>Bạn đã xác nhận hủy phép</b> này.
                                                            </li>
                                                        </ul>
                                                    ),
                                                    open: true,
                                                    title: 'KHÔNG THỂ XÁC NHẬN',
                                                });
                                            } else {
                                                setModalConfirm({
                                                    message: (
                                                        <Space direction="vertical" align="center">
                                                            Bạn có chắc xác nhận yêu cầu hủy phép
                                                            của
                                                            <b>{record.userName}</b>
                                                        </Space>
                                                    ),
                                                    onOk: () => approveRequestDelete(record.id),
                                                    open: true,
                                                });
                                            }
                                        },
                                    },
                                ],
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
            ellipsis: true,
            sorter: (a, b) => a.id - b.id,
            render: (_, record) => (
                <Tooltip
                    color={'white'}
                    overlayStyle={{
                        border: '4px solid #52c41a', // Đặt độ dày và màu cho border ở đây
                        borderRadius: '10px', // Đặt bo góc nếu cần
                        color: 'black',
                        fontSize: 18,
                        minWidth: '300px',
                    }}
                    placement={'right'}
                    title={
                        <div style={{ color: 'black' }}>
                            <p align={'center'} style={{ margin: 8 }}>
                                <b>THÔNG TIN NGHỈ PHÉP</b>
                            </p>
                            <Divider style={{ backgroundColor: '#52c41a', margin: 0 }} />
                            <p>
                                Loại phép (Đăng ký): <b>{record.bookLeaveType}</b>
                            </p>
                            <p>
                                Loại phép (Thực tế): <b>{record.actualLeaveType}</b>
                            </p>
                            <Divider style={{ backgroundColor: '#52c41a', margin: 0 }} />
                            <p>
                                Số ngày nghỉ (Đăng ký): <b>{record.bookLeaveDay}</b>
                            </p>
                            <p>
                                Số ngày nghỉ (Thực tế): <b>{record.actualLeaveDay}</b>
                            </p>
                            <Divider style={{ backgroundColor: '#52c41a', margin: 0 }} />
                            <p>
                                Từ ngày:{' '}
                                <b>{dayjs(record.bookFromDate).format('DD/MM/YYYY HH:mm')}</b>
                            </p>
                            <p>
                                Đến ngày:{' '}
                                <b>{dayjs(record.bookToDate).format('DD/MM/YYYY HH:mm')}</b>
                            </p>
                            <p>
                                Lý do: <b>{record.reason}</b>
                            </p>
                            <p>
                                Ngày yêu cầu:{' '}
                                <b>{dayjs(record.requestDate).format('DD/MM/YYYY HH:mm')}</b>
                            </p>
                            <Divider style={{ backgroundColor: '#52c41a', margin: 0 }} />
                            <p>
                                Leader:{' '}
                                <b>
                                    {record.leaderApproved === 1 && (
                                        <span>
                                            <CheckCircleFilled style={{ color: '#52c41a' }} />{' '}
                                            {dayjs(record.leaderApprovedDate).format(
                                                'DD/MM/YYYY HH:mm'
                                            )}
                                        </span>
                                    )}
                                </b>
                            </p>
                            <p>
                                Manager:{' '}
                                <b>
                                    {record.managerApproved === 1 ? (
                                        <>
                                            <CheckCircleFilled style={{ color: '#52c41a' }} />{' '}
                                            {dayjs(record.managerApprovedDate).format(
                                                'DD/MM/YYYY HH:mm'
                                            )}
                                        </>
                                    ) : record.managerApproved === 0 ? (
                                        <>
                                            <CloseCircleFilled style={{ color: '#ff4d4f' }} />{' '}
                                            {dayjs(record.managerApprovedDate).format(
                                                'DD/MM/YYYY HH:mm'
                                            )}
                                        </>
                                    ) : (
                                        <Tag
                                            bordered={false}
                                            color="processing"
                                            icon={<SyncOutlined spin />}
                                            style={{ paddingLeft: 0, backgroundColor: 'white' }}
                                        >
                                            Waiting...
                                        </Tag>
                                    )}
                                </b>
                            </p>
                        </div>
                    }
                >
                    <Text>{record.id}</Text>
                </Tooltip>
            ),
        },
        {
            title: 'QR',
            dataIndex: 'qr',
            key: 'qr',
            ellipsis: true,
            render: (_, record) => (
                <QRCode
                    bordered={false}
                    size={80}
                    value={`${record.userName} | ${record.bookLeaveType} | ${record.bookLeaveDay}`}
                />
            ),
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            filters: getUniqueName(leaveList, 'userId', 'userName'),
            filterSearch: true,
            onFilter: (value, record) => record.userName.includes(value),
            render: (_, record) => {
                if (!record.managerApprovedDelete) {
                    if (record.managerApproved === null) {
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
                },
            ],
        },
        {
            title: 'Bộ phận',
            dataIndex: 'department',
            key: 'department',
            ellipsis: true,
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
                },
            ],
        },
        {
            title: 'Từ ngày',
            dataIndex: 'bookFromDate',
            key: 'bookFromDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Đến ngày',
            dataIndex: 'bookToDate',
            key: 'bookToDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
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
                    render: record => record && <CheckCircleFilled style={{ color: '#52c41a' }} />,
                },
                {
                    title: 'Quản lý',
                    dataIndex: 'managerApproved',
                    key: 'managerApproved',
                    ellipsis: true,
                    render: (_, record) => {
                        if (record.managerApproved === 0) {
                            return <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
                        } else if (record.managerApproved === 1) {
                            return <CheckCircleFilled style={{ color: '#52c41a' }} />;
                        } else if (!record.managerApprovedDelete) {
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
                        if (record.deleteRequest === 1) {
                            if (!record.managerApprovedDelete) {
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
                            } else if (record.managerApprovedDelete === 1) {
                                return <CheckCircleFilled style={{ color: '#52c41a' }} />;
                            } else {
                                return <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
                            }
                        }
                    },
                },
            ],
        },
        {
            title: 'Lý do từ chối',
            dataIndex: 'managerRejectReason',
            key: 'managerReason',
            ellipsis: true,
        },
    ];

    const columnsLeaveListOther = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'deleted',
            key: 'deleted',
            ellipsis: true,
            render: record =>
                record === 1 ? (
                    <Tag color={'#ff4d4f'}>Đã xóa</Tag>
                ) : (
                    <Tag color={'#52c41a'}>Chờ duyệt</Tag>
                ),
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            filters: getUniqueName(leaveListOther, 'userId', 'userName'),
            filterSearch: true,
            onFilter: (value, record) => record.userName.includes(value),
            render: (_, record) =>
                record.deleted === 1 ? (
                    <Text delete strong type={'danger'}>
                        {record.userName}
                    </Text>
                ) : (
                    <Text strong>{record.userName}</Text>
                ),
        },
        {
            title: 'Bộ phận',
            dataIndex: 'department',
            key: 'department',
            ellipsis: true,
        },
        {
            title: 'Loại phép',
            dataIndex: 'bookLeaveType',
            key: 'bookLeaveType',
            ellipsis: true,
        },
        {
            title: 'Số ngày nghỉ',
            dataIndex: 'bookLeaveDay',
            key: 'bookLeaveDay',
            ellipsis: true,
        },
        {
            title: 'Từ ngày',
            dataIndex: 'bookFromDate',
            key: 'bookFromDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Đến ngày',
            dataIndex: 'bookToDate',
            key: 'bookToDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
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
    ];

    const itemsBreadcrumb = [
        {
            title: <Link to="/">Home</Link>,
        },
        {
            title: <Link to="/manager">Manager</Link>,
        },
    ];

    return (
        <ContentComponent loading={loading} items={itemsBreadcrumb}>
            <Tabs
                centered
                defaultActiveKey="1"
                items={[
                    {
                        key: 1,
                        label: (
                            <>
                                Danh Sách Nghỉ Phép{' '}
                                {totalWaiting !== 0 && (
                                    <Avatar
                                        style={{
                                            backgroundColor: '#f50',
                                        }}
                                    >
                                        {totalWaiting}
                                    </Avatar>
                                )}
                            </>
                        ),
                        children: (
                            <Flex vertical gap={'large'}>
                                <Flex justify={'end'} align={'center'} gap={'middle'}>
                                    <Text>Select Date</Text>
                                    <RangePicker
                                        format={'DD/MM/YYYY'}
                                        onCalendarChange={dates => {
                                            const [startDate, endDate] = dates || [];

                                            if (startDate && endDate) {
                                                getLeaveListByDate(startDate, endDate);
                                            } else if (!startDate && !endDate) {
                                                getLeaveList();
                                            }
                                        }}
                                    />
                                </Flex>
                                <Table
                                    bordered
                                    columns={columnsLeaveList}
                                    dataSource={leaveList}
                                    scroll={{ x: true }}
                                    showSorterTooltip={false}
                                />
                            </Flex>
                        ),
                    },
                    {
                        key: 2,
                        label: 'Danh Sách Khác',
                        children: (
                            <Flex vertical gap={'large'}>
                                <Flex justify={'end'} align={'center'} gap={'middle'}>
                                    <Text>Select Date</Text>
                                    <RangePicker
                                        format={'DD/MM/YYYY'}
                                        onCalendarChange={dates => {
                                            const [startDate, endDate] = dates || [];

                                            if (startDate && endDate) {
                                                getLeaveListOtherByDate(startDate, endDate);
                                            } else if (!startDate && !endDate) {
                                                getLeaveListOther();
                                            }
                                        }}
                                    />
                                </Flex>
                                <Table
                                    bordered
                                    columns={columnsLeaveListOther}
                                    dataSource={leaveListOther}
                                    scroll={{ x: true }}
                                    showSorterTooltip={false}
                                />
                            </Flex>
                        ),
                    },
                    {
                        key: 3,
                        label: 'Thống Kê Dữ Liệu',
                        children: (
                            <Flex vertical gap={'large'}>
                                <Flex justify={'end'} align={'center'} gap={'middle'}>
                                    <Text>Select Date</Text>
                                    <RangePicker
                                        format={'DD/MM/YYYY'}
                                        onCalendarChange={dates => {
                                            const [startDate, endDate] = dates || [];

                                            if (startDate && endDate) {
                                                getLeaveListStatisticsByDate(startDate, endDate);
                                            } else if (!startDate && !endDate) {
                                                getLeaveListStatistics();
                                            }
                                        }}
                                    />
                                </Flex>
                                <ReactApexChart
                                    options={{
                                        chart: {
                                            type: 'area',
                                            // stacked: Xác định xem các loại dữ liệu có được xếp chồng lên nhau không.
                                            stacked: false,
                                            height: 500,
                                            zoom: {
                                                type: 'x',
                                                enabled: true,
                                                autoScaleYaxis: true,
                                            },
                                            toolbar: {
                                                autoSelected: 'zoom',
                                            },
                                        },
                                        dataLabels: {
                                            enabled: false,
                                        },
                                        // markers: Cấu hình cho đánh dấu trên biểu đồ.
                                        markers: {
                                            size: 0,
                                        },
                                        title: {
                                            text: 'Thống Kê Tổng Số Ngày Nghỉ Của Nhân Viên',
                                            align: 'center',
                                        },
                                        fill: {
                                            type: 'gradient',
                                            gradient: {
                                                shadeIntensity: 1,
                                                inverseColors: false,
                                                opacityFrom: 0.5,
                                                opacityTo: 0,
                                                stops: [0, 90, 100],
                                            },
                                        },
                                        yaxis: {
                                            title: {
                                                text: 'Số ngày nghỉ',
                                            },
                                        },
                                        tooltip: {
                                            shared: false,
                                            y: { formatter: total => `${total} (ngày)` },
                                        },
                                    }}
                                    series={[
                                        {
                                            name: 'Tổng số ngày nghỉ: ',
                                            data: leaveListStatistics.map(item => ({
                                                x: item.name,
                                                y: item.totalLeave,
                                            })),
                                        },
                                    ]}
                                    type="area"
                                    height={700}
                                />
                            </Flex>
                        ),
                    },
                ]}
                tabBarGutter={40}
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
                afterClose={() => form.resetFields()}
                onCancel={() => setModalReason({ open: false })}
                onOk={() => form.submit()}
                open={modalReason.open}
                form={form}
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

export default ManagerPage;
