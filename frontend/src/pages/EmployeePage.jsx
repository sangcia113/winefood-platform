import { Card, DatePicker, Flex, Table, Tabs, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import { URL } from '../configs/urlConfig';
import dayjs from 'dayjs';
import DropdownComponent from '../components/feature/DropdownComponent';
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const { RangePicker } = DatePicker;

const { Text } = Typography;

const EmployeePage = () => {
    console.log('Run EmployeePage...');

    const [loading, setLoading] = useState(false);
    const [dataSourceLeaveList, setDataSourceLeaveList] = useState([]);

    useEffect(() => {
        handleGetLeaveList();
    }, []);

    const handleGetLeaveList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/api/leave/list`);

            const arrData = response.data.map(item => ({
                ...item,
                key: item.id,
                requestDate: dayjs(item.requestDate).format('DD/MM/YYYY HH:mm'),
                bookFromDate: dayjs(item.bookFromDate).format('DD/MM/YYYY HH:mm'),
                bookToDate: dayjs(item.bookToDate).format('DD/MM/YYYY HH:mm'),
            }));

            setDataSourceLeaveList(arrData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetUniqueName = () => {
        // Sắp xếp mảng theo userId trước khi tạo Set
        const sortedDataSource = [...dataSourceLeaveList].sort((a, b) => a.userId - b.userId);

        // Tạo Set từ mảng đã sắp xếp
        const uniqueNames = Array.from(new Set(sortedDataSource.map(item => item.name)));

        // Trả về danh sách giá trị duy nhất
        return uniqueNames.map(name => ({ text: name, value: name }));
    };

    const handleGetLeaveListByDate = info => {
        // if (!info) return;

        if (info) {
            dayjs.extend(isSameOrBefore);
            dayjs.extend(isSameOrAfter);

            const [startDate, endDate] = info;
            const originalDataCopy = [...dataSourceLeaveList];

            const arrData = originalDataCopy.filter(item => {
                const bookFromDate = dayjs(item.bookFromDate, 'DD/MM/YYYY');

                const bookToDate = dayjs(item.bookToDate, 'DD/MM/YYYY');

                return (
                    dayjs(bookFromDate).isSameOrBefore(dayjs(endDate)) &&
                    dayjs(bookToDate).isSameOrAfter(dayjs(startDate))
                );
            });

            setDataSourceLeaveList(arrData);
        } else {
            // If startDate or endDate is not selected, reset to the original leave list
            handleGetLeaveList();
        }
    };

    const columnsLeaveList = [
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => <DropdownComponent name={record.name} />,
        },
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            filters: handleGetUniqueName(),
            filterSearch: true,
            filterMode: 'tree',
            render: record => <Text strong>{record}</Text>,
            onFilter: (value, record) => record.name.includes(value),
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
                                            onCalendarChange={info => {
                                                console.log(info);
                                                handleGetLeaveListByDate(info);
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
                        { key: 2, label: 'Danh Sách Khác' },
                        { key: 3, label: 'Thống Kê Dữ Liệu' },
                    ]}
                    tabBarGutter={40}
                />
            </Card>
        </Content>
    );
};

export default EmployeePage;
