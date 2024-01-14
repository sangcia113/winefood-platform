import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { Button, DatePicker, Flex, Form, Input, InputNumber, Select, Spin, Typography } from 'antd';

import {
    ContentComponent,
    ModalErrorComponent,
    ModalErrorOtherComponent,
    ModalSuccessComponent,
    ModalWarningComponent,
} from '../components';

const { TextArea } = Input;
const { Text } = Typography;

const URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
    console.log('Run Home...');

    const [leaveType, setLeaveType] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalError, setModalError] = useState({
        error: '',
        open: false,
    });

    const [modalErrorOther, setModalErrorOther] = useState({
        message: '',
        open: false,
        title: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        message: '',
        open: false,
    });

    const [modalWarning, setModalWarning] = useState({
        message: '',
        open: false,
    });

    const [form] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getLeaveType();
    }, []);

    const getLeaveType = async () => {
        try {
            const response = await axios.get(`${URL}/api/leave/type`, {
                headers: {
                    Authorization: accessToken,
                },
            });

            setLeaveType(response.data);
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const insertData = async values => {
        try {
            setLoading(true);

            const response = await axios.post(`${URL}/api/leave/list`, values, {
                headers: {
                    Authorization: accessToken,
                },
            });

            form.resetFields();

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
            const errorCode = error?.response?.data?.error;

            if (errorCode === -904) {
                setModalErrorOther({
                    open: true,
                    title: 'THẤT BẠI',
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
                });
            } else if (errorCode === -230) {
                setModalErrorOther({
                    open: true,
                    title: 'THẤT BẠI',
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
                });
            } else {
                setModalError({ open: true, error });
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinish = values => {
        const { fromDate, toDate } = values;

        if (fromDate <= toDate) {
            if (
                dayjs(fromDate).hour() >= 7 &&
                dayjs(fromDate).minute() >= 30 &&
                dayjs(toDate).hour() <= 16 &&
                dayjs(toDate).minute() <= 30
            ) {
                insertData({
                    ...values,
                    fromDate: dayjs(fromDate).format('YYYY-MM-DD HH:mm'),
                    toDate: dayjs(toDate).format('YYYY-MM-DD HH:mm'),
                    leaveType: leaveType.find(lt => lt.id === values.leaveTypeId)?.nameVN,
                });
            } else {
                setModalWarning({
                    message: (
                        <Text style={{ textAlign: 'center' }}>
                            Giờ bắt đầu & kết thúc phải
                            <br />
                            nằm trong khoảng từ
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
        <ContentComponent loading={loading}>
            <Form
                colon={false}
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
                {/* <Form.Item
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
                                        u.id !== 1 &&
                                        u.departmentId === d.id && (
                                            <Select.Option key={u.id} value={u.id}>
                                                {u.name}
                                            </Select.Option>
                                        )
                                )}
                            </Select.OptGroup>
                        ))}
                    </Select>
                </Form.Item> */}

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
            <Flex justify="center" style={{ margin: '30px 0 24px 0' }}>
                <Button size={'large'} type={'primary'} onClick={() => form.submit()}>
                    Gửi Phép
                </Button>
            </Flex>
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
            <ModalWarningComponent
                onOk={() => setModalWarning({ open: false })}
                open={modalWarning.open}
                message={modalWarning.message}
            />
        </ContentComponent>
    );
};

export default HomePage;
