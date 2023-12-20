import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

// React Bootstrap Icons
import { PencilFill, PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons';
import { DeleteFilled } from '@ant-design/icons';

// Ant Design components
import {
    Alert,
    Button,
    Card,
    DatePicker,
    Dropdown,
    Flex,
    Form,
    Input,
    Layout,
    Modal,
    Select,
    Space,
    Spin,
    Table,
    Tabs,
    Tag,
    Typography,
} from 'antd';

// Local imports
import { URL } from '../configs/urlConfig';
import FormComponent from '../components/feature/FormComponent';
import { getUniqueName } from '../utils';
import { ModalConfirmComponent, ModalErrorComponent, ModalSuccessComponent } from '../components';

// Ant Design Layout
const { Content } = Layout;
const { Text } = Typography;

const EmployeePage = () => {
    console.log('Run EmployeePage');

    const [loading, setLoading] = useState(false);
    const [dataSourceEmployee, setDataSourceEmployee] = useState([]);
    const [dataSourceDepartment, setDataSourceDepartment] = useState([]);
    const [dataSourceRole, setDataSourceRole] = useState([]);
    const [dataSourceZaloUser, setDataSourceZaloUser] = useState([]);

    const [modalForm, setModalForm] = useState({
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
        title: '',
        message: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        title: '',
        message: '',
    });

    const [form] = Form.useForm();

    useEffect(() => {
        handleGetDepartment();
        handleGetRole();
        handleGetEmployee();
        handleGetZaloUser();
    }, []);

    const handleGetDepartment = async () => {
        try {
            const response = await axios.get(`${URL}/api/leave/department`);

            const arrData = response.data.map(item => ({ ...item, key: item.id }));

            setDataSourceDepartment(arrData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetRole = async () => {
        try {
            const response = await axios.get(`${URL}/api/leave/role`);

            const arrData = response.data.map(item => ({ ...item, key: item.id }));

            setDataSourceRole(arrData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetZaloUser = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${URL}/api/zalo/user`);

            const arrData = response.data.map(item => ({ ...item, key: item.id }));

            setDataSourceZaloUser(arrData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetEmployee = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${URL}/api/leave/user`);

            const arrData = response.data.map(item => ({ ...item, key: item.id }));

            setDataSourceEmployee(arrData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInsertEmployee = async values => {
        try {
            const response = await axios.post(`${URL}/api/leave/user`, values);

            setModalForm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            handleGetEmployee();
        } catch (error) {
            setModalError({
                message: error.response.data.message,
                open: true,
                title: 'THẤT BẠI',
            });
        }
    };

    const handleUpdateEmployee = async values => {
        try {
            const response = await axios.put(`${URL}/api/leave/user/${values.id}`, values);

            setModalForm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            handleGetEmployee();
        } catch (error) {
            setModalError({
                message: error.response.data.error,
                open: true,
                title: 'THẤT BẠI',
            });
        }
    };

    const handleDeleteEmployee = async id => {
        try {
            const response = await axios.delete(`${URL}/api/leave/user/${id}`);

            setModalConfirm({
                open: false,
            });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            handleGetEmployee();
        } catch (error) {
            setModalError({
                message: error.response.data.message,
                open: true,
                title: 'THẤT BẠI',
            });
        }
    };

    const onFinish = async values => {
        values.id
            ? handleUpdateEmployee({
                  ...values,
                  birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
              })
            : handleInsertEmployee({
                  ...values,
                  birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
              });
    };

    const columnsEmployee = [
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

                                    setModalForm({ open: true, title: 'SỬA NHÂN VIÊN' });
                                },
                                style: { color: '#faad14' },
                            },
                            {
                                key: '2',
                                label: 'Xoá',
                                icon: <DeleteFilled />,
                                onClick: () =>
                                    setModalConfirm({
                                        onOk: () => handleDeleteEmployee(record.id),
                                        open: true,
                                        message: (
                                            <Space direction="vertical" align="center">
                                                Bạn có chắc muốn xóa nhân viên?
                                                <b>{record.userName}</b>
                                                khỏi CSDL không?
                                                <Alert
                                                    message="Thao tác này không thể hoàn tác!"
                                                    type="error"
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
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            filterSearch: true,
            filters: getUniqueName(dataSourceEmployee),
            onFilter: (value, record) => record.userName.includes(value),
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
            render: record => dataSourceDepartment.find(item => item.id === record)?.name,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'roleId',
            key: 'roleId',
            ellipsis: true,
            render: record => dataSourceRole.find(item => item.id === record)?.name,
        },
        {
            title: 'ID cấp trên',
            dataIndex: 'superiorId',
            key: 'superiorId',
            ellipsis: true,
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
            dataIndex: 'userId',
            key: 'userId',
            ellipsis: true,
            sorter: (a, b) => a.userId - b.userId,
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            filterSearch: true,
            filters: getUniqueName(dataSourceZaloUser),
            onFilter: (value, record) => record.userName.includes(value),
            render: record => <Text strong>{record}</Text>,
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
                    <>
                        <Spin size={'small'} /> Waiting...
                    </>
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
            rules: [{ required: true, message: 'Vui lòng nhập mã nhân viên' }],
            typeInput: <Input allowClear maxLength={10} showCount />,
        },
        {
            label: 'Tên nhân viên',
            name: 'name',
            rules: [{ required: true, message: 'Vui lòng nhập tên nhân viên' }],
            typeInput: <Input allowClear maxLength={50} showCount />,
        },
        {
            label: 'Ngày sinh',
            name: 'birthday',
            rules: [{ required: true, message: 'Vui lòng chọn ngày sinh' }],
            typeInput: <DatePicker allowClear format={'DD/MM/YYYY'} style={{ width: '100%' }} />,
        },
        {
            label: 'Giới tính',
            name: 'gender',
            rules: [{ required: true, message: 'Vui lòng chọn giới tính' }],
            typeInput: (
                <Select allowClear>
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
                <Select allowClear>
                    {dataSourceDepartment.map(item => (
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
                <Select allowClear>
                    {dataSourceRole.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'ID Cấp trên',
            name: 'superiorId',
            rules: [{ required: true, message: 'Vui lòng đặt mật khẩu' }],
            typeInput: <Input allowClear maxLength={50} showCount />,
        },
        {
            label: 'Mật khẩu',
            name: 'password',
            rules: [{ required: true, message: 'Vui lòng đặt mật khẩu' }],
            typeInput: <Input allowClear maxLength={50} showCount />,
        },
        {
            label: 'Số điện thoại',
            name: 'numberPhone',
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại' }],
            typeInput: <Input allowClear maxLength={11} showCount />,
        },
    ];

    return (
        <Content
            style={{
                padding: 20,
                backgroundImage: `url(${require('../assets/images/bg5.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Card
                bordered={false}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(4px)',
                }}
            >
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
                                                setModalForm({
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
                                        columns={columnsEmployee}
                                        dataSource={dataSourceEmployee}
                                        loading={loading}
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
                                            style={{ backgroundColor: '#f759ab', color: 'white' }}
                                        >
                                            Get All User
                                        </Button>
                                        <Button
                                            style={{ backgroundColor: '#2db7f5', color: 'white' }}
                                        >
                                            Request API
                                        </Button>
                                        <Button
                                            style={{ backgroundColor: '#73d13d', color: 'white' }}
                                        >
                                            Get Number Phone
                                        </Button>
                                    </Flex>
                                    <Table
                                        bordered
                                        columns={columnsZaloUser}
                                        dataSource={dataSourceZaloUser}
                                        loading={loading}
                                        scroll={{ x: true }}
                                        showSorterTooltip={false}
                                    />
                                </Flex>
                            ),
                        },
                    ]}
                    tabBarGutter={40}
                />
            </Card>
            <Modal
                afterClose={() => form.resetFields()}
                cancelText="Hủy Bỏ"
                closeIcon={false}
                forceRender
                okText="Đồng Ý"
                onCancel={() => setModalForm({ open: false })}
                onOk={() => form.submit()}
                open={modalForm.open}
                title={modalForm.title}
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
                message={modalError.message}
                title={modalError.title}
            />
            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
        </Content>
    );
};

export default EmployeePage;
