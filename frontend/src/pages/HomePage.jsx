import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Button, DatePicker, Flex, Form, Input, InputNumber, Select, Typography } from 'antd';

import {
    ContentComponent,
    ModalErrorComponent,
    ModalErrorOtherComponent,
    ModalSuccessComponent,
    ModalWarningComponent,
} from '../components';

import { createConnection } from '../utils';

const { TextArea } = Input;
const { Text } = Typography;

const HomePage = () => {
    console.log('Run Home...');

    const [loading, setLoading] = useState(false);

    const [leaveType, setLeaveType] = useState([]);

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
            const response = await createConnection(accessToken).get(`/leave/type`);

            setLeaveType(response.data);
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const insertData = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).post(`/leave/list`, values);

            form.resetFields();

            setModalSuccess({
                message: (
                    <Text style={{ textAlign: 'center' }}>
                        Đã gửi yêu cầu lên cấp trên
                        <br />
                        <b>{response.data.receiver}</b>
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
                            Vui lòng liên hệ với <b>cấp trên</b> để được
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
        const { bookFromDate, bookToDate } = values;

        if (bookFromDate <= bookToDate) {
            if (
                dayjs(bookFromDate).hour() >= 7 &&
                dayjs(bookFromDate).minute() >= 30 &&
                dayjs(bookToDate).hour() <= 16 &&
                dayjs(bookToDate).minute() <= 30
            ) {
                insertData({
                    ...values,
                    bookLeaveType: leaveType.find(l => l.id === values.bookLeaveTypeId)?.nameVN,
                    bookFromDate: dayjs(bookFromDate).format('YYYY-MM-DD HH:mm'),
                    bookToDate: dayjs(bookToDate).format('YYYY-MM-DD HH:mm'),
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
                                {dayjs(bookFromDate).format('HH:mm')}
                            </Text>
                            <br />
                            Giờ kết thúc của bạn là:{' '}
                            <Text strong type="danger">
                                {dayjs(bookToDate).format('HH:mm')}
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

    const itemsBreadcrumb = [
        {
            title: <Link to="/">Home</Link>,
        },
    ];

    return (
        <ContentComponent loading={loading} items={itemsBreadcrumb}>
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
                    name="bookLeaveTypeId"
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
                    name="bookLeaveDay"
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
                    name="bookFromDate"
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
                        format={'HH:mm DD/MM/YYYY'}
                        inputReadOnly
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
                    name="bookToDate"
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
                        format={'HH:mm DD/MM/YYYY'}
                        inputReadOnly
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
                <Button onClick={() => form.submit()} size={'large'} type={'primary'}>
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
