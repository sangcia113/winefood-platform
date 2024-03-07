import React from 'react';

import { Button, Form, Input, Modal, Space, Typography, Upload } from 'antd';
import { RobotFilled, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Item } = Form;
const { Text } = Typography;

const ModalFeedback = ({ onClick, loading, open, onFinish }) => (
    <Modal
        centered
        closeIcon={false}
        footer={() => (
            <div>
                <Button onClick={onClick} style={{ borderRadius: 20 }}>
                    Hủy Bỏ
                </Button>
                <Button
                    htmlType="submit"
                    loading={loading}
                    type="primary"
                    style={{ borderRadius: 20 }}
                >
                    Đồng Ý
                </Button>
            </div>
        )}
        open={open}
        title={
            <Space direction="vertical" size="large">
                <RobotFilled style={{ color: '#1677ff', fontSize: 60 }} />
                <Text strong style={{ fontSize: 32 }}>
                    PHẢN HỒI Ý KIẾN
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
            labelAlign={'left'}
            labelCol={{
                xs: { span: 24 },
                md: { span: 8 },
            }}
            labelWrap
            wrapperCol={{
                xs: { span: 24 },
                md: { span: 16 },
            }}
            onFinish={onFinish}
        >
            <Item
                label={
                    <Text style={{ fontSize: 18 }}>
                        <Text strong style={{ fontSize: 16 }}>
                            Ý KIẾN CỦA BẠN
                        </Text>
                        <br />
                        <small className="text-muted">Your Feedback</small>
                    </Text>
                }
                name="feedback"
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
                    <Text style={{ fontSize: 18 }}>
                        <Text strong style={{ fontSize: 16 }}>
                            FILES ĐÍNH KÈM
                        </Text>
                        <br />
                        <small className="text-muted">Attached Files</small>
                    </Text>
                }
                name="fileList"
            >
                <Upload accept="image/png, image/jpeg" beforeUpload={true} multiple>
                    <Button icon={<UploadOutlined />} style={{ border: 0 }}>
                        Upload
                    </Button>
                </Upload>
            </Item>
        </Form>
    </Modal>
);

export default ModalFeedback;
