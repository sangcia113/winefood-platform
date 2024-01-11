import React, { useEffect, useState } from 'react';

import { ContentComponent } from '../components';
import { DatePicker, Dropdown, Flex, Table, Tag, Typography } from 'antd';
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

const { RangePicker } = DatePicker;

const { Text } = Typography;

const URL = process.env.REACT_APP_API_URL;

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
                            onClick: () => {},
                            style: { color: '#ff4d4f' },
                        },
                        {
                            key: 2,
                            label: 'Điều chỉnh',
                            icon: <EditFilled />,
                            children: [
                                {
                                    key: 4,
                                    label: 'Loại phép',
                                    // icon: <TagFilled />,
                                    style: { color: '#c41d7f' },
                                    onClick: () => {},
                                },
                                {
                                    key: 5,
                                    label: 'Số ngày',
                                    // icon: <ReadFilled />,
                                    style: { color: '#1677ff' },
                                    onClick: () => {},
                                },
                                {
                                    key: 6,
                                    label: 'Cả hai',
                                    // icon: <UnlockFilled />,
                                    style: { color: '#531dab' },
                                    onClick: () => {},
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
        sorter: (a, b) => a.id - b.id,
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
        title: 'Lộ trình',
        dataIndex: 'tracking',
        key: 'tracking',
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

const HistoryPage = () => {
    console.log('Run HistoryPage...');

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getLeaveList();
    }, []);

    const getLeaveList = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${URL}/api/leave/list/limit`, {
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

    return (
        <ContentComponent loading={loading}>
            <Flex vertical gap={'large'}>
                <Flex justify={'end'} align={'center'} gap={'middle'}>
                    <Text>Select Date</Text>
                    <RangePicker
                        format={'DD/MM/YYYY'}
                        onCalendarChange={dates => {
                            // const [startDate, endDate] = dates || [];
                            // if (startDate && endDate) {
                            //     getLeaveListByDate(startDate, endDate);
                            // } else if (!startDate && !endDate) {
                            //     getLeaveList();
                            // }
                        }}
                    />
                </Flex>
                <Table
                    bordered
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ x: true }}
                    showSorterTooltip={false}
                />
            </Flex>
        </ContentComponent>
    );
};

export default HistoryPage;
