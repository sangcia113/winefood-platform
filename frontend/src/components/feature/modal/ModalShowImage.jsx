import React from 'react';

import { Avatar, Button, Flex, Image, List, Modal, Space, Typography } from 'antd';
import { ApiFilled, DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

const ModalShowImage = ({ onCancel, open, onClick, dataSource }) => (
    <Modal
        cancelButtonProps={{ style: { borderRadius: 20 } }}
        cancelText="Đóng"
        centered
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={onCancel}
        open={open}
        title={
            <Space direction="vertical" size="large">
                <ApiFilled style={{ color: '#1677ff', fontSize: 60 }} />
                <Text strong style={{ fontSize: 32 }}>
                    Ý KIẾN CỦA BẠN
                </Text>
            </Space>
        }
        width={1200}
        styles={{
            header: { paddingBottom: 20, textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <Flex justify="end">
            <Button icon={<PlusCircleFilled />} onClick={onClick} shape="round" type="primary">
                Hình ảnh
            </Button>
        </Flex>
        <List
            dataSource={dataSource}
            itemLayout="vertical"
            renderItem={item => (
                <List.Item
                    key={item.id}
                    actions={[
                        <Space>
                            <Button
                                icon={<EditFilled />}
                                style={{ backgroundColor: '#faad14', color: 'white' }}
                            >
                                Edit
                            </Button>
                            <Button
                                icon={<DeleteFilled />}
                                style={{
                                    backgroundColor: '#ff4d4f',
                                    color: 'white',
                                }}
                            >
                                Delete
                            </Button>
                        </Space>,
                    ]}
                    extra={
                        <Image
                            src={require('../../../assets/images/logo/logoHeader.png')}
                            width={200}
                        />
                    }
                >
                    {item.note}
                </List.Item>
            )}
            size="large"
        />
    </Modal>
);

export default ModalShowImage;
