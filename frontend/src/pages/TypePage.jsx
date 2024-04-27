import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Alert, Button, Dropdown, Flex, Form, Input, Modal, Space, Table } from 'antd';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { PencilFill, ThreeDotsVertical } from 'react-bootstrap-icons';

import {
    ContentComponent,
    FormComponent,
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
} from '../components';

import { createConnection } from '../utils';

const itemsBreadcrumb = [
    {
        title: <Link to="/nghiphep">Home</Link>,
    },
    {
        title: <Link to="/nghiphep/type">Type</Link>,
    },
];

const TypePage = () => {
    const [loading, setLoading] = useState(false);

    const [type, setType] = useState([]);

    const [modalMain, setModalMain] = useState({
        open: false,
        title: '',
    });

    const [modalConfirm, setModalConfirm] = useState({
        onOk: () => {},
        open: false,
        message: '',
    });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        message: '',
    });

    const [form] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getType();
    }, []);

    const getType = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/leave/type`);

            setType(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertType = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).post(`/leave/type`, values);

            setModalMain({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getType();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const updateType = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).put(
                `/leave/type/${values.id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getType();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const deleteType = async id => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).delete(`/leave/type/${id}`);

            setModalConfirm({
                open: false,
            });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getType();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async values => (values.id ? updateType(values) : insertType(values));

    const columnsType = [
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
                                    form.setFieldsValue(record);

                                    setModalMain({ open: true, title: 'SỬA LOẠI NGHỈ PHÉP' });
                                },
                                style: { color: '#faad14' },
                            },
                            {
                                key: '2',
                                label: 'Xoá',
                                icon: <DeleteFilled />,
                                onClick: () =>
                                    setModalConfirm({
                                        onOk: () => deleteType(record.id),
                                        open: true,
                                        message: (
                                            <Space direction="vertical" align="center">
                                                Bạn có chắc muốn xóa loại nghỉ phép?
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
            title: 'Mã loại nghỉ phép',
            dataIndex: 'code',
            key: 'code',
            ellipsis: true,
        },
        {
            title: 'Tên loại nghỉ phép (VN)',
            dataIndex: 'nameVN',
            key: 'nameVN',
            ellipsis: true,
        },
        {
            title: 'Tên loại nghỉ phép (EN)',
            dataIndex: 'nameEN',
            key: 'nameEN',
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
            render: record => dayjs(record).format('HH:mm DD/MM/YYYY'),
        },
    ];

    const formFields = [
        {
            label: 'Mã loại',
            name: 'code',
            rules: [{ required: true, message: 'Bạn chưa nhập mã loại nghỉ phép' }],
            typeInput: (
                <Input allowClear maxLength={10} placeholder="Nhập mã loại nghỉ phép" showCount />
            ),
        },
        {
            label: 'Tên loại (VN)',
            name: 'nameVN',
            rules: [{ required: true, message: 'Bạn chưa nhập tên loại nghỉ phép' }],
            typeInput: (
                <Input allowClear maxLength={100} placeholder="Nhập tên loại nghỉ phép" showCount />
            ),
        },
        {
            label: 'Tên loại (EN)',
            name: 'nameEN',
            rules: [{ required: true, message: 'Bạn chưa nhập tên loại nghỉ phép' }],
            typeInput: (
                <Input allowClear maxLength={100} placeholder="Nhập tên loại nghỉ phép" showCount />
            ),
        },
    ];

    return (
        <ContentComponent loading={loading} items={itemsBreadcrumb}>
            <Flex vertical gap={'large'}>
                <Flex justify={'end'}>
                    <Button
                        icon={<PlusCircleFilled style={{ fontSize: 22, paddingTop: 3 }} />}
                        onClick={() => {
                            setModalMain({
                                open: true,
                                title: 'THÊM LOẠI NGHỈ PHÉP',
                            });
                        }}
                        shape={'round'}
                        type={'primary'}
                    >
                        Thêm
                    </Button>
                </Flex>
                <Table
                    bordered
                    columns={columnsType}
                    dataSource={type}
                    scroll={{ x: true }}
                    showSorterTooltip={false}
                />
            </Flex>
            <Modal
                afterClose={() => form.resetFields()}
                cancelButtonProps={{ style: { borderRadius: 20 } }}
                cancelText="Hủy Bỏ"
                forceRender
                okButtonProps={{ loading, style: { borderRadius: 20 } }}
                okText="Đồng Ý"
                onCancel={() => setModalMain({ open: false })}
                onOk={() => form.submit()}
                open={modalMain.open}
                title={modalMain.title}
                styles={{
                    header: { paddingBottom: 20, textAlign: 'center' },
                    footer: { paddingTop: 20, textAlign: 'center' },
                }}
            >
                <FormComponent form={form} formFields={formFields} onFinish={onFinish} />
            </Modal>
            <ModalConfirmComponent
                loading={loading}
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
        </ContentComponent>
    );
};

export default TypePage;
