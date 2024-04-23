import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import {
    Alert,
    Button,
    Dropdown,
    Flex,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Space,
    Table,
} from 'antd';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { PencilFill, ThreeDotsVertical } from 'react-bootstrap-icons';

import {
    ContentComponent,
    FormComponent,
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
} from '../../components';

import { createConnection } from '../../utils';

const { Option } = Select;
const { TextArea } = Input;

const itemsBreadcrumb = [
    { title: <Link to={'/vesinh'}>Home</Link> },
    { title: <Link to={'/vesinh/content'}>Content</Link> },
];

const ContentPage = () => {
    const [loading, setLoading] = useState(false);
    const [classifyList, setClassifyList] = useState([]);
    const [contentList, setContentList] = useState([]);
    const [modalContent, setModalContent] = useState({ open: false, title: '' });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalConfirm, setModalConfirm] = useState({
        onOk: () => {},
        open: false,
        message: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        message: '',
    });

    const [formContent] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        getClassify();
        getContent();
    }, []);

    const getClassify = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get('/environment/classify');

            setClassifyList(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const getContent = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(`/environment/content`);

            setContentList(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertContent = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).post(
                `/environment/content`,
                values
            );

            setModalContent({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getContent();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const updateContent = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).put(
                `/environment/content/${values.id}`,
                values
            );

            setModalContent({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getContent();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const deleteContent = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).delete(
                `/environment/content/${values.id}`
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getContent();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const onFinish = values => {
        values.id ? updateContent(values) : insertContent(values);
    };

    const formFields = [
        {
            label: 'Phân loại',
            name: 'classifyId',
            rules: [{ required: true, message: 'Bạn chưa chọn phân loại' }],
            typeInput: (
                <Select allowClear placeholder="Chọn phân loại" style={{ width: '100%' }}>
                    {classifyList.map(item => (
                        <Option key={item.id} value={item.id}>
                            {item.classifyVN}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'Nội dung (JP)',
            name: 'contentJP',
            rules: [{ required: true, message: 'Bạn chưa nhập nội dung (JP)' }],
            typeInput: (
                <TextArea
                    allowClear
                    maxLength={500}
                    placeholder="Nhập nội dung (JP)"
                    rows={3}
                    showCount
                />
            ),
        },
        {
            label: 'Nội dung (VN)',
            name: 'contentVN',
            rules: [{ required: true, message: 'Bạn chưa nhập nội dung (VN)' }],
            typeInput: (
                <TextArea
                    allowClear
                    maxLength={500}
                    placeholder="Nhập nội dung (VN)"
                    rows={3}
                    showCount
                />
            ),
        },
        {
            label: 'Điểm',
            name: 'point',
            rules: [{ required: true, message: 'Bạn chưa nhập điểm' }],
            typeInput: (
                <InputNumber max={100} min={0} placeholder="Nhập điểm" style={{ width: '100%' }} />
            ),
        },
    ];

    const columnsContent = [
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            fixed: 'left',
            render: (_, record) => (
                <Dropdown
                    arrow={true}
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: 'Sửa',
                                icon: <PencilFill />,
                                onClick: () => {
                                    formContent.setFieldsValue(record);

                                    setModalContent({ open: true, title: 'SỬA NỘI DUNG' });
                                },
                                style: { color: '#faad14' },
                            },
                            {
                                key: '2',
                                label: 'Xoá',
                                icon: <DeleteFilled />,
                                onClick: () =>
                                    setModalConfirm({
                                        onOk: () => deleteContent(record),
                                        open: true,
                                        message: (
                                            <Space direction="vertical" align="center">
                                                Bạn có chắc muốn xóa nội dung?
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
            title: '#',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Phân loại (JP)',
            dataIndex: 'classifyJP',
            key: 'classifyJP',
            ellipsis: true,
        },
        {
            title: 'Phân loại (VN)',
            dataIndex: 'classifyVN',
            key: 'classifyVN',
            ellipsis: true,
        },
        {
            title: 'Nội dung (JP)',
            dataIndex: 'contentJP',
            key: 'contentJP',
            ellipsis: true,
        },
        {
            title: 'Nội dung (VN)',
            dataIndex: 'contentVN',
            key: 'contentVN',
            ellipsis: true,
        },
        {
            title: 'Điểm',
            dataIndex: 'point',
            key: 'point',
            ellipsis: true,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ellipsis: true,
            render: record => dayjs(record).format('HH:mm DD/MM/YYYY'),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
            ellipsis: true,
            render: record => record && dayjs(record).format('HH:mm DD/MM/YYYY'),
        },
    ];

    return (
        <ContentComponent items={itemsBreadcrumb} loading={loading}>
            <Flex vertical gap={'large'}>
                <Flex justify={'end'}>
                    <Button
                        icon={<PlusCircleFilled style={{ fontSize: 22, paddingTop: 3 }} />}
                        onClick={() => setModalContent({ open: true, title: 'THÊM MỚI NỘI DUNG' })}
                        shape={'circle'}
                        type={'primary'}
                    />
                </Flex>
                <Table
                    bordered
                    columns={columnsContent}
                    dataSource={contentList}
                    scroll={{ x: true }}
                    showSorterTooltip={false}
                />
            </Flex>
            <Modal
                afterClose={() => formContent.resetFields()}
                cancelButtonProps={{ style: { borderRadius: 20 } }}
                cancelText="Hủy Bỏ"
                closeIcon={false}
                forceRender
                okButtonProps={{ style: { borderRadius: 20 } }}
                okText="Đồng Ý"
                onCancel={() => setModalContent({ open: false })}
                onOk={() => formContent.submit()}
                open={modalContent.open}
                title={modalContent.title}
                styles={{
                    header: { paddingBottom: 20, textAlign: 'center' },
                    footer: { paddingTop: 20, textAlign: 'center' },
                }}
            >
                <FormComponent form={formContent} formFields={formFields} onFinish={onFinish} />
            </Modal>
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
            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
        </ContentComponent>
    );
};

export default ContentPage;
