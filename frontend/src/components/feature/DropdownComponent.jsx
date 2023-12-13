// Import React và hooks từ thư viện React
import React from 'react';

// Import các component cụ thể từ thư viện antd
import { Dropdown, Input, Modal, Typography } from 'antd';

// Import các biểu tượng cụ thể từ thư viện ant-design/icons
import {
    ExclamationCircleOutlined,
    QuestionCircleOutlined,
    StopFilled,
    StopOutlined,
} from '@ant-design/icons';

// Import các biểu tượng cụ thể từ thư viện react-bootstrap-icons
import {
    HandThumbsDownFill,
    HandThumbsUpFill,
    PencilFill,
    ThreeDotsVertical,
} from 'react-bootstrap-icons';

// Destructuring component Text từ Typography
const { Text } = Typography;

const { TextArea } = Input;

const DropdownComponent = ({ actionApprove, actionReject, name }) => (
    <Dropdown
        arrow={true}
        menu={{
            items: [
                {
                    key: '2',
                    label: 'Ký duyệt',
                    icon: <PencilFill />,
                    onClick: () =>
                        Modal.confirm({
                            cancelText: (
                                <Text style={{ color: '#dc3545' }}>
                                    <HandThumbsDownFill /> Hủy Bỏ
                                </Text>
                            ),
                            centered: true,
                            className: 'custom-modal',
                            content: (
                                <Text>
                                    Bạn có chắc duyệt yêu cầu nghỉ phép của<br></br>
                                    <b>{name}</b>
                                </Text>
                            ),
                            icon: <QuestionCircleOutlined style={{ color: '#4096ff' }} />,
                            okText: (
                                <Text style={{ color: 'white' }}>
                                    <HandThumbsUpFill /> Đồng Ý
                                </Text>
                            ),
                            okType: 'primary',
                            onOk: actionApprove,
                            title: 'VUI LÒNG XÁC NHẬN',
                        }),
                    style: { color: '#28a745' },
                },
                {
                    key: '3',
                    label: 'Từ chối',
                    icon: <StopFilled />,
                    onClick: () =>
                        Modal.confirm({
                            cancelText: (
                                <Text style={{ color: '#dc3545' }}>
                                    <HandThumbsDownFill /> Hủy Bỏ
                                </Text>
                            ),
                            centered: true,
                            className: 'custom-modal',
                            content: <TextArea placeholder="Lý do từ chối yêu cầu này?" rows={5} />,
                            icon: <ExclamationCircleOutlined style={{ color: '#4096ff' }} />,
                            okText: (
                                <Text style={{ color: 'white' }}>
                                    <HandThumbsUpFill /> Đồng Ý
                                </Text>
                            ),
                            onOk: actionReject,
                            title: 'VUI LÒNG NHẬP LÝ DO',
                        }),
                    style: { color: '#dc3545' },
                },
            ],
        }}
        placement={'bottomLeft'}
    >
        <ThreeDotsVertical />
    </Dropdown>
);

export default DropdownComponent;
