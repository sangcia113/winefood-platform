import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ReactApexChart from 'react-apexcharts';
import * as XLSX from 'xlsx';

import {
    Avatar,
    Button,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Dropdown,
    Flex,
    Form,
    Row,
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
    DownloadOutlined,
    FilterFilled,
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

const ExportExcelButton = ({ dataSource }) => {
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataSource);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách nghỉ phép');
        XLSX.writeFile(
            workbook,
            `Danh sách nghỉ phép_${dayjs(new Date()).format('YYYY.MM.DD')}.xlsx`
        );
    };

    return (
        <Button icon={<DownloadOutlined />} onClick={exportToExcel} shape="round" type="primary">
            Excel
        </Button>
    );
};

const ManagerPage = () => {
    const [loading, setLoading] = useState(false);
    const [leaveList, setLeaveList] = useState([]);
    const [leaveListOther, setLeaveListOther] = useState([]);
    const [leaveListStatistics, setLeaveListStatistics] = useState([]);
    const [totalWaiting, setTotalWaiting] = useState(0);
    const [filteredLeaveList, setFilteredLeaveList] = useState([]);

    const [modalConfirm, setModalConfirm] = useState({
        message: '',
        onOk: () => {},
        open: false,
    });

    const [modalError, setModalError] = useState({
        error: '',
        open: false,
    });

    const [modalErrorOther, setModalErrorOther] = useState({
        message: '',
        open: false,
        title: '',
    });

    const [modalReason, setModalReason] = useState({
        open: false,
        onFinish: () => {},
    });

    const [modalSuccess, setModalSuccess] = useState({
        message: '',
        open: false,
    });

    const [form] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getManager();
        getManagerOther();
        getManagerStatistics();
    }, []);

    useEffect(() => {
        const totalWaiting = leaveList.reduce(
            (accumulator, currentValue) =>
                currentValue.managerApproved === null && !currentValue.managerApprovedDelete
                    ? accumulator + 1
                    : accumulator,
            0
        );

        setTotalWaiting(totalWaiting);
    }, [leaveList]);

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

    const getManager = async () => {
        await getDataSource(`/leave/list/manager`, {}, setLeaveList);
    };

    const getManagerByDate = async (startDate, endDate) => {
        await getDataSource(
            `/leave/list/manager/search`,
            {
                startDate: dayjs(startDate).format('YYYY-MM-DD'),
                endDate: dayjs(endDate).format('YYYY-MM-DD'),
            },
            setLeaveList
        );
    };

    const getManagerOther = async () => {
        await getDataSource(`/leave/list/manager/other`, {}, setLeaveListOther);
    };

    const getManagerOtherByDate = async (startDate, endDate) => {
        await getDataSource(
            `/leave/list/manager/other/search`,
            {
                startDate: dayjs(startDate).format('YYYY-MM-DD'),
                endDate: dayjs(endDate).format('YYYY-MM-DD'),
            },
            setLeaveListOther
        );
    };

    const getManagerStatistics = async () => {
        await getDataSource(`/leave/list/manager/statistics`, {}, setLeaveListStatistics);
    };

    const getManagerStatisticsByDate = async (startDate, endDate) => {
        await getDataSource(
            `/leave/list/manager/statistics/search`,
            {
                startDate: dayjs(startDate).format('YYYY-MM-DD'),
                endDate: dayjs(endDate).format('YYYY-MM-DD'),
            },
            setLeaveListStatistics
        );
    };

    const getWaitingForApprove = () => {
        const filtered = leaveList.filter(
            item => item.managerApproved === null && !item.deleteRequest
        );
        setFilteredLeaveList(filtered);
    };

    const getWaitingForApproveLeaveType = () => {
        const filtered = leaveList.filter(
            item =>
                item.actualLeaveDay &&
                !item.managerApprovedLeaveDay &&
                item.actualLeaveDay !== item.bookLeaveDay &&
                item.actualFromDate !== item.bookFromDat &&
                item.actualToDate !== item.bookToDate
        );
        setFilteredLeaveList(filtered);
    };

    const getWaitingForApproveLeaveDay = () => {
        const filtered = leaveList.filter(
            item =>
                item.actualLeaveTypeId &&
                !item.managerApprovedLeaveType &&
                item.actualLeaveTypeId !== item.bookLeaveTypeId
        );
        setFilteredLeaveList(filtered);
    };

    const getWaitingForApproveDeleteRequest = () => {
        const filtered = leaveList.filter(
            item => item.deleteRequest && item.managerApprovedDelete === null
        );
        setFilteredLeaveList(filtered);
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
        reason,
        requestDate
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
                    requestDate,
                }
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Đã gửi thông báo <Text style={{ color: '#52c41a' }}>phê duyệt</Text> đến
                        nhân viên
                        <br />
                        <b>{response.data.receiver}</b>
                        <br />
                        qua <b>Zalo</b>
                    </Text>
                ),
                open: true,
            });

            getManager();
        } catch (error) {
            setModalConfirm({ open: false });

            setModalError({ open: true, error });

            getManager();
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
        reason,
        requestDate
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
                    requestDate,
                }
            );

            setModalReason({ open: false });

            setModalSuccess({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Đã gửi thông báo <Text style={{ color: '#ff4d4f' }}>từ chối</Text> đến nhân
                        viên
                        <br />
                        <b>{response.data.receiver}</b>
                        <br />
                        qua <b>Zalo</b>
                    </Text>
                ),
                open: true,
            });

            getManager();
        } catch (error) {
            setModalReason({ open: false });

            setModalError({ open: true, error });

            getManager();
        }
    };

    const approveLeaveType = async (
        id,
        userId,
        userName,
        department,
        actualLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        requestDate
    ) => {
        try {
            const response = await createConnection(accessToken).put(
                `/leave/list/manager/approved-leave-type/${id}`,
                {
                    userId,
                    userName,
                    department,
                    actualLeaveType,
                    bookLeaveDay,
                    bookFromDate,
                    bookToDate,
                    reason,
                    requestDate,
                }
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Đã gửi thông báo <Text style={{ color: '#52c41a' }}>phê duyệt</Text> đến
                        nhân viên
                        <br />
                        <b>{response.data.receiver}</b>
                        <br />
                        qua <b>Zalo</b>
                    </Text>
                ),
                open: true,
            });

            getManager();
        } catch (error) {
            setModalConfirm({ open: false });

            setModalError({ open: true, error });

            getManager();
        }
    };

    const approveLeaveDay = async (
        id,
        userId,
        userName,
        department,
        bookLeaveType,
        actualLeaveDay,
        actualFromDate,
        actualToDate,
        reason,
        requestDate
    ) => {
        try {
            const response = await createConnection(accessToken).put(
                `/leave/list/manager/approved-leave-day/${id}`,
                {
                    userId,
                    userName,
                    department,
                    bookLeaveType,
                    actualLeaveDay,
                    actualFromDate,
                    actualToDate,
                    reason,
                    requestDate,
                }
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Đã gửi thông báo <Text style={{ color: '#52c41a' }}>phê duyệt</Text> đến
                        nhân viên
                        <br />
                        <b>{response.data.receiver}</b>
                        <br />
                        qua <b>Zalo</b>
                    </Text>
                ),
                open: true,
            });

            getManager();
        } catch (error) {
            setModalConfirm({ open: false });

            setModalError({ open: true, error });

            getManager();
        }
    };

    const approveCancelLeave = async (
        id,
        userId,
        userName,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        requestDate
    ) => {
        try {
            const response = await createConnection(accessToken).put(
                `/leave/list/manager/approved-request-delete/${id}`,
                {
                    userId,
                    userName,
                    department,
                    bookLeaveType,
                    bookLeaveDay,
                    bookFromDate,
                    bookToDate,
                    reason,
                    requestDate,
                }
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Đã gửi thông báo <Text style={{ color: '#52c41a' }}>phê duyệt</Text> đến
                        nhân viên
                        <br />
                        <b>{response.data.receiver}</b>
                        <br />
                        qua <b>Zalo</b>
                    </Text>
                ),
                open: true,
            });

            getManager();
        } catch (error) {
            setModalConfirm({ open: false });

            setModalError({ open: true, error });

            getManager();
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
                                                    record.reason,
                                                    record.requestDate
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
                                                    record.reason,
                                                    record.requestDate
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
                                                            record.userId,
                                                            record.userName,
                                                            record.department,
                                                            record.actualLeaveType,
                                                            record.bookLeaveDay,
                                                            record.bookFromDate,
                                                            record.bookToDate,
                                                            record.reason,
                                                            record.requestDate
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
                                                            record.userId,
                                                            record.userName,
                                                            record.department,
                                                            record.bookLeaveType,
                                                            record.actualLeaveDay,
                                                            record.actualFromDate,
                                                            record.actualToDate,
                                                            record.reason,
                                                            record.requestDate
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
                                                    onOk: () =>
                                                        approveCancelLeave(
                                                            record.id,
                                                            record.userId,
                                                            record.userName,
                                                            record.department,
                                                            record.bookLeaveType,
                                                            record.bookLeaveDay,
                                                            record.bookFromDate,
                                                            record.bookToDate,
                                                            record.reason,
                                                            record.requestDate
                                                        ),
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
                                <b>{dayjs(record.bookFromDate).format('HH:mm DD/MM/YYYY')}</b>
                            </p>
                            <p>
                                Đến ngày:{' '}
                                <b>{dayjs(record.bookToDate).format('HH:mm DD/MM/YYYY')}</b>
                            </p>
                            <p>
                                Lý do: <b>{record.reason}</b>
                            </p>
                            <p>
                                Ngày yêu cầu:{' '}
                                <b>{dayjs(record.requestDate).format('HH:mm DD/MM/YYYY')}</b>
                            </p>
                            <Divider style={{ backgroundColor: '#52c41a', margin: 0 }} />
                            <p>
                                Leader:{' '}
                                <b>
                                    {record.leaderApproved === 1 && (
                                        <span>
                                            <CheckCircleFilled style={{ color: '#52c41a' }} />{' '}
                                            {dayjs(record.leaderApprovedDate).format(
                                                'HH:mm DD/MM/YYYY'
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
                                                'HH:mm DD/MM/YYYY'
                                            )}
                                        </>
                                    ) : record.managerApproved === 0 ? (
                                        <>
                                            <CloseCircleFilled style={{ color: '#ff4d4f' }} />{' '}
                                            {dayjs(record.managerApprovedDate).format(
                                                'HH:mm DD/MM/YYYY'
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
        // {
        //     title: 'QR',
        //     dataIndex: 'qr',
        //     key: 'qr',
        //     ellipsis: true,
        //     render: (_, record) => (
        //         <QRCode
        //             bordered={false}
        //             size={80}
        //             value={`${record.userName} | ${record.bookLeaveType} | ${record.bookLeaveDay}`}
        //         />
        //     ),
        // },
        {
            title: 'Họ và Tên',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            filters: getUniqueName(leaveList, 'userId', 'userName'),
            filterSearch: true,
            onFilter: (value, record) => record.userName === value,
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
                    render: (_, record) => {
                        if (
                            record.actualLeaveTypeId &&
                            record.bookLeaveTypeId !== record.actualLeaveTypeId
                        ) {
                            if (record.managerApprovedLeaveType)
                                return (
                                    <>
                                        <CheckCircleFilled style={{ color: '#52c41a' }} />{' '}
                                        {record.actualLeaveType}
                                    </>
                                );
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
                    },
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
                    render: (_, record) => {
                        if (
                            record.actualLeaveDay &&
                            (record.bookLeaveDay !== record.actualLeaveDay ||
                                record.bookFromDate !== record.actualFromDate ||
                                record.bookToDate !== record.actualToDate)
                        ) {
                            if (record.managerApprovedLeaveDay)
                                return (
                                    <>
                                        <CheckCircleFilled style={{ color: '#52c41a' }} />{' '}
                                        {record.actualLeaveDay}
                                    </>
                                );
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
                    },
                },
            ],
        },
        {
            title: 'Kế hoạch',
            dataIndex: 'plan',
            key: 'plan',
            ellipsis: true,
            render: (_, record) => (
                <>
                    {dayjs(record.bookFromDate).format('HH:mm DD/MM/YYYY')}
                    <br />
                    {dayjs(record.bookToDate).format('HH:mm DD/MM/YYYY')}
                </>
            ),
        },
        // {
        //     title: 'Từ ngày',
        //     dataIndex: 'bookFromDate',
        //     key: 'bookFromDate',
        //     ellipsis: true,
        //     render: record => dayjs(record).format('HH:mm DD/MM/YYYY'),
        // },
        // {
        //     title: 'Đến ngày',
        //     dataIndex: 'bookToDate',
        //     key: 'bookToDate',
        //     ellipsis: true,
        //     render: record => dayjs(record).format('HH:mm DD/MM/YYYY'),
        // },
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
            render: record => dayjs(record).format('HH:mm DD/MM/YYYY'),
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
            onFilter: (value, record) => record.userName === value,
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
            render: record => dayjs(record).format('HH:mm DD/MM/YYYY'),
        },
        {
            title: 'Đến ngày',
            dataIndex: 'bookToDate',
            key: 'bookToDate',
            ellipsis: true,
            render: record => dayjs(record).format('HH:mm DD/MM/YYYY'),
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
            render: record => dayjs(record).format('HH:mm DD/MM/YYYY'),
        },
    ];

    const itemsBreadcrumb = [
        {
            title: <Link to="/nghiphep">Home</Link>,
        },
        {
            title: <Link to="/nghiphep/manager">Manager</Link>,
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
                                <Row>
                                    <Col sm={12}>
                                        <Flex gap="middle">
                                            <Dropdown
                                                arrow
                                                menu={{
                                                    items: [
                                                        {
                                                            key: 1,
                                                            label: (
                                                                <Checkbox
                                                                    onClick={e => {
                                                                        if (e.target.checked) {
                                                                            getWaitingForApprove();
                                                                        } else {
                                                                            setFilteredLeaveList(
                                                                                []
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    Chưa phê duyệt
                                                                </Checkbox>
                                                            ),
                                                        },
                                                        {
                                                            key: 2,
                                                            label: 'Chưa xác nhận',
                                                            type: 'group',
                                                            children: [
                                                                {
                                                                    key: 3,
                                                                    label: (
                                                                        <Checkbox
                                                                            onClick={e => {
                                                                                if (
                                                                                    e.target.checked
                                                                                ) {
                                                                                    getWaitingForApproveLeaveType();
                                                                                } else {
                                                                                    setFilteredLeaveList(
                                                                                        []
                                                                                    );
                                                                                }
                                                                            }}
                                                                        >
                                                                            Loại phép
                                                                        </Checkbox>
                                                                    ),
                                                                },
                                                                {
                                                                    key: 4,
                                                                    label: (
                                                                        <Checkbox
                                                                            onClick={e => {
                                                                                if (
                                                                                    e.target.checked
                                                                                ) {
                                                                                    getWaitingForApproveLeaveDay();
                                                                                } else {
                                                                                    setFilteredLeaveList(
                                                                                        []
                                                                                    );
                                                                                }
                                                                            }}
                                                                        >
                                                                            Số ngày nghỉ
                                                                        </Checkbox>
                                                                    ),
                                                                },
                                                                {
                                                                    key: 5,
                                                                    label: (
                                                                        <Checkbox
                                                                            onClick={e => {
                                                                                if (
                                                                                    e.target.checked
                                                                                ) {
                                                                                    getWaitingForApproveDeleteRequest();
                                                                                } else {
                                                                                    setFilteredLeaveList(
                                                                                        []
                                                                                    );
                                                                                }
                                                                            }}
                                                                        >
                                                                            Huỷ phép
                                                                        </Checkbox>
                                                                    ),
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                }}
                                                placement="bottomLeft"
                                                trigger="click"
                                            >
                                                <Button
                                                    icon={<FilterFilled />}
                                                    shape="round"
                                                    type="primary"
                                                >
                                                    Filter
                                                </Button>
                                            </Dropdown>
                                            <ExportExcelButton dataSource={leaveList} />
                                        </Flex>
                                    </Col>
                                    <Col sm={12}>
                                        <Flex align="center" justify="end" gap="middle">
                                            <Text>Select Date</Text>
                                            <RangePicker
                                                format={'DD/MM/YYYY'}
                                                onCalendarChange={dates => {
                                                    const [startDate, endDate] = dates || [];

                                                    if (startDate && endDate) {
                                                        getManagerByDate(startDate, endDate);
                                                    } else if (!startDate && !endDate) {
                                                        getManager();
                                                    }
                                                }}
                                            />
                                        </Flex>
                                    </Col>
                                </Row>
                                <Table
                                    bordered
                                    columns={columnsLeaveList}
                                    dataSource={
                                        filteredLeaveList.length > 0 ? filteredLeaveList : leaveList
                                    }
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
                                                getManagerOtherByDate(startDate, endDate);
                                            } else if (!startDate && !endDate) {
                                                getManagerOther();
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
                                                getManagerStatisticsByDate(startDate, endDate);
                                            } else if (!startDate && !endDate) {
                                                getManagerStatistics();
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
                message={modalConfirm.message}
                onCancel={() => setModalConfirm({ open: false })}
                onOk={modalConfirm.onOk}
                open={modalConfirm.open}
            />
            <ModalErrorComponent
                error={modalError.error}
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
            />
            <ModalErrorOtherComponent
                message={modalErrorOther.message}
                onOk={() => setModalErrorOther({ open: false })}
                open={modalErrorOther.open}
                title={modalErrorOther.title}
            />
            <ModalReasonComponent
                form={form}
                onCancel={() => setModalReason({ open: false })}
                onFinish={modalReason.onFinish}
                open={modalReason.open}
            />
            <ModalSuccessComponent
                message={modalSuccess.message}
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
            />
        </ContentComponent>
    );
};

export default ManagerPage;
