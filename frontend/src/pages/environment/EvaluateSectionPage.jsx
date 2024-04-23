import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Radio, Table, Tabs, Typography } from 'antd';

// import ContentComponent from '../../components/common/environment/ContentComponent';
import { EnvironmentContentComponent, ModalErrorComponent, ModalShowImage } from '../../components';
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
    const [evaluationValue, setEvaluationValue] = useState({});
    const [tabSelect, setTabSelect] = useState(1);

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalShowImage, setModalShowImage] = useState(false);

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const getContentDepartment = async (departmentId, setContent) => {
        try {
            const response = await createConnection(accessToken).get(
                `/environment/content-department/department/${departmentId}`
            );

            const rowSpan = response.data.length;

            setContent(response.data.map(item => ({ ...item, key: item.id, rowSpan })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAll = tabSelect => {
        console.log(tabSelect);
        const newEvaluationValue = {};
        switch (tabSelect) {
            case 1:
                console.log('case 1');
                contentOffice.forEach(item => (newEvaluationValue[item.key] = item.point));
                break;
            case 2:
                console.log('case 2');
                contentShirozake.forEach(item => (newEvaluationValue[item.key] = item.point));
                break;
            case 3:
                console.log('case 3');
                contentBottling.forEach(item => (newEvaluationValue[item.key] = item.point));
                break;
            case 4:
                console.log('case 4');
                contentToyo.forEach(item => (newEvaluationValue[item.key] = item.point));
                break;
            default:
                break;
        }
        setEvaluationValue(newEvaluationValue);
    };

    const handleEvaluationChange = (record, value) =>
        setEvaluationValue(prevState => ({ ...prevState, [record.key]: value }));

    useEffect(() => {
        getContentDepartment(1, setContentOffice);
        getContentDepartment(2, setContentBottling);
        getContentDepartment(3, setContentShirozake);
        getContentDepartment(4, setContentToyo);
    }, []);

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
            children: [
                {
                    key: 'point',
                    dataIndex: 'point',
                    title: (
                        <Button onClick={() => handleSelectAll(tabSelect)} type="primary">
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
            <Tabs
                // centered
                items={[
                    {
                        key: 1,
                        label: <Text strong>OFFICE</Text>,
                        children: (
                            <Table
                                bordered
                                columns={columns}
                                dataSource={contentOffice}
                                pagination={false}
                                scroll={{ x: true }}
                                showSorterTooltip={false}
                                summary={currentData => (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell align="center" colSpan={1}>
                                            <Text strong>TỔNG</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={3} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>
                                                {currentData.reduce(
                                                    (previousValue, currentValue) =>
                                                        previousValue + currentValue.point,
                                                    0
                                                )}
                                            </Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={1} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>
                                                {Object.values(evaluationValue).reduce(
                                                    (previousValue, currentValue) =>
                                                        previousValue + currentValue,
                                                    0
                                                )}
                                            </Text>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            />
                        ),
                    },
                    {
                        key: 2,
                        label: <Text strong>SHIROZAKE</Text>,
                        children: (
                            <Table
                                bordered
                                columns={columns}
                                dataSource={contentShirozake}
                                pagination={false}
                                scroll={{ x: true }}
                                showSorterTooltip={false}
                                summary={currentData => (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell align="center" colSpan={1}>
                                            <Text strong>TỔNG</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={3} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>
                                                {currentData.reduce(
                                                    (previousValue, currentValue) =>
                                                        previousValue + currentValue.point,
                                                    0
                                                )}
                                            </Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={1} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>
                                                {Object.values(evaluationValue).reduce(
                                                    (previousValue, currentValue) =>
                                                        previousValue + currentValue,
                                                    0
                                                )}
                                            </Text>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            />
                        ),
                    },
                    {
                        key: 3,
                        label: <Text strong>BOTTLING</Text>,
                        children: (
                            <Table
                                bordered
                                columns={columns}
                                dataSource={contentBottling}
                                pagination={false}
                                scroll={{ x: true }}
                                showSorterTooltip={false}
                                summary={currentData => (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell align="center" colSpan={1}>
                                            <Text strong>TỔNG</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={3} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>
                                                {currentData.reduce(
                                                    (previousValue, currentValue) =>
                                                        previousValue + currentValue.point,
                                                    0
                                                )}
                                            </Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={1} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>
                                                {Object.values(evaluationValue).reduce(
                                                    (previousValue, currentValue) =>
                                                        previousValue + currentValue,
                                                    0
                                                )}
                                            </Text>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            />
                        ),
                    },
                    {
                        key: 4,
                        label: <Text strong>TOYO</Text>,
                        children: (
                            <Table
                                bordered
                                columns={columns}
                                dataSource={contentToyo}
                                pagination={false}
                                scroll={{ x: true }}
                                showSorterTooltip={false}
                                summary={currentData => (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell align="center" colSpan={1}>
                                            <Text strong>TỔNG</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={3} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>
                                                {currentData.reduce(
                                                    (previousValue, currentValue) =>
                                                        previousValue + currentValue.point,
                                                    0
                                                )}
                                            </Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={1} />
                                        <Table.Summary.Cell align="center">
                                            <Text strong>
                                                {Object.values(evaluationValue).reduce(
                                                    (previousValue, currentValue) =>
                                                        previousValue + currentValue,
                                                    0
                                                )}
                                            </Text>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            />
                        ),
                    },
                ]}
                onChange={e => setTabSelect(e)}
                tabBarGutter={50}
            />
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
