import {
    Avatar,
    Card,
    DatePicker,
    Divider,
    Dropdown,
    Flex,
    Layout,
    Space,
    Table,
    Tabs,
    Tag,
    Tooltip,
    Typography,
} from 'antd';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    ReadFilled,
    StopFilled,
    SyncOutlined,
    TagFilled,
    UnlockFilled,
} from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';

import { URL } from '../configs/urlConfig';
import dayjs from 'dayjs';
import { getUniqueName } from '../utils';
import { PencilFill, ThreeDotsVertical } from 'react-bootstrap-icons';
import {
    ModalErrorComponent,
    ModalQuestionComponent,
    ModalSuccessComponent,
    ModalReasonComponent,
} from '../components';
const { RangePicker } = DatePicker;

const { Content } = Layout;
const { Paragraph, Text } = Typography;

const ManagerPage = () => {
    console.log('Run ManagerPage...');

    const [loading, setLoading] = useState(false);
    const [dataSourceLeaveList, setDataSourceLeaveList] = useState([]);
    const [dataSourceLeaveListOther, setDataSourceLeaveListOther] = useState([]);
    const [dataSourceLeaveListStatistics, setDataSourceLeaveListStatistics] = useState([]);
    const [totalWaitManager, setTotalWaitManager] = useState(0);
    const [modalError, setModalError] = useState({
        open: false,
        title: '',
        message: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        title: '',
        message: '',
    });

    const [modalQuestion, setModalQuestion] = useState({
        onOk: () => {},
        open: false,
        message: '',
    });

    const [modalReason, setModalReason] = useState({ onOk: () => {}, open: false });

    useEffect(() => {
        handleGetLeaveList();
        handleGetLeaveListOther();
        handleGetLeaveListStatistics();
    }, []);

    const handleGetLeaveList = async (startDate, endDate) => {
        try {
            setLoading(true);

            const API_URL =
                startDate && endDate ? `${URL}/api/leave/list/search` : `${URL}/api/leave/list`;

            const response = await axios.get(API_URL, {
                params: {
                    startDate: dayjs(startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(endDate).format('YYYY-MM-DD'),
                },
            });

            const arrData = response.data.map(item => ({
                ...item,
                key: item.id,
            }));

            setDataSourceLeaveList(arrData);

            handleGetTotalWaitManager();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetLeaveListOther = async (startDate, endDate) => {
        try {
            setLoading(true);

            const API_URL =
                startDate && endDate
                    ? `${URL}/api/leave/list/other/search`
                    : `${URL}/api/leave/list/other`;

            const response = await axios.get(API_URL, {
                params: {
                    startDate: dayjs(startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(endDate).format('YYYY-MM-DD'),
                },
            });

            const arrData = response.data.map(item => ({
                ...item,
                key: item.id,
            }));

            setDataSourceLeaveListOther(arrData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetLeaveListStatistics = async (startDate, endDate) => {
        try {
            setLoading(true);

            const API_URL =
                startDate && endDate
                    ? `${URL}/api/leave/list/statistics/search`
                    : `${URL}/api/leave/list/statistics`;

            const response = await axios.get(API_URL, {
                params: {
                    startDate: dayjs(startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(endDate).format('YYYY-MM-DD'),
                },
            });

            const arrData = response.data.map(item => ({
                ...item,
                key: item.id,
            }));

            setDataSourceLeaveListStatistics(arrData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetTotalWaitManager = () => {
        const total = dataSourceLeaveList.reduce(
            (accumulator, currentValue) =>
                currentValue.managerApproved === null && currentValue.deleteRequest === null
                    ? accumulator + 1
                    : accumulator,
            0
        );

        setTotalWaitManager(total);
    };

    const handleApproval = async id => {
        try {
            const response = await axios.put(`${URL}/api/leave/list/approval/${id}`);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNotApproval = async (id, reason) => {
        try {
            const response = await axios.put(`${URL}/api/leave/list/not-approval/${id}`, {
                reason: reason,
            });

            console.log(response);
        } catch (error) {
            console.log(error);
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
                                        setModalError({
                                            open: true,
                                            message: (
                                                <Paragraph>
                                                    <ul>
                                                        <li>
                                                            <b>Bạn đã phê duyệt</b> yêu cầu nghỉ
                                                            phép này.
                                                        </li>
                                                    </ul>
                                                </Paragraph>
                                            ),
                                            title: 'KHÔNG THỂ PHÊ DUYỆT',
                                        });
                                    } else {
                                        setModalQuestion({
                                            message: (
                                                <Space direction="vertical" align="center">
                                                    Bạn có chắc duyệt yêu cầu nghỉ phép của
                                                    <b>{record.userName}</b>
                                                </Space>
                                            ),
                                            onOk: () => handleApproval(record.id),
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
                                        setModalError({
                                            open: true,
                                            message: (
                                                <Paragraph>
                                                    <ul>
                                                        <li>
                                                            <b>Bạn đã từ chối</b> yêu cầu nghỉ phép
                                                            này.
                                                        </li>
                                                    </ul>
                                                </Paragraph>
                                            ),
                                            title: 'KHÔNG THỂ TỪ CHỐI',
                                        });
                                    } else {
                                        setModalReason({
                                            onOk: () => handleNotApproval(record.id),
                                            open: true,
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
                                                record.actualLeaveTypeID === null ||
                                                record.managerApprovedLeaveType === 1
                                            ) {
                                                setModalError({
                                                    open: true,
                                                    message: (
                                                        <Paragraph>
                                                            <ul>
                                                                <li>
                                                                    Không có yêu cầu điều chỉnh{' '}
                                                                    <b>loại nghỉ phép thực tế.</b>
                                                                </li>
                                                                <li>
                                                                    <b>
                                                                        Bạn đã xác nhận điều chỉnh
                                                                    </b>{' '}
                                                                    loại nghỉ phép thực tế này.
                                                                </li>
                                                            </ul>
                                                        </Paragraph>
                                                    ),
                                                    title: 'KHÔNG THỂ XÁC NHẬN',
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
                                                record.actualLeaveDay === null ||
                                                record.managerApprovedLeaveDay === 1
                                            ) {
                                                setModalError({
                                                    open: true,
                                                    message: (
                                                        <Paragraph>
                                                            <ul>
                                                                <li>
                                                                    Không có yêu cầu điều chỉnh{' '}
                                                                    <b>
                                                                        số ngày nghỉ phép thực tế.
                                                                    </b>
                                                                </li>
                                                                <li>
                                                                    <b>
                                                                        Bạn đã xác nhận điều chỉnh
                                                                    </b>{' '}
                                                                    số ngày nghỉ phép thực tế này.
                                                                </li>
                                                            </ul>
                                                        </Paragraph>
                                                    ),
                                                    title: 'KHÔNG THỂ XÁC NHẬN',
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
                                                record.deleteRequest === null ||
                                                record.managerApprovedDelete === 1
                                            ) {
                                                setModalError({
                                                    open: true,
                                                    message: (
                                                        <Paragraph>
                                                            <ul>
                                                                <li>
                                                                    Không có yêu cầu{' '}
                                                                    <b>hủy phép.</b>
                                                                </li>
                                                                <li>
                                                                    <b>Bạn đã xác nhận hủy phép</b>{' '}
                                                                    này.
                                                                </li>
                                                            </ul>
                                                        </Paragraph>
                                                    ),
                                                    title: 'KHÔNG THỂ XÁC NHẬN',
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
                                        <CheckCircleFilled style={{ color: '#52c41a' }} />
                                    ) : (
                                        <CloseCircleFilled style={{ color: '#ff4d4f' }} />
                                    )}{' '}
                                    {dayjs(record.managerApprovedDate).format('DD/MM/YYYY HH:mm')}
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
            title: 'Họ và Tên',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            filters: getUniqueName(dataSourceLeaveList),
            filterSearch: true,
            onFilter: (value, record) => record.userName.includes(value),
            render: (_, record) => {
                if (record.managerApprovedDelete === null) {
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
                        } else if (record.managerApprovedDelete === null) {
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
                            if (record.managerApprovedDelete === null) {
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
            filters: getUniqueName(dataSourceLeaveListOther),
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

    return (
        <Content
            style={{
                padding: 20,
                backgroundImage: `url(${require('../assets/images/bg5.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Card
                bordered={false}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <Tabs
                    centered
                    defaultActiveKey="1"
                    items={[
                        {
                            key: 1,
                            label: (
                                <>
                                    Danh Sách Nghỉ Phép{' '}
                                    {totalWaitManager !== 0 && (
                                        <Avatar
                                            style={{
                                                backgroundColor: '#f50',
                                            }}
                                        >
                                            {totalWaitManager}
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
                                                    handleGetLeaveList(startDate, endDate);
                                                } else if (!startDate && !endDate) {
                                                    handleGetLeaveList();
                                                }
                                            }}
                                        />
                                    </Flex>
                                    <Table
                                        bordered
                                        columns={columnsLeaveList}
                                        dataSource={dataSourceLeaveList}
                                        loading={loading}
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
                                                    handleGetLeaveListOther(startDate, endDate);
                                                } else if (!startDate && !endDate) {
                                                    handleGetLeaveListOther();
                                                }
                                            }}
                                        />
                                    </Flex>
                                    <Table
                                        bordered
                                        columns={columnsLeaveListOther}
                                        dataSource={dataSourceLeaveListOther}
                                        loading={loading}
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
                                                    handleGetLeaveListStatistics(
                                                        startDate,
                                                        endDate
                                                    );
                                                } else if (!startDate && !endDate) {
                                                    handleGetLeaveListStatistics();
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
                                                data: dataSourceLeaveListStatistics.map(item => ({
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
            </Card>
            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                message={modalError.message}
                title={modalError.title}
            />
            <ModalQuestionComponent
                onCancel={() => setModalQuestion({ open: false })}
                onOk={modalQuestion.onOk}
                open={modalQuestion.open}
                message={modalQuestion.message}
            />
            <ModalReasonComponent
                onCancel={() => setModalReason({ open: false })}
                onOk={modalReason.onOk}
                open={modalReason.open}
            />
        </Content>
    );
};

export default ManagerPage;
