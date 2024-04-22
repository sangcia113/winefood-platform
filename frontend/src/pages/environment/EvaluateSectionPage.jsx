import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Radio, Table, Tabs, Typography } from 'antd';

import ContentComponent from '../../components/common/environment/ContentComponent';
import { ModalErrorComponent } from '../../components';
import { createConnection } from '../../utils';
import { PlusCircleFilled } from '@ant-design/icons';

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
    const [evaluationChecked, setEvaluationChecked] = useState(false);

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
            title: <div style={{ textAlign: 'center' }}>Bộ phận</div>,
            ellipsis: true,
            align: 'center',
            render: record => <Text strong>{record}</Text>,
            onCell: (record, rowIndex) => ({
                rowSpan: rowIndex === 0 ? contentOffice.length : 0,
            }),
        },
        {
            key: 'index',
            dataIndex: 'index',
            title: <div style={{ textAlign: 'center' }}>Mục</div>,
            ellipsis: true,
            align: 'center',
            render: (text, record, index) => index + 1,
        },
        {
            key: 'classifyVN',
            dataIndex: 'classifyVN',
            title: <div style={{ textAlign: 'center' }}>Phân loại</div>,
            ellipsis: true,
        },
        {
            key: 'contentVN',
            dataIndex: 'contentVN',
            title: <div style={{ textAlign: 'center' }}>Nội dung</div>,
            ellipsis: true,
        },
        {
            key: '',
            dataIndex: '',
            title: <div style={{ textAlign: 'center' }}>Điểm</div>,
            ellipsis: true,
            children: [
                {
                    key: 'point',
                    dataIndex: 'point',
                    title: (
                        <Button onClick={() => setEvaluationChecked(true)} type="primary">
                            Select All
                        </Button>
                    ),
                    align: 'center',
                },
            ],
        },
        {
            key: 'evaluate',
            dataIndex: 'evaluate',
            title: <div style={{ textAlign: 'center' }}>Đánh giá</div>,
            ellipsis: true,
            render: (_, record) => (
                <Radio.Group>
                    <Radio value={0}>0</Radio>
                    <Radio value={record.point}>{record.point}</Radio>
                </Radio.Group>
            ),
        },
        {
            key: '',
            dataIndex: '',
            title: <div style={{ textAlign: 'center' }}>Số điểm</div>,
            ellipsis: true,
            children: [
                {
                    key: 'deselectAll',
                    dataIndex: 'deselectAll',
                    title: (
                        <Button onClick={() => setEvaluationChecked(false)} type="primary">
                            Deselect All
                        </Button>
                    ),
                    align: 'center',
                },
            ],
        },
        {
            key: 'note',
            dataIndex: 'note',
            title: <div style={{ textAlign: 'center' }}>Ghi chú</div>,
            ellipsis: true,
            align: 'center',
            render: record => (
                <Button
                    icon={<PlusCircleFilled style={{ fontSize: 22, paddingTop: 3 }} />}
                    shape="circle"
                    type="primary"
                />
            ),
            onCell: (record, rowIndex) => ({ rowSpan: rowIndex === 0 ? contentOffice.length : 0 }),
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
                                summary={() => (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell align="center" colSpan={1}>
                                            <Text strong>TỔNG</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={3} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>120</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={1} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>120</Text>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
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
