import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, DatePicker, Flex, Form, Radio, Table, Typography } from 'antd';
import { PlusCircleFilled, SaveFilled } from '@ant-design/icons';

import {
    EnvironmentContentComponent,
    ModalAddImage,
    ModalErrorComponent,
    ModalErrorOtherComponent,
    ModalShowImage,
    ModalSuccessComponent,
} from '../../components';
import { createConnection } from '../../utils';

const { Text } = Typography;

const itemsBreadcrumb = [
    { title: <Link to={'/vesinh'}>Home</Link> },
    { title: <Link to={'/vesinh/evaluate'}>Evaluate</Link> },
    { title: <Link to={'/vesinh/evaluate-office'}>Office</Link> },
];

const EvaluateOfficePage = () => {
    const [loading, setLoading] = useState(false);
    const [evaluate, setEvaluate] = useState([]);
    const [evaluateValue, setEvaluateValue] = useState({});
    const [note, setNote] = useState([]);

    const [modalShowImage, setModalShowImage] = useState(false);

    const [modalAddImage, setModalAddImage] = useState(false);

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalErrorOther, setModalErrorOther] = useState({
        open: false,
        title: '',
        message: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        message: '',
    });

    const [formAddImage] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const handleSetEvaluateValue = data => {
        const newEvaluateValue = {};

        data.forEach(item => (newEvaluateValue[item.id] = item.point));

        setEvaluateValue(newEvaluateValue);
    };

    const getContentDepartment = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(
                `/environment/content-department/department/1`
            );

            setEvaluate(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const getNote = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/environment/note/1`);

            setNote(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertNote = async ({ note, fileList }) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append('note', note);
            fileList.fileList.forEach(file => {
                formData.append('fileList', file.originFileObj);
            });

            await createConnection(accessToken).post(`/environment/note/1`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setModalAddImage(false);
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const getEvaluate = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/environment/evaluate/1`);

            handleSetEvaluateValue(response.data);
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertEvaluate = async () => {
        if (Object.values(evaluateValue).length === evaluate.length) {
            try {
                const response = await createConnection(accessToken).post(
                    `/environment/evaluate`,
                    evaluateValue
                );

                setModalSuccess({
                    message: response.data.message,
                    open: true,
                });
            } catch (error) {
                setModalError({ error, open: true });
            } finally {
                setLoading(false);
            }
        } else {
            setModalErrorOther({
                message: 'Bạn chưa chọn một hoặc nhiều mục đánh giá!',
                open: true,
                title: 'KHÔNG THỂ LƯU',
            });
        }
    };

    useEffect(() => {
        getContentDepartment();
        getEvaluate();
        getNote();
    }, []);

    const columns = [
        {
            key: 'departmentVN',
            dataIndex: 'departmentVN',
            title: <div style={{ fontWeight: 'bold', textAlign: 'center' }}>Bộ phận</div>,
            // ellipsis: true,
            align: 'center',
            render: record => <div style={{ fontWeight: 'bold', width: 110 }}>{record}</div>,
            onCell: (record, rowIndex) => ({ rowSpan: rowIndex === 0 ? evaluate.length : 0 }),
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
                        <Button onClick={() => handleSetEvaluateValue(evaluate)} type="primary">
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
                    onChange={e =>
                        setEvaluateValue(prevState => ({
                            ...prevState,
                            [record.key]: e.target.value,
                        }))
                    }
                    value={evaluateValue[record.key]}
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
                        <Button onClick={() => setEvaluateValue({})} type="primary">
                            Deselect All
                        </Button>
                    ),
                    align: 'center',
                    render: (_, record) =>
                        evaluateValue[record.key] === 0 ? (
                            <div style={{ color: '#ff4d4f' }}>{evaluateValue[record.key]}</div>
                        ) : (
                            evaluateValue[record.key]
                        ),
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
            onCell: (record, rowIndex) => ({ rowSpan: rowIndex === 0 ? evaluate.length : 0 }),
        },
    ];

    return (
        <EnvironmentContentComponent items={itemsBreadcrumb} loading={loading}>
            <Flex vertical gap="large">
                <Flex justify="end" gap={16}>
                    <DatePicker />
                    <Button
                        icon={<SaveFilled style={{ fontSize: 22, paddingTop: 3 }} />}
                        onClick={() => insertEvaluate()}
                        shape="round"
                        type="primary"
                    >
                        Save
                    </Button>
                </Flex>
                <Table
                    bordered
                    columns={columns}
                    dataSource={evaluate}
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
                                    {Object.values(evaluateValue).reduce(
                                        (previousValue, currentValue) =>
                                            previousValue + currentValue,
                                        0
                                    )}
                                </Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )}
                />
            </Flex>
            <ModalAddImage
                loading={loading}
                onCancel={() => setModalAddImage(false)}
                open={modalAddImage}
                form={formAddImage}
                onFinish={values => insertNote(values)}
            />
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />
            <ModalErrorOtherComponent
                onOk={() => setModalErrorOther({ open: false })}
                open={modalErrorOther.open}
                title={modalErrorOther.title}
                message={modalErrorOther.message}
            />
            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
            <ModalShowImage
                dataSource={note}
                onCancel={() => setModalShowImage(false)}
                onClick={() => setModalAddImage(true)}
                open={modalShowImage}
            />
        </EnvironmentContentComponent>
    );
};

export default EvaluateOfficePage;
