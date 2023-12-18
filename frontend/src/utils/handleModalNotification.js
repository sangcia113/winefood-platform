import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Alert, Form, Input, Modal, Space, Typography } from 'antd';

const { Text } = Typography;

const confirmNotification = (content, onOk) =>
    Modal.confirm({
        centered: true,
        content,
        icon: <QuestionCircleOutlined style={{ color: '#1677ff' }} />,
        onOk: () => onOk(),
        title: <Text style={{ fontSize: 18 }}>VUI LÒNG XÁC NHẬN!</Text>,
    });

const failureNotification = content =>
    Modal.error({
        centered: true,
        content: <Text style={{ fontSize: 16 }}>{content}</Text>,
        title: <Text style={{ fontSize: 18 }}>THẤT BẠI!</Text>,
    });

const successNotification = content =>
    Modal.success({
        centered: true,
        content: <Text style={{ fontSize: 16 }}>{content}</Text>,
        title: <Text style={{ fontSize: 18 }}>THÀNH CÔNG!</Text>,
    });

const warningApprovalNotification = (mode, onOk, open) => (
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        onOk={onOk}
        open={open}
        title={
            <Space direction={'vertical'} size={'middle'}>
                <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 60 }} />
                <Text style={{ fontSize: 26 }}>
                    {mode === 1 ? 'KHÔNG THỂ PHÊ DUYỆT' : mode === 2 ? 'KHÔNG THỂ TỪ CHỐI' : ''}
                </Text>
            </Space>
        }
        width={400}
        styles={{ header: { textAlign: 'center' }, footer: { textAlign: 'center' } }}
    >
        <Alert
            message={
                <>
                    - <b>Bạn đã ký duyệt</b> yêu cầu nghỉ phép này.
                </>
            }
            type={'error'}
        />
    </Modal>
);

const warningNotApprovalNotification = (onOk, open) => (
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        onOk={onOk}
        open={open}
        title={
            <Space direction={'vertical'} size={'middle'}>
                <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 60 }} />
                <Text style={{ fontSize: 26 }}>KHÔNG THỂ TỪ CHỐI</Text>
            </Space>
        }
        width={400}
        styles={{ header: { textAlign: 'center' }, footer: { textAlign: 'center' } }}
    >
        <Alert
            message={
                <>
                    - <b>Bạn đã từ chối</b> yêu cầu nghỉ phép này.
                </>
            }
            type={'error'}
        />
    </Modal>
);

const confirmNotApprovalNotification = (form, onFinish) => {
    Modal.warning({
        centered: true,
        content: (
            <Form form={form} onFinish={onFinish}>
                <Form.Item name={'reason'} rules={[{ required: true, message: 'Please input' }]}>
                    <Input.TextArea rows={3} />
                </Form.Item>
            </Form>
        ),
    });
};

export {
    confirmNotApprovalNotification,
    confirmNotification,
    failureNotification,
    successNotification,
    warningApprovalNotification,
    warningNotApprovalNotification,
};
