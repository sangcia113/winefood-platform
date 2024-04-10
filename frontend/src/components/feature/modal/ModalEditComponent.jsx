import React from 'react';

import { DatePicker, Form, InputNumber, Modal, Select, Space, Typography } from 'antd';
import { SmileFilled } from '@ant-design/icons';

import dayjs from 'dayjs';

const { Item } = Form;
const { Text } = Typography;

const ModalEditComponent = ({ form, leaveType = [], loading, onCancel, open, onFinish }) => {
    return (
        <Modal
            afterClose={() => form.resetFields()}
            cancelButtonProps={{ style: { borderRadius: 20 } }}
            cancelText="Hủy Bỏ"
            centered
            closeIcon={false}
            okButtonProps={{ loading, style: { borderRadius: 20 } }}
            okText="Đồng Ý"
            onCancel={onCancel}
            onOk={() => form.submit()}
            open={open}
            title={
                <Space direction="vertical" size="large">
                    <SmileFilled style={{ color: '#1677ff', fontSize: 60 }} />
                    <Text strong style={{ fontSize: 32 }}>
                        ĐIỀU CHỈNH THỰC TẾ
                    </Text>
                </Space>
            }
            width={480}
            styles={{
                header: { paddingBottom: 20, textAlign: 'center' },
                footer: { paddingTop: 20, textAlign: 'center' },
            }}
        >
            <Form
                colon={false}
                form={form}
                labelAlign={'left'}
                labelCol={{
                    xs: { span: 24 },
                    md: { span: 12 },
                }}
                labelWrap
                wrapperCol={{
                    xs: { span: 24 },
                    md: { span: 12 },
                }}
                onFinish={onFinish}
            >
                <Item
                    label={
                        <Text style={{ fontSize: 18 }}>
                            <Text strong style={{ fontSize: 16 }}>
                                LOẠI PHÉP
                            </Text>
                            <br />
                            <small className="text-muted">TYPES OF LEAVES</small>
                        </Text>
                    }
                    name="actualLeaveTypeId"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa chọn loại phép!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn loại phép trong danh sách..."
                        style={{ width: '100%' }}
                    >
                        {leaveType.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.nameVN}
                            </Select.Option>
                        ))}
                    </Select>
                </Item>
                <Item
                    label={
                        <Text style={{ fontSize: 18 }}>
                            <Text strong style={{ fontSize: 16 }}>
                                SỐ NGÀY XIN NGHỈ
                            </Text>
                            <br />
                            <small className="text-muted">DAY REQUESTED FOR LEAVE</small>
                        </Text>
                    }
                    name="actualLeaveDay"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập số ngày nghỉ!',
                        },
                    ]}
                >
                    <InputNumber
                        className="custom-modal-input"
                        max={100}
                        min={0.25}
                        placeholder="Nhập số ngày xin nghỉ..."
                        step={0.25}
                        style={{ width: '100%' }}
                    />
                </Item>

                <Item
                    label={
                        <Text style={{ fontSize: 18 }}>
                            <Text strong style={{ fontSize: 16 }}>
                                TỪ
                            </Text>
                            <br />
                            <small className="text-muted">FROM</small>
                        </Text>
                    }
                    name="actualFromDate"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa chọn ngày/ giờ bắt đầu!',
                        },
                    ]}
                >
                    <DatePicker
                        allowClear={false}
                        changeOnBlur={true}
                        format={'HH:mm DD/MM/YYYY'}
                        placeholder="Chọn ngày bắt đầu..."
                        showTime={{ defaultValue: dayjs('07:30', 'HH:mm') }}
                        style={{ width: '100%' }}
                    />
                </Item>

                <Item
                    label={
                        <Text style={{ fontSize: 18 }}>
                            <Text strong style={{ fontSize: 16 }}>
                                ĐẾN
                            </Text>
                            <br />
                            <small className="text-muted">TO</small>
                        </Text>
                    }
                    name="actualToDate"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa chọn ngày/ giờ kết thúc!',
                        },
                    ]}
                >
                    <DatePicker
                        allowClear={false}
                        changeOnBlur={true}
                        format={'HH:mm DD/MM/YYYY'}
                        placeholder="Chọn ngày kết thúc..."
                        showTime={{ defaultValue: dayjs('16:30', 'HH:mm') }}
                        style={{ width: '100%' }}
                    />
                </Item>
            </Form>
        </Modal>
    );
};

export default ModalEditComponent;
