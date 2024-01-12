import React, { useEffect, useState } from 'react';
import { ContentComponent } from '../components';
import { Dropdown, Table, Tag, Typography } from 'antd';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    EditFilled,
    StopFilled,
    SyncOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from 'axios';

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
        title: 'Họ và Tên',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        render: record => <Text strong>{record}</Text>,
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
        render: (_, record) => {
            if (record.deleted === 1) return <Tag color="#ff4d4f">Đã xóa</Tag>;
            else {
                if (record.tracking === 1) return <Tag color="#108ee9">Đã gửi Leader</Tag>;
                if (record.tracking === 2) return <Tag color="#52c41a">Đã gửi Manager</Tag>;
            }
        },
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
                    if (!record.deleted) {
                        if (record.managerApproved === 0)
                            return <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
                        else if (record.managerApproved === 1)
                            return <CheckCircleFilled style={{ color: '#52c41a' }} />;
                        else if (!record.managerApprovedDelete)
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

const LeaderPage = () => {
    console.log('Run LeaderPage...');

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

            const response = await axios.get(`${URL}/api/leave/list/leader`, {
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
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: true }}
                showSorterTooltip={false}
            />
        </ContentComponent>
    );
};

export default LeaderPage;
