import { Card, Spin, Table, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import { URL } from '../configs/urlConfig';
import dayjs from 'dayjs';

const columnsLeaveList = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Họ và Tên',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
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
                    ) : (
                        <CloseCircleFilled style={{ color: '#dc3545' }} />
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
                    ) : (
                        <CloseCircleFilled style={{ color: '#dc3545' }} />
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

const EmployeePage = () => {
    const [spinning, setSpinning] = useState(false);
    const [dataSourceLeaveList, setDataSourceLeaveList] = useState([]);

    useEffect(() => {
        handleGetLeaveList();
    }, []);

    const handleGetLeaveList = async () => {
        try {
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
        }
    };

    return (
        <Content
            style={{
                padding: 20,
                backgroundImage: `url(${require('../assets/images/bg5.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Spin fullscreen size={'large'} spinning={spinning} tip="Vui lòng đợi..." />
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
                                <Table
                                    bordered
                                    columns={columnsLeaveList}
                                    dataSource={dataSourceLeaveList}
                                    scroll={{ x: true }}
                                />
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
