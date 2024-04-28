import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Alert, Button, Dropdown, Flex, Form, Input, Modal, Space, Table } from 'antd';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { PencilFill, ThreeDotsVertical } from 'react-bootstrap-icons';

import {
    EnvironmentContentComponent,
    FormComponent,
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
} from '../../components';

import { createConnection } from '../../utils';

const itemsBreadcrumb = [
    { title: <Link to={'/vesinh'}>Home</Link> },
    { title: <Link to={'/vesinh/classify'}>Classify</Link> },
];

const ClassifyPage = () => {
    const [loading, setLoading] = useState(false);
    const [classifyList, setClassifyList] = useState([]);
    const [modalClassify, setModalClassify] = useState({ open: false, title: '' });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalConfirm, setModalConfirm] = useState({
        onOk: () => {},
        open: false,
        message: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        message: '',
    });

    const [formClassify] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getClassify();
    }, []);

    const getClassify = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get('/environment/classify');

            setClassifyList(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertClassify = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).post(
                `/environment/classify`,
                values
            );

            setModalClassify({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getClassify();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const updateClassify = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).put(
                `/environment/classify/${values.id}`,
                values
            );

            setModalClassify({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getClassify();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const deleteClassify = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).delete(
                `/environment/classify/${values.id}`
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getClassify();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const onFinish = values => {
        values.id ? updateClassify(values) : insertClassify(values);
    };

    const formFields = [
        {
            label: 'Phân loại (JP)',
            name: 'classifyJP',
            rules: [{ required: true, message: 'Bạn chưa nhập phân loại (JP)' }],
            typeInput: (
                <Input allowClear maxLength={50} placeholder="Nhập phân loại (JP)" showCount />
            ),
        },
        {
            label: 'Phân loại (VN)',
            name: 'classifyVN',
            rules: [{ required: true, message: 'Bạn chưa nhập phân loại (VN)' }],
            typeInput: (
                <Input allowClear maxLength={50} placeholder="Nhập phân loại (VN)" showCount />
            ),
        },
    ];

    const columnsClassify = [
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
                                key: '1',
                                label: 'Sửa',
                                icon: <PencilFill />,
                                onClick: () => {
                                    formClassify.setFieldsValue(record);

                                    setModalClassify({ open: true, title: 'SỬA PHÂN LOẠI' });
                                },
                                style: { color: '#faad14' },
                            },
                            {
                                key: '2',
                                label: 'Xoá',
                                icon: <DeleteFilled />,
                                onClick: () =>
                                    setModalConfirm({
                                        onOk: () => deleteClassify(record),
                                        open: true,
                                        message: (
                                            <Space direction="vertical" align="center">
                                                Bạn có chắc muốn xóa phân loại?
                                                <b>{record.name}</b>
                                                khỏi CSDL không?
                                                <Alert
                                                    message="Thao tác này không thể hoàn tác!"
                                                    type="danger"
                                                    style={{
                                                        backgroundColor: '#ff4d4f',
                                                        color: 'white',
                                                    }}
                                                />
                                            </Space>
                                        ),
                                    }),
                                style: { color: '#ff4d4f' },
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
            ellipsis: true,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Phân loại (JP)',
            dataIndex: 'classifyJP',
            key: 'classifyJP',
            ellipsis: true,
        },
        {
            title: 'Phân loại (VN)',
            dataIndex: 'classifyVN',
            key: 'classifyVN',
            ellipsis: true,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ellipsis: true,
            render: record => dayjs(record).format('HH:mm DD/MM/YYYY'),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
            ellipsis: true,
            render: record => record && dayjs(record).format('HH:mm DD/MM/YYYY'),
        },
    ];

    return (
        <EnvironmentContentComponent items={itemsBreadcrumb} loading={loading}>
            <Flex vertical gap={'large'}>
                <Flex justify={'end'}>
                    <Button
                        icon={<PlusCircleFilled />}
                        onClick={() =>
                            setModalClassify({ open: true, title: 'THÊM MỚI PHÂN LOẠI' })
                        }
                        shape={'round'}
                        type={'primary'}
                    >
                        Thêm
                    </Button>
                </Flex>
                <Table
                    bordered
                    columns={columnsClassify}
                    dataSource={classifyList}
                    scroll={{ x: true }}
                    showSorterTooltip={false}
                />
            </Flex>
            <Modal
                afterClose={() => formClassify.resetFields()}
                cancelButtonProps={{ style: { borderRadius: 20 } }}
                cancelText="Hủy Bỏ"
                closeIcon={false}
                forceRender
                okButtonProps={{ style: { borderRadius: 20 } }}
                okText="Đồng Ý"
                onCancel={() => setModalClassify({ open: false })}
                onOk={() => formClassify.submit()}
                open={modalClassify.open}
                title={modalClassify.title}
                styles={{
                    header: { paddingBottom: 20, textAlign: 'center' },
                    footer: { paddingTop: 20, textAlign: 'center' },
                }}
            >
                <FormComponent form={formClassify} formFields={formFields} onFinish={onFinish} />
            </Modal>
            <ModalConfirmComponent
                onCancel={() => setModalConfirm({ open: false })}
                onOk={modalConfirm.onOk}
                open={modalConfirm.open}
                message={modalConfirm.message}
            />
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />
            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
        </EnvironmentContentComponent>
    );
};

export default ClassifyPage;
