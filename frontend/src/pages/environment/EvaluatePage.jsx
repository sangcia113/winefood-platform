import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, Flex, Radio, Table, Tabs, Typography } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

import { EnvironmentContentComponent, ModalErrorComponent, ModalShowImage } from '../../components';

import { createConnection } from '../../utils';

const { Text } = Typography;

const itemsBreadcrumb = [
    { title: <Link to={'/vesinh'}>Home</Link> },
    { title: <Link to={'/vesinh/evaluate'}>Evaluate</Link> },
];

const EvaluatePage = () => {
    const [loading, setLoading] = useState(false);
    const [evaluationValue, setEvaluationValue] = useState({});

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalShowImage, setModalShowImage] = useState(false);

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const handleEvaluationChange = (record, value) =>
        setEvaluationValue(prevState => ({ ...prevState, [record.key]: value }));

    useEffect(() => {}, []);

    const columns = [
        {
            key: 'departmentVN',
            dataIndex: 'departmentVN',
            title: <div style={{ fontWeight: 'bold', textAlign: 'center' }}>Bộ phận</div>,
            // ellipsis: true,
            align: 'center',
            render: record => <div style={{ fontWeight: 'bold', width: 110 }}>{record}</div>,
            onCell: (record, rowIndex) => ({ rowSpan: rowIndex === 0 ? record.rowSpan : 0 }),
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
        },
        {
            key: 'evaluate',
            dataIndex: 'evaluate',
            title: <div style={{ textAlign: 'center' }}>Đánh giá</div>,
            ellipsis: true,
            render: (_, record) => (
                <Radio.Group
                    onChange={e => handleEvaluationChange(record, e.target.value)}
                    value={evaluationValue[record.key]}
                >
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
                        <Button onClick={() => setEvaluationValue({})} type="primary">
                            Deselect All
                        </Button>
                    ),
                    align: 'center',
                    render: (_, record) => evaluationValue[record.key],
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
                    onClick={() => setModalShowImage(true)}
                    shape="circle"
                    type="primary"
                />
            ),
            onCell: (record, rowIndex) => ({ rowSpan: rowIndex === 0 ? record.rowSpan : 0 }),
        },
    ];

    return (
        <EnvironmentContentComponent items={itemsBreadcrumb} loading={loading}>
            <Flex align="center" justify="center">
                <Text strong>KẾT QUẢ ĐÁNH GIÁ CÁ NHÂN CỦA 4 TỔ</Text>
            </Flex>
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />
            <ModalShowImage onCancel={() => setModalShowImage(false)} open={modalShowImage} />
        </EnvironmentContentComponent>
    );
};

export default EvaluatePage;
