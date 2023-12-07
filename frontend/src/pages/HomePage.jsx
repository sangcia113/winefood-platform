import {
    Button,
    Card,
    DatePicker,
    Flex,
    Form,
    InputNumber,
    Layout,
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
const options = [];
const HomePage = () => {
    console.log('Run Home...');

    const [user, setUser] = useState([]);
    const [typeOfLeave, setTypeOfLeave] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        handleGetName();
    }, []);

    const handleGetName = async () => {
        const response = await axios.get(`${URL}/api/user`);
        // response.map(item => item.departmentId);
        console.log(response);
    };

    const onFinish = values => console.log(values);

    return (
        <Content style={{ padding: 20 }}>
            <Card bordered={false} style={{ paddingLeft: 40 }}>
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
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn tên!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn tên trong danh sách..."
                            options={options}
                            size={'large'}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text>
                                <Text strong>LOẠI PHÉP</Text>
                                <br />
                                <small className="text-muted">(TYPES OF LEAVES)</small>
                            </Text>
                        }
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn loại phép!',
                            },
                        ]}
                        style={{ marginTop: 50 }}
                    >
                        <Select
                            options={options}
                            placeholder="Chọn loại phép trong danh sách..."
                            size={'large'}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text>
                                <Text strong>SỐ NGÀY XIN NGHỈ</Text>
                                <br />
                                <small className="text-muted">(DAY REQUESTED FOR LEAVE)</small>
                            </Text>
                        }
                        name="number"
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
                        name="from"
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
                            showTime
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
                        name="to"
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
                            showTime
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
            <Flex>
                <Button
                    size={'large'}
                    type={'primary'}
                    onClick={() => form.submit()}
                    style={{ margin: 'auto', marginTop: 20 }}
                >
                    Gửi Phép
                </Button>
            </Flex>
        </Content>
    );
};

export default HomePage;
