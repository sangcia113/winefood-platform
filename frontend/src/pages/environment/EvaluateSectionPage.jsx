import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Table, Tabs, Typography } from 'antd';

import ContentComponent from '../../components/common/environment/ContentComponent';
import { ModalErrorComponent } from '../../components';
import { createConnection } from '../../utils';

const { Text } = Typography;

const itemsBreadcrumb = [
    { title: <Link to={'/vesinh'}>Home</Link> },
    { title: <Link to={'/vesinh/evaluate-section'}>Evaluate Section</Link> },
];

const EvaluatePage = () => {
    const [loading, setLoading] = useState(false);
    const [contentOffice, setContentOffice] = useState([]);
    const [contentShirozake, setContentShirozake] = useState([]);
    const [contentBottling, setContentBottling] = useState([]);
    const [contentToyo, setContentToyo] = useState([]);

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const getContentDepartment = async (departmentId, setContent) => {
        try {
            const response = await createConnection(accessToken).get(
                `/environment/content-department/department/${departmentId}`
            );
            console.log(response.data);
            setContent(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContentDepartment(1, setContentOffice);
        getContentDepartment(2, setContentShirozake);
        getContentDepartment(3, setContentBottling);
        getContentDepartment(4, setContentToyo);
    }, []);

    const columnsOffice = [
        {
            key: 'departmentVN',
            dataIndex: 'departmentVN',
            title: 'Bộ phận',
            ellipsis: true,
        },
        {
            key: 'index',
            dataIndex: 'index',
            title: 'Mục',
            ellipsis: true,
        },
        {
            key: 'classifyVN',
            dataIndex: 'classifyVN',
            title: 'Phân loại',
            ellipsis: true,
        },
        {
            key: 'contentVN',
            dataIndex: 'contentVN',
            title: 'Nội dung',
            ellipsis: true,
        },
        {
            key: 'point',
            dataIndex: 'point',
            title: 'Điểm',
            ellipsis: true,
        },
        {
            key: 'evaluate',
            dataIndex: 'evaluate',
            title: 'Đánh giá',
            ellipsis: true,
        },
        {
            key: 'selectPoint',
            dataIndex: 'selectPoint',
            title: 'Số điểm',
            ellipsis: true,
        },
        {
            key: 'note',
            dataIndex: 'note',
            title: 'Ghi chú',
            ellipsis: true,
        },
    ];
    return (
        <ContentComponent items={itemsBreadcrumb} loading={loading}>
            <Tabs
                centered
                items={[
                    {
                        key: '1',
                        label: <Text strong>OFFICE</Text>,
                        children: (
                            <Table
                                bordered
                                columns={columnsOffice}
                                dataSource={contentOffice}
                                scroll={{ x: true }}
                                showSorterTooltip={false}
                            />
                        ),
                    },
                    {
                        key: '2',
                        label: <Text strong>SHIROZAKE</Text>,
                        children: 'Content Shirozake',
                    },
                    {
                        key: '3',
                        label: <Text strong>BOTTLING</Text>,
                        children: 'Content Bottling',
                    },
                    {
                        key: '4',
                        label: <Text strong>TOYO</Text>,
                        children: 'Content Toyo',
                    },
                ]}
                tabBarGutter={50}
            />
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />
        </ContentComponent>
    );
};

export default EvaluatePage;
