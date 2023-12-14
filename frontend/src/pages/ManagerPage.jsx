import {
    Card,
    DatePicker,
    Divider,
    Flex,
    Space,
    Table,
    Tabs,
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';

import { URL } from '../configs/urlConfig';
import dayjs from 'dayjs';
import DropdownComponent from '../components/feature/DropdownComponent';
const { RangePicker } = DatePicker;

const { Text } = Typography;

const handleGetUniqueName = data => {
    // Sắp xếp mảng theo userId trước khi tạo Set
    const sortedDataSource = [...data].sort((a, b) => a.userId - b.userId);

    // Tạo Set từ mảng đã sắp xếp
    const uniqueNames = Array.from(new Set(sortedDataSource.map(item => item.userName)));

    // Trả về danh sách giá trị duy nhất
    return uniqueNames.map(name => ({ text: name, value: name }));
};

const EmployeePage = () => {
    console.log('Run EmployeePage...');

    const [loading, setLoading] = useState(false);
    const [dataSourceLeaveList, setDataSourceLeaveList] = useState([]);
    const [dataSourceLeaveListOther, setDataSourceLeaveListOther] = useState([]);
    const [dataSourceLeaveListStatistics, setDataSourceLeaveListStatistics] = useState([]);

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
                requestDate: dayjs(item.requestDate).format('DD/MM/YYYY HH:mm'),
                bookFromDate: dayjs(item.bookFromDate).format('DD/MM/YYYY HH:mm'),
                bookToDate: dayjs(item.bookToDate).format('DD/MM/YYYY HH:mm'),
            }));

            setDataSourceLeaveList(arrData);
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
                requestDate: dayjs(item.requestDate).format('DD/MM/YYYY HH:mm'),
                bookFromDate: dayjs(item.bookFromDate).format('DD/MM/YYYY HH:mm'),
                bookToDate: dayjs(item.bookToDate).format('DD/MM/YYYY HH:mm'),
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

            setDataSourceLeaveListStatistics(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const columnsLeaveList = [
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => <DropdownComponent name={record.userName} />,
        },
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            filters: handleGetUniqueName(dataSourceLeaveList),
            filterSearch: true,
            filterMode: 'tree',
            render: (_, record) => (
                <Tooltip
                    color={'green'}
                    title={
                        <Space direction={'vertical'}>
                            <Text strong style={{ fontSize: 12 }}>
                                THÔNG TIN NGHỈ PHÉP
                            </Text>
                            <Divider />
                            <Text style={{ fontSize: 12 }}>
                                Loại phép (Đăng ký): {record.bookLeaveType}
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Loại phép (Thực tế): {record.actualLeaveType}
                            </Text>
                            <Divider />
                            <Text style={{ fontSize: 12 }}>
                                Số ngày nghỉ (Đăng ký): {record.bookLeaveDay}
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Số ngày nghỉ (Thực tế): {record.actualLeaveDay}
                            </Text>
                            <Divider />
                            <Text style={{ fontSize: 12 }}>Từ ngày: {record.bookFromDate}</Text>
                            <Text>Đến ngày: {record.bookToDate}</Text>
                            <Text>Lý do: {record.reason}</Text>
                            <Text>Ngày yêu cầu: {record.requestDate}</Text>
                            <Text>Leader: </Text>
                            <Text>Manager: </Text>
                        </Space>
                    }
                >
                    <Text strong>{record.userName}</Text>
                </Tooltip>
            ),
            onFilter: (value, record) => record.userName.includes(value),
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
        },
        {
            title: 'Đến ngày',
            dataIndex: 'bookToDate',
            key: 'bookToDate',
            ellipsis: true,
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
        },
        {
            title: 'Xác nhận',
            children: [
                {
                    title: 'Tổ trưởng',
                    dataIndex: 'leaderApproved',
                    key: 'leaderApproved',
                    ellipsis: true,
                    render: record =>
                        record === 1 ? (
                            <CheckCircleFilled style={{ color: '#28a745' }} />
                        ) : record === 2 ? (
                            <CloseCircleFilled style={{ color: '#dc3545' }} />
                        ) : (
                            ''
                        ),
                },
                {
                    title: 'Quản lý',
                    dataIndex: 'managerApproved',
                    key: 'managerApproved',
                    ellipsis: true,
                    render: record =>
                        record === 1 ? (
                            <CheckCircleFilled style={{ color: '#28a745' }} />
                        ) : record === 2 ? (
                            <CloseCircleFilled style={{ color: '#dc3545' }} />
                        ) : (
                            ''
                        ),
                },
            ],
        },
        {
            title: 'Lý do từ chối',
            dataIndex: 'managerReason',
            key: 'managerReason',
            ellipsis: true,
        },
        {
            title: 'Yêu cầu huỷ phép',
            dataIndex: 'managerApprovedDelete',
            key: 'managerApprovedDelete',
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
                    <Tag color={'error'}>Đã xóa</Tag>
                ) : (
                    <Tag color={'success'}>Chờ duyệt</Tag>
                ),
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            filters: handleGetUniqueName(dataSourceLeaveListOther),
            filterSearch: true,
            filterMode: 'tree',
            render: record => <Text strong>{record}</Text>,
            onFilter: (value, record) => record.userName.includes(value),
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
        },
        {
            title: 'Đến ngày',
            dataIndex: 'bookToDate',
            key: 'bookToDate',
            ellipsis: true,
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
                            label: 'Danh Sách Nghỉ Phép',
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
        </Content>
    );
};

export default EmployeePage;
