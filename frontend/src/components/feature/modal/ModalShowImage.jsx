import React, { useEffect, useState } from 'react';

import { Alert, Button, Dropdown, Form, Image, Modal, Space, Table, Typography } from 'antd';
import { ApiFilled, DeleteFilled, FileAddFilled } from '@ant-design/icons';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

import { ModalAddImage, ModalConfirmComponent, ModalErrorComponent } from '../../';

import { createConnection } from '../../../utils';

const { Text } = Typography;

const ModalShowImage = ({ departmentId, onCancel, open }) => {
    const [loading, setLoading] = useState(false);
    const [noteList, setNoteList] = useState([]);
    const [modalAddImage, setModalAddImage] = useState(false);

    const [modalConfirm, setModalConfirm] = useState({
        onOk: () => {},
        open: false,
        message: '',
    });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [formAddImage] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const getNote = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(
                `/environment/note/${departmentId}`
            );

            setNoteList(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertNote = async ({ note, fileList }) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append('note', note);
            fileList.fileList.forEach(file => {
                formData.append('fileList', file.originFileObj);
            });

            await createConnection(accessToken).post(
                `/environment/note/${departmentId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setModalAddImage(false);

            getNote();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const deleteNote = async values => {
        try {
            await createConnection(accessToken).delete(`/environment/note/${values.id}`);

            setModalConfirm({ open: false });

            getNote();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNote();
    }, []);

    return (
        <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
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
            <Space align="end" direction="vertical" size="large">
                <Button
                    icon={<FileAddFilled />}
                    onClick={() => setModalAddImage(true)}
                    shape="round"
                    type="primary"
                >
                    Files
                </Button>
                <Table
                    columns={[
                        {
                            key: '',
                            dataIndex: '',
                            title: '',
                            width: '10%',
                            fixed: 'left',
                            render: (_, record) => (
                                <Dropdown
                                    arrow={true}
                                    menu={{
                                        items: [
                                            {
                                                key: '2',
                                                label: 'Xoá',
                                                icon: <DeleteFilled />,
                                                onClick: () =>
                                                    setModalConfirm({
                                                        onOk: () => deleteNote(record),
                                                        open: true,
                                                        message: (
                                                            <Space
                                                                direction="vertical"
                                                                align="center"
                                                            >
                                                                Bạn có chắc muốn xóa ghi chú?
                                                                <b>{record.name}</b>
                                                                khỏi CSDL không?
                                                                <Alert
                                                                    message="Thao tác này không thể hoàn tác!"
                                                                    type="danger"
                                                                    style={{
                                                                        backgroundColor: '#ff4d4f',
                                                                        color: 'white',
                                                                    }}
                                                                />
                                                            </Space>
                                                        ),
                                                    }),
                                                style: { color: '#ff4d4f' },
                                            },
                                        ],
                                    }}
                                    placement={'bottomLeft'}
                                >
                                    <ThreeDotsVertical />
                                </Dropdown>
                            ),
                        },
                        {
                            key: 'note',
                            dataIndex: 'note',
                            title: 'Ghi chú',
                            width: '40%',
                        },
                        {
                            key: 'fileName',
                            dataIndex: 'fileName',
                            title: 'Hình ảnh',
                            ellipsis: true,
                            render: record => (
                                <Image
                                    src="https://api.winefood-sw.com/src/assets/manual-correct.png"
                                    // src={`https://api.winefood-sw.com/src/assets/environment/${item.userId}/${item.fileName}`}
                                />
                            ),
                        },
                    ]}
                    dataSource={noteList}
                />
            </Space>
            <ModalAddImage
                loading={loading}
                onCancel={() => setModalAddImage(false)}
                open={modalAddImage}
                form={formAddImage}
                onFinish={values => insertNote(values)}
            />
            <ModalConfirmComponent
                onCancel={() => setModalConfirm({ open: false })}
                onOk={modalConfirm.onOk}
                open={modalConfirm.open}
                message={modalConfirm.message}
            />
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />
        </Modal>
    );
};

export default ModalShowImage;
