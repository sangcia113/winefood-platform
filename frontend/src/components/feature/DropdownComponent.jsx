// Import React và hooks từ thư viện React
import React from 'react';

// Import các component cụ thể từ thư viện antd
import { Dropdown, Input, Modal, Typography } from 'antd';

// Import các biểu tượng cụ thể từ thư viện ant-design/icons
import { ExclamationCircleOutlined, QuestionCircleOutlined, StopFilled } from '@ant-design/icons';

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
                    key: '1',
                    label: 'Phê duyệt',
                    icon: <PencilFill />,
                    onClick: () =>
                        Modal.confirm({
                            centered: true,
                            content: (
                                <Text style={{ fontSize: 16 }}>
                                    Bạn có chắc duyệt yêu cầu nghỉ phép của<br></br>
                                    <b>{name}</b>
                                </Text>
                            ),
                            icon: <QuestionCircleOutlined style={{ color: '#4096ff' }} />,
                            onOk: actionApprove,
                            title: <Text style={{ fontSize: 18 }}>VUI LÒNG XÁC NHẬN</Text>,
                        }),
                    style: { color: '#28a745' },
                },
                {
                    key: '2',
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
