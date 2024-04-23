import React from 'react';

import { Avatar, Button, List, Modal, Space } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

const ModalShowImage = ({ onCancel, open }) => (
    <Modal
        cancelButtonProps={{ style: { borderRadius: 20 } }}
        cancelText="Đóng"
        centered
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={onCancel}
        open={open}
        title="HÌNH ẢNH"
        width={1200}
        styles={{
            header: { paddingBottom: 20, textAlign: 'center' },
            footer: { paddingTop: 20, textAlign: 'center' },
        }}
    >
        <List
            dataSource={Array.from({
                length: 23,
            }).map((_, i) => ({
                href: 'https://ant.design',
                title: `ant design part ${i}`,
                avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
                content: 'We supply a series of design princi and efficiently.',
            }))}
            itemLayout="vertical"
            renderItem={item => (
                <List.Item
                    key={item.title}
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
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                    />
                    {item.content}
                </List.Item>
            )}
            size="large"
        ></List>
    </Modal>
);

export default ModalShowImage;
