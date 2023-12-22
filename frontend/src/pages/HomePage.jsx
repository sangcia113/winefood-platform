import {
    Button,
    Card,
    DatePicker,
    Flex,
    Form,
    InputNumber,
    Layout,
    Select,
    Spin,
    Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../configs/urlConfig';
import dayjs from 'dayjs';
import { ModalErrorComponent, ModalSuccessComponent } from '../components';
import ModalWarningComponent from '../components/feature/modal/ModalWarningComponent';
import ModalPasswordComponent from '../components/feature/modal/ModalPasswordComponent';
import { SyncOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Link, Text } = Typography;
const HomePage = () => {
    console.log('Run Home...');

    const [user, setUser] = useState([]);
    const [department, setDepartment] = useState([]);
    const [leaveType, setLeaveType] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalError, setModalError] = useState({
        open: false,
        title: '',
        message: '',
    });

    const [modalPassword, setModalPassword] = useState({
        open: false,
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        message: '',
    });

    const [modalWarning, setModalWarning] = useState({
        open: false,
        message: '',
    });

    const [formMain] = Form.useForm();
    const [formPassword] = Form.useForm();

    useEffect(() => {
        handleGetDepartment();
        handleGetUser();
        handleGetLeaveType();
    }, []);

    const handleGetDepartment = async () => {
        try {
            const response = await axios.get(`${URL}/api/leave/department`);
            setDepartment(response.data);
        } catch (error) {
            setModalError({
                message: error.response.data.message,
                open: true,
                title: 'THẤT BẠI',
            });
        }
    };

    const handleGetUser = async () => {
        try {
            const response = await axios.get(`${URL}/api/leave/user`);
            setUser(response.data);
        } catch (error) {
            setModalError({
                message: error.response.data.message,
                open: true,
                title: 'THẤT BẠI',
            });
        }
    };

    const handleGetLeaveType = async () => {
        try {
            const response = await axios.get(`${URL}/api/leave/type`);
            setLeaveType(response.data);
        } catch (error) {
            setModalError({
                message: error.response.data.message,
                open: true,
                title: 'THẤT BẠI',
            });
        }
    };

    const handleInsertData = async values => {
        try {
            setLoading(true);

            const response = await axios.post(`${URL}/api/leave/list`, values);

            setModalSuccess({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Đã gửi yêu cầu lên cấp trên
                        <br />
                        <b>{response.data.superiorName}</b>
                        <br />
                        qua <b>Zalo</b>
                    </Text>
                ),
                open: true,
            });
        } catch (error) {
            if (error.response.data.error === -904) {
                setModalError({
                    message: (
                        <Text>
                            Đơn xin nghỉ phép của bạn đã
                            <br />
                            <b>tồn tại trong hệ thống!</b>
                            <br />
                            Vui lòng liên hệ <b>cấp trên</b> để được
                            <br />
                            phê duyệt!
                        </Text>
                    ),
                    open: true,
                    title: 'THẤT BẠI',
                });
            } else if (error === -230) {
                setModalError({
                    message: (
                        <Text>
                            Gửi thông báo qua Zalo <b>thất bại!</b>
                            <br />
                            Do người dùng đã không <b>tương tác</b>
                            <br />
                            với <b>WineFood</b> trong vòng 7 ngày!
                            <br />
                            Tuy nhiên
                            <br />
                            Dữ liệu <b>đã được ghi vào hệ thống.</b>
                            <br />
                            Bạn có thể yên tâm!
                        </Text>
                    ),
                    open: true,
                    title: 'THẤT BẠI',
                });
            } else {
                setModalError({
                    message: (
                        <Text>
                            Mã lỗi: {error.response.data.error}
                            <br />
                            Vui lòng liên hệ{' '}
                            <Link href="https://zalo.me/0972868740" target="_blank">
                                Mr.Sang
                            </Link>{' '}
                            để được hỗ trợ!
                        </Text>
                    ),
                    open: true,
                    title: 'THẤT BẠI',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePassword = values => {
        console.log(values);
    };

    const onFinish = values => {
        const { fromDate, toDate } = values;

        if (fromDate < toDate) {
            if (
                dayjs(fromDate).hour() >= 7 &&
                dayjs(fromDate).minute() >= 30 &&
                dayjs(toDate).hour() <= 16 &&
                dayjs(toDate).minute() <= 30
            ) {
                handleInsertData({
                    ...values,
                    fromDate: dayjs(fromDate).format('YYYY-MM-DD HH:mm'),
                    toDate: dayjs(toDate).format('YYYY-MM-DD HH:mm'),
                    userName: user.find(u => u.id === values.userId)?.name,
                    department: department.find(
                        d => d.id === user.find(u => u.id === values.userId)?.departmentId
                    )?.name,
                    leaveType: leaveType.find(lt => lt.id === values.leaveTypeId)?.nameVN,
                });
            } else {
                setModalWarning({
                    message: (
                        <Text style={{ textAlign: 'center' }}>
                            Giờ bắt đầu & kết thúc phải nằm trong khoảng từ
                            <br />
                            <b>07:30</b> đến <b>16:30</b>
                            <br />
                            Giờ bắt đầu của bạn là:{' '}
                            <Text strong type="danger">
                                {dayjs(fromDate).format('HH:mm')}
                            </Text>
                            <br />
                            Giờ kết thúc của bạn là:{' '}
                            <Text strong type="danger">
                                {dayjs(toDate).format('HH:mm')}
                            </Text>
                        </Text>
                    ),
                    open: true,
                });
            }
        } else {
            setModalWarning({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Ngày/ giờ kết thúc phải <b>lớn hơn</b>
                        <br />
                        ngày/ giờ bắt đầu!
                    </Text>
                ),
                open: true,
            });
        }
    };

    return (
        <Content
            style={{
                padding: 20,
                backgroundImage: `url(${require('../assets/images/bg11.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Spin fullscreen size={'large'} spinning={loading} tip="Vui lòng đợi..." />
            <Card
                bordered={false}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <Form
                    colon={false}
                    form={formMain}
                    labelAlign={'left'}
                    labelCol={{
                        xs: { span: 24 },
                        sm: { span: 12 },
                        md: { span: 8 },
                    }}
                    labelWrap
                    wrapperCol={{
                        xs: { span: 24 },
                        sm: { span: 12 },
                        md: { span: 16 },
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={
                            <Text>
                                <Text strong>HỌ VÀ TÊN</Text>
                                <br />
                                <small className="text-muted">EMPLOYEE'S NAME</small>
                            </Text>
                        }
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn tên!',
                            },
                        ]}
                    >
                        <Select
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            optionFilterProp="children"
                            placeholder="Chọn tên trong danh sách..."
                            showSearch
                            size={'large'}
                            style={{ width: '100%' }}
                        >
                            {department.map(d => (
                                <Select.OptGroup key={d.id} label={d.name}>
                                    {user.map(
                                        u =>
                                            u.departmentId === d.id && (
                                                <Select.Option key={u.id} value={u.id}>
                                                    {u.name}
                                                </Select.Option>
                                            )
                                    )}
                                </Select.OptGroup>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text>
                                <Text strong>LOẠI PHÉP</Text>
                                <br />
                                <small className="text-muted">TYPES OF LEAVES</small>
                            </Text>
                        }
                        name="leaveTypeId"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn loại phép!',
                            },
                        ]}
                        style={{ marginTop: 50 }}
                    >
                        <Select
                            placeholder="Chọn loại phép trong danh sách..."
                            size={'large'}
                            style={{ width: '100%' }}
                        >
                            {leaveType.map(item => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.nameVN}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text>
                                <Text strong>SỐ NGÀY XIN NGHỈ</Text>
                                <br />
                                <small className="text-muted">DAY REQUESTED FOR LEAVE</small>
                            </Text>
                        }
                        name="leaveDay"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập số ngày nghỉ!',
                            },
                        ]}
                        style={{ marginTop: 50 }}
                    >
                        <InputNumber
                            max={100}
                            min={0.25}
                            placeholder="Nhập số ngày xin nghỉ..."
                            size={'large'}
                            step={0.25}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text>
                                <Text strong>TỪ</Text>
                                <br />
                                <small className="text-muted">FROM</small>
                            </Text>
                        }
                        name="fromDate"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn ngày/ giờ bắt đầu!',
                            },
                        ]}
                        style={{ marginTop: 50 }}
                    >
                        <DatePicker
                            allowClear={false}
                            changeOnBlur={true}
                            format={'DD/MM/YYYY HH:mm'}
                            placeholder="Chọn ngày bắt đầu..."
                            showTime={{ defaultValue: dayjs('07:30', 'HH:mm') }}
                            size={'large'}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text>
                                <Text strong>ĐẾN</Text>
                                <br />
                                <small className="text-muted">TO</small>
                            </Text>
                        }
                        name="toDate"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn ngày/ giờ kết thúc!',
                            },
                        ]}
                        style={{ marginTop: 50 }}
                    >
                        <DatePicker
                            allowClear={false}
                            changeOnBlur={true}
                            format={'DD/MM/YYYY HH:mm'}
                            placeholder="Chọn ngày kết thúc..."
                            showTime={{ defaultValue: dayjs('16:30', 'HH:mm') }}
                            size={'large'}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text>
                                <Text strong>LÝ DO</Text>
                                <br />
                                <small className="text-muted">REASON</small>
                            </Text>
                        }
                        name="reason"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập lý do!',
                            },
                        ]}
                        style={{ marginTop: 50 }}
                    >
                        <TextArea
                            allowClear
                            placeholder="Nhập lý do xin nghỉ..."
                            rows={3}
                            size={'large'}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Form>
            </Card>
            <Flex justify="center" style={{ marginTop: 30 }}>
                <Button size={'large'} type={'primary'} onClick={() => formMain.submit()}>
                    Gửi Phép
                </Button>
            </Flex>
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                message={modalError.message}
                title={modalError.title}
            />
            <ModalPasswordComponent
                afterClose={() => formPassword.resetFields()}
                form={formPassword}
                onCancel={() => setModalPassword({ open: false })}
                onFinish={handlePassword}
                onOk={() => formPassword.submit()}
                open={modalPassword.open}
            />
            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
            <ModalWarningComponent
                onOk={() => setModalWarning({ open: false })}
                open={modalWarning.open}
                message={modalWarning.message}
            />
        </Content>
    );
};

export default HomePage;
