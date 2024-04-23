import React from 'react';

import { Button, Form, Input, Modal, Space, Typography, Upload } from 'antd';
import { FileAddFilled, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Item } = Form;
const { Text } = Typography;

const ModalAddImage = ({ loading, onCancel, open, form, onFinish }) => (
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
                <FileAddFilled style={{ color: '#1677ff', fontSize: 60 }} />
                <Text strong style={{ fontSize: 32 }}>
                    THÊM HÌNH ẢNH
                </Text>
            </Space>
        }
        width={480}
        styles={{
            header: { paddingBottom: 20, textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Form colon={false} form={form} labelAlign={'left'} layout="vertical" onFinish={onFinish}>
            <Item
                label={
                    <Text strong style={{ fontSize: 18 }}>
                        Ý KIẾN CỦA BẠN
                    </Text>
                }
                name="note"
                rules={[
                    {
                        required: true,
                        message: 'Bạn chưa nhập ý kiến của mình!',
                    },
                ]}
            >
                <TextArea placeholder="Nhập ý kiến của bạn" rows={3} />
            </Item>

            <Item
                label={
                    <Text strong style={{ fontSize: 18 }}>
                        FILES ĐÍNH KÈM
                    </Text>
                }
                name="fileList"
                rules={[
                    {
                        required: true,
                        message: 'Bạn chưa nhập chọn file đính kèm!',
                    },
                ]}
                // valuePropName="fileList"
            >
                <Upload accept=".png, .jpg, .jpeg, .mp4" beforeUpload={true} multiple>
                    <Button icon={<UploadOutlined />} type="primary" style={{ border: 0 }}>
                        Upload
                    </Button>
                </Upload>
            </Item>
        </Form>
    </Modal>
);

export default ModalAddImage;
