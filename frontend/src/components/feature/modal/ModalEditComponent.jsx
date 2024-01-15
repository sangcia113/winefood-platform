import { SmileFilled } from '@ant-design/icons';
import {
    Checkbox,
    DatePicker,
    Flex,
    Form,
    InputNumber,
    Modal,
    Select,
    Space,
    Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const { Text } = Typography;

const ModalEditComponent = ({
    afterClose,
    form,
    leaveType = [],
    onCancel,
    onOk,
    open,
    onFinish,
}) => {
    const [checkbox, setCheckBox] = useState({ checkboxLeaveDay: true, checkboxLeaveType: false });

    console.log(checkbox);
    return (
        <Modal
            afterClose={afterClose}
            cancelButtonProps={{ style: { borderRadius: 20 } }}
            cancelText="Hủy Bỏ"
            centered
            closeIcon={false}
            okButtonProps={{ style: { borderRadius: 20 } }}
            okText="Đồng Ý"
            onCancel={onCancel}
            onOk={onOk}
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
            <Flex align="center" justify="center" gap={32} style={{ marginBottom: 24 }}>
                <Checkbox
                    name="checkboxLeaveType"
                    onChange={() =>
                        setCheckBox(prevState => ({
                            checkboxLeaveType: !prevState.checkboxLeaveType,
                        }))
                    }
                >
                    Loại phép
                </Checkbox>
                <Checkbox
                    name="checkboxLeaveDay"
                    onChange={() =>
                        setCheckBox(prevState => ({
                            checkboxLeaveDay: !prevState.checkboxLeaveDay,
                        }))
                    }
                >
                    Số ngày nghỉ
                </Checkbox>
            </Flex>
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
                <div style={{ display: checkbox.checkboxLeaveType === false && 'none' }}>
                    <Form.Item
                        label={
                            <Text style={{ fontSize: 16 }}>
                                <Text strong style={{ fontSize: 16 }}>
                                    LOẠI PHÉP
                                </Text>
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
                            style={{ width: '100%' }}
                        >
                            {leaveType.map(item => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.nameVN}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <div style={{ display: checkbox.checkboxLeaveDay === false && 'none' }}>
                    <Form.Item
                        label={
                            <Text style={{ fontSize: 16 }}>
                                <Text strong style={{ fontSize: 16 }}>
                                    SỐ NGÀY XIN NGHỈ
                                </Text>
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
                    >
                        <InputNumber
                            max={100}
                            min={0.25}
                            placeholder="Nhập số ngày xin nghỉ..."
                            step={0.25}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text style={{ fontSize: 16 }}>
                                <Text strong style={{ fontSize: 16 }}>
                                    TỪ
                                </Text>
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
                    >
                        <DatePicker
                            allowClear={false}
                            changeOnBlur={true}
                            format={'HH:mm DD/MM/YYYY'}
                            placeholder="Chọn ngày bắt đầu..."
                            showTime={{ defaultValue: dayjs('07:30', 'HH:mm') }}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text style={{ fontSize: 16 }}>
                                <Text strong style={{ fontSize: 16 }}>
                                    ĐẾN
                                </Text>
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
                    >
                        <DatePicker
                            allowClear={false}
                            changeOnBlur={true}
                            format={'HH:mm DD/MM/YYYY'}
                            placeholder="Chọn ngày kết thúc..."
                            showTime={{ defaultValue: dayjs('16:30', 'HH:mm') }}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalEditComponent;
