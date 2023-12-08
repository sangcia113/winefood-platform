import {
    Button,
    Card,
    DatePicker,
    Form,
    InputNumber,
    Layout,
    Modal,
    Row,
    Select,
    Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../configs/urlConfig';
import dayjs from 'dayjs';
const { Content } = Layout;
const { Text } = Typography;
const HomePage = () => {
    console.log('Run Home...');

    const [department, setDepartment] = useState([]);
    const [user, setUser] = useState([]);
    const [leaveType, setLeaveType] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        handleGetDepartment();
        handleGetUser();
        handleGetLeaveType();
    }, []);

    const handleGetDepartment = async () => {
        const response = await axios.get(`${URL}/api/department`);
        setDepartment(response.data);
    };

    const handleGetUser = async () => {
        const response = await axios.get(`${URL}/api/user`);
        setUser(response.data);
    };

    const handleGetLeaveType = async () => {
        const response = await axios.get(`${URL}/api/leave-type`);
        setLeaveType(response.data);
    };

    const handleInsertData = async values => {
        const response = await axios.post(`${URL}/api/leave-list`, values);
        console.log(response);
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
                });
            } else {
                Modal.warning({
                    centered: true,
                    content: (
                        <Text>
                            Giờ bắt đầu & kết thúc phải nằm trong khoảng từ <b>07:30</b> đến{' '}
                            <b>16:30</b>!<br></br>
                            Giờ bắt đầu của bạn là: <b>{dayjs(fromDate).format('HH:mm')}</b>
                            <br></br>
                            Giờ kết thúc của bạn là: <b>{dayjs(toDate).format('HH:mm')}</b>
                        </Text>
                    ),
                    title: 'Cảnh báo',
                });
            }
        } else {
            Modal.warning({
                centered: true,
                content: (
                    <Text>
                        Ngày/ giờ kết thúc phải <b>lớn hơn</b> ngày/ giờ bắt đầu!
                    </Text>
                ),
                title: 'Cảnh báo',
            });
        }
    };

    return (
        <Content
            style={{
                padding: 20,
                backgroundImage: `url(${require('../assets/images/skr1.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Card
                bordered={false}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(2px)',
                }}
            >
                <Form
                    form={form}
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
                                <small className="text-muted">(EMPLOYEE'S NAME)</small>
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
                            placeholder="Chọn tên trong danh sách..."
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
                                <small className="text-muted">(TYPES OF LEAVES)</small>
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
                                <small className="text-muted">(DAY REQUESTED FOR LEAVE)</small>
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
                                <small className="text-muted">(FROM)</small>
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
                                <small className="text-muted">(TO)</small>
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
                                <small className="text-muted">(REASON)</small>
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
            <Row>
                <Button
                    size={'large'}
                    type={'primary'}
                    onClick={() => form.submit()}
                    style={{ margin: 'auto', marginTop: 30 }}
                >
                    Gửi Phép
                </Button>
            </Row>
        </Content>
    );
};

export default HomePage;
