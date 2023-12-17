import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';

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

export { confirmNotification, failureNotification, successNotification };
