import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Ant Design components
import {
    Alert,
    Button,
    DatePicker,
    Dropdown,
    Flex,
    Form,
    Input,
    Modal,
    Select,
    Space,
    Table,
    Tabs,
    Tag,
    Typography,
} from 'antd';
import { DeleteFilled, SyncOutlined } from '@ant-design/icons';
import { PencilFill, PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons';

import {
    ContentComponent,
    FormComponent,
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
} from '../components';

import { createConnection, getUniqueName } from '../utils';

// Ant Design Layout
const { Password } = Input;
const { Text } = Typography;

const UserPage = () => {
    console.log('Run UserPage');

    const [loading, setLoading] = useState(false);

    const [department, setDepartment] = useState([]);

    const [role, setRole] = useState([]);

    const [zaloAPIInfo, setZaloAPIInfo] = useState([]);

    const [user, setUser] = useState([]);

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
        getRole();
        getZaloAPIInfo();
        getUser();
    }, []);

    const getDepartment = async () => {
        try {
            const response = await createConnection(accessToken).get(`/leave/department`);

            setDepartment(response.data);
        } catch (error) {
            setModalError({ error, open: true });
        }
    };

    const getRole = async () => {
        try {
            const response = await createConnection(accessToken).get(`/leave/role`);

            setRole(response.data);
        } catch (error) {
            setModalError({ error, open: true });
        }
    };

    const getUser = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/leave/user`);

            setUser(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const getZaloAPIInfo = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/zalo/user`);

            setZaloAPIInfo(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const getFollower = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/zalo/get-follower`);

            console.log(response.data);
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertUser = async values => {
        try {
            const response = await createConnection(accessToken).post(`/leave/user`, values);

            setModalMain({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getUser();
        } catch (error) {
            setModalError({ error, open: true });
        }
    };

    const updateUser = async values => {
        try {
            const response = await createConnection(accessToken).put(
                `/leave/user/${values.id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getUser();
        } catch (error) {
            setModalError({ error, open: true });
        }
    };

    const deleteUser = async id => {
        try {
            const response = await createConnection(accessToken).delete(`/leave/user/${id}`);

            setModalConfirm({
                open: false,
            });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getUser();
        } catch (error) {
            setModalError({ error, open: true });
        }
    };

    const onFinish = async values => {
        values.id
            ? updateUser({
                  ...values,
                  birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
              })
            : insertUser({
                  ...values,
                  birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
              });
    };

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
                                icon: <PencilFill />,
                                onClick: () => {
                                    form.setFieldsValue({
                                        ...record,
                                        birthday: dayjs(record.birthday),
                                    });

                                    setModalMain({ open: true, title: 'SỬA NHÂN VIÊN' });
                                },
                                style: { color: '#faad14' },
                            },
                            {
                                key: '2',
                                label: 'Xoá',
                                icon: <DeleteFilled />,
                                onClick: () =>
                                    setModalConfirm({
                                        onOk: () => deleteUser(record.id),
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
            filterSearch: true,
            filters: getUniqueName(user, 'id', 'name'),
            onFilter: (value, record) => record.name.includes(value),
            render: record => <Text strong>{record}</Text>,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY'),
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            ellipsis: true,
            render: record =>
                record === 1 ? <Tag color={'blue'}>Nam</Tag> : <Tag color={'magenta'}>Nữ</Tag>,
        },
        {
            title: 'Bộ phận',
            dataIndex: 'departmentId',
            key: 'departmentId',
            ellipsis: true,
            render: record => department.find(item => item.id === record)?.name,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'roleId',
            key: 'roleId',
            ellipsis: true,
            render: record => role.find(item => item.id === record)?.name,
        },
        {
            title: 'Cấp trên',
            dataIndex: 'superiorId',
            key: 'superiorId',
            ellipsis: true,
            render: record => user.find(item => item.id === record)?.name,
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
            ellipsis: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'numberPhone',
            key: 'numberPhone',
            ellipsis: true,
        },
        {
            title: 'Zalo API User',
            dataIndex: 'zaloUserId',
            key: 'zaloUserId',
            ellipsis: true,
            render: (_, record) =>
                zaloAPIInfo.find(item => item.zaloNumberPhone === record.numberPhone)?.zaloUserId,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
        },
    ];

    const columnsZaloUser = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            render: (_, record) =>
                record.zaloNumberPhone ? (
                    <Text strong>
                        {user.find(item => item.numberPhone === record.zaloNumberPhone)?.name}
                    </Text>
                ) : (
                    ''
                ),
        },
        {
            title: 'Zalo ID',
            dataIndex: 'zaloUserId',
            key: 'zaloUserId',
            ellipsis: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'zaloNumberPhone',
            key: 'zaloNumberPhone',
            ellipsis: true,
        },
        {
            title: 'Yêu cầu',
            dataIndex: 'sendRequest',
            key: 'sendRequest',
            ellipsis: true,
            render: record =>
                record === 0 ? (
                    <Tag
                        bordered={false}
                        color="processing"
                        icon={<SyncOutlined spin />}
                        style={{ paddingLeft: 0, backgroundColor: 'white' }}
                    >
                        Waiting...
                    </Tag>
                ) : (
                    record
                ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
        },
    ];

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
            label: 'Ngày sinh',
            name: 'birthday',
            rules: [{ required: true, message: 'Bạn chưa chọn ngày sinh' }],
            typeInput: (
                <DatePicker
                    allowClear
                    format={'DD/MM/YYYY'}
                    placeholder="Chọn ngày sinh"
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: 'Giới tính',
            name: 'gender',
            rules: [{ required: true, message: 'Bạn chưa chọn giới tính' }],
            typeInput: (
                <Select allowClear placeholder="Chọn giới tính">
                    <Select.Option value={1}>Nam</Select.Option>
                    <Select.Option value={0}>Nữ</Select.Option>
                </Select>
            ),
        },
        {
            label: 'Bộ phận',
            name: 'departmentId',
            rules: [{ required: true, message: 'Vui lòng chọn bộ phận' }],
            typeInput: (
                <Select allowClear placeholder="Chọn bộ phận">
                    {department.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'Chức vụ',
            name: 'roleId',
            rules: [{ required: true, message: 'Vui lòng chọn chức vụ' }],
            typeInput: (
                <Select allowClear placeholder="Chọn chức vụ">
                    {role.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'Cấp trên',
            name: 'superiorId',
            rules: [{ required: true, message: 'Vui lòng chọn cấp trên' }],
            typeInput: (
                <Select allowClear placeholder="Chọn cấp trên">
                    {user.map(
                        item =>
                            item.roleId !== 5 && (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            )
                    )}
                </Select>
            ),
        },
        {
            label: 'Mật khẩu',
            name: 'password',
            rules: [{ required: true, message: 'Vui lòng đặt mật khẩu' }],
            typeInput: (
                <Password allowClear maxLength={100} placeholder="Nhập mật khẩu" showCount />
            ),
        },
        {
            label: 'Số điện thoại',
            name: 'numberPhone',
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại' }],
            typeInput: (
                <Input allowClear maxLength={11} placeholder="Nhập số điện thoại" showCount />
            ),
        },
    ];

    const itemsBreadcrumb = [
        {
            title: <Link to="/">Home</Link>,
        },
        {
            title: <Link to="/user">User</Link>,
        },
    ];

    return (
        <ContentComponent loading={loading} items={itemsBreadcrumb}>
            <Tabs
                centered
                defaultActiveKey="1"
                items={[
                    {
                        key: 1,
                        label: 'Danh Sách Nhân Viên',
                        children: (
                            <Flex vertical gap={'large'}>
                                <Flex justify={'end'}>
                                    <Button
                                        icon={
                                            <PlusCircleFill
                                                style={{ fontSize: 22, paddingTop: 3 }}
                                            />
                                        }
                                        onClick={() => {
                                            setModalMain({
                                                open: true,
                                                title: 'THÊM NHÂN VIÊN',
                                            });
                                        }}
                                        shape={'circle'}
                                        type={'primary'}
                                    />
                                </Flex>
                                <Table
                                    bordered
                                    columns={columnsUser}
                                    dataSource={user}
                                    scroll={{ x: true }}
                                    showSorterTooltip={false}
                                />
                            </Flex>
                        ),
                    },
                    {
                        key: 2,
                        label: 'Quản Lý API',
                        children: (
                            <Flex vertical gap={'large'}>
                                <Flex justify={'center'} gap={'large'}>
                                    <Button
                                        onClick={() => getFollower()}
                                        style={{ backgroundColor: '#f759ab', color: 'white' }}
                                    >
                                        Get All User
                                    </Button>
                                    <Button style={{ backgroundColor: '#2db7f5', color: 'white' }}>
                                        Request API
                                    </Button>
                                    <Button style={{ backgroundColor: '#73d13d', color: 'white' }}>
                                        Get Number Phone
                                    </Button>
                                </Flex>
                                <Table
                                    bordered
                                    columns={columnsZaloUser}
                                    dataSource={zaloAPIInfo}
                                    scroll={{ x: true }}
                                    showSorterTooltip={false}
                                />
                            </Flex>
                        ),
                    },
                ]}
                tabBarGutter={40}
            />
            <Modal
                afterClose={() => form.resetFields()}
                cancelButtonProps={{ style: { borderRadius: 20 } }}
                cancelText="Hủy Bỏ"
                closeIcon={false}
                forceRender
                okButtonProps={{ style: { borderRadius: 20 } }}
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
