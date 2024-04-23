import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Alert, Button, Dropdown, Flex, Form, Input, Modal, Select, Space, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

import {
    ContentComponent,
    FormComponent,
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
} from '../../components';

import { createConnection } from '../../utils';

const { Password } = Input;

const itemsBreadcrumb = [
    { title: <Link to={'/vesinh'}>Home</Link> },
    { title: <Link to={'/vesinh/user'}>User</Link> },
];

const UserPage = () => {
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [modalUser, setModalUser] = useState({ open: false, title: '' });

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

    const [formUser] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/environment/user`);

            setUserList(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertUser = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).post(`/environment/user`, values);

            setModalUser({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getUser();
        } catch (error) {
            console.log(error);
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).put(
                `/environment/user/${values.id}`,
                values
            );

            setModalUser({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getUser();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).delete(
                `/environment/user/${values.id}`
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getUser();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const onFinish = values => {
        values.id ? updateUser(values) : insertUser(values);
    };

    const formFields = [
        {
            label: 'Mã nhân viên',
            name: 'code',
            rules: [{ required: true, message: 'Bạn chưa nhập mã nhân viên' }],
            typeInput: (
                <Input allowClear maxLength={10} placeholder="Nhập mã nhân viên" showCount />
            ),
        },
        {
            label: 'Tên nhân viên',
            name: 'name',
            rules: [{ required: true, message: 'Bạn chưa nhập tên nhân viên' }],
            typeInput: (
                <Input allowClear maxLength={50} placeholder="Nhập tên nhân viên" showCount />
            ),
        },
        {
            label: 'Ngôn ngữ',
            name: 'language',
            rules: [{ required: true, message: 'Bạn chưa chọn ngôn ngữ' }],
            typeInput: (
                <Select allowClear placeholder="Chọn ngôn ngữ">
                    <Select.Option value="VN">VN</Select.Option>
                    <Select.Option value="JP">JP</Select.Option>
                </Select>
            ),
        },
        {
            label: 'Tài khoản',
            name: 'username',
            rules: [{ required: true, message: 'Vui lòng nhập tài khoản' }],
            typeInput: <Input allowClear maxLength={20} placeholder="Nhập tài khoản" showCount />,
        },
        {
            label: 'Mật khẩu',
            name: 'password',
            rules: [{ required: true, message: 'Vui lòng đặt mật khẩu' }],
            typeInput: <Password allowClear maxLength={50} placeholder="Nhập mật khẩu" showCount />,
        },
    ];

    const columnsUser = [
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
                                icon: <EditFilled />,
                                onClick: () => {
                                    formUser.setFieldsValue(record);

                                    setModalUser({ open: true, title: 'SỬA NHÂN VIÊN' });
                                },
                                style: { color: '#faad14' },
                            },
                            {
                                key: '2',
                                label: 'Xoá',
                                icon: <DeleteFilled />,
                                onClick: () =>
                                    setModalConfirm({
                                        onOk: () => deleteUser(record),
                                        open: true,
                                        message: (
                                            <Space direction="vertical" align="center">
                                                Bạn có chắc muốn xóa nhân viên?
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
            title: 'Mã nhân viên',
            dataIndex: 'code',
            key: 'code',
            ellipsis: true,
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },
        {
            title: 'Ngôn ngữ',
            dataIndex: 'language',
            key: 'language',
            ellipsis: true,
        },
        {
            title: 'Tài khoản',
            dataIndex: 'username',
            key: 'username',
            ellipsis: true,
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
            ellipsis: true,
            render: record => (record.length > 10 ? `${record.slice(0, 10)}.....` : record),
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
        <ContentComponent items={itemsBreadcrumb} loading={loading}>
            <Flex vertical gap={'large'}>
                <Flex justify={'end'}>
                    <Button
                        icon={<PlusCircleFilled style={{ fontSize: 22, paddingTop: 3 }} />}
                        onClick={() => setModalUser({ open: true, title: 'THÊM MỚI NHÂN VIÊN' })}
                        shape={'circle'}
                        type={'primary'}
                    />
                </Flex>
                <Table
                    bordered
                    columns={columnsUser}
                    dataSource={userList}
                    scroll={{ x: true }}
                    showSorterTooltip={false}
                />
            </Flex>
            <Modal
                afterClose={() => formUser.resetFields()}
                cancelButtonProps={{ style: { borderRadius: 20 } }}
                cancelText="Hủy Bỏ"
                closeIcon={false}
                forceRender
                okButtonProps={{ style: { borderRadius: 20 } }}
                okText="Đồng Ý"
                onCancel={() => setModalUser({ open: false })}
                onOk={() => formUser.submit()}
                open={modalUser.open}
                title={modalUser.title}
                styles={{
                    header: { paddingBottom: 20, textAlign: 'center' },
                    footer: { paddingTop: 20, textAlign: 'center' },
                }}
            >
                <FormComponent form={formUser} formFields={formFields} onFinish={onFinish} />
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
        </ContentComponent>
    );
};

export default UserPage;
