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
        title: <Link to="/nghiphep/department">Department</Link>,
    },
];

const DepartmentPage = () => {
    const [loading, setLoading] = useState(false);

    const [department, setDepartment] = useState([]);

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
        getDepartment();
    }, []);

    const getDepartment = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/leave/department`);

            setDepartment(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertDepartment = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).post(`/leave/department`, values);

            setModalMain({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getDepartment();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const updateDepartment = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).put(
                `/leave/department/${values.id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getDepartment();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const deleteDepartment = async id => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).delete(`/leave/department/${id}`);

            setModalConfirm({
                open: false,
            });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getDepartment();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async values => {
        values.id ? updateDepartment(values) : insertDepartment(values);
    };

    const columnsDepartment = [
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

                                    setModalMain({ open: true, title: 'SỬA BỘ PHẬN' });
                                },
                                style: { color: '#faad14' },
                            },
                            {
                                key: '2',
                                label: 'Xoá',
                                icon: <DeleteFilled />,
                                onClick: () =>
                                    setModalConfirm({
                                        onOk: () => deleteDepartment(record.id),
                                        open: true,
                                        message: (
                                            <Space direction="vertical" align="center">
                                                Bạn có chắc muốn xóa bộ phận?
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
            title: 'Mã bộ phận',
            dataIndex: 'code',
            key: 'code',
            ellipsis: true,
        },
        {
            title: 'Tên bộ phận',
            dataIndex: 'name',
            key: 'name',
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
            label: 'Mã bộ phận',
            name: 'code',
            rules: [{ required: true, message: 'Bạn chưa nhập mã bộ phận' }],
            typeInput: <Input allowClear maxLength={10} placeholder="Nhập mã bộ phận" showCount />,
        },
        {
            label: 'Tên bộ phận',
            name: 'name',
            rules: [{ required: true, message: 'Bạn chưa nhập tên bộ phận' }],
            typeInput: <Input allowClear maxLength={50} placeholder="Nhập tên bộ phận" showCount />,
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
                                title: 'THÊM BỘ PHẬN',
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
                    columns={columnsDepartment}
                    dataSource={department}
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

export default DepartmentPage;
