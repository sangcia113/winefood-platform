import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Alert, Button, Dropdown, Flex, Form, Modal, Select, Space, Table } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons';

import {
    ContentComponent,
    FormComponent,
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
} from '../../components';

import { createConnection } from '../../utils';

const { Option } = Select;

const itemsBreadcrumb = [
    { title: <Link to={'/vesinh'}>Home</Link> },
    { title: <Link to={'/vesinh/evaluate'}>Evaluate</Link> },
];

const EvaluateContentPage = () => {
    const [loading, setLoading] = useState(false);
    const [contentList, setContentList] = useState([]);
    const [contentDepartmentList, setContentDepartmentList] = useState([]);
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
        getContent();
        getContentDepartment();
    }, []);

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

    const getContentDepartment = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(
                `/environment/content-department`
            );

            setContentDepartmentList(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const insertContentDepartment = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).post(
                `/environment/content-department`,
                values
            );

            setModalContent({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getContentDepartment();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const deleteContentDepartment = async values => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).delete(
                `/environment/content-department/${values.id}`
            );

            setModalConfirm({ open: false });

            setModalSuccess({
                message: response.data.message,
                open: true,
            });

            getContentDepartment();
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const onFinish = values => insertContentDepartment(values);

    const formFields = [
        {
            label: 'Bộ phận (VN)',
            name: 'departments',
            rules: [{ required: true, message: 'Bạn chưa chọn bộ phận' }],
            typeInput: (
                <Select allowClear mode="multiple" placeholder="Chọn bộ phận">
                    <Option value="1">OFFICE</Option>
                    <Option value="2">BOTTLING</Option>
                    <Option value="3">SHIROZAKE</Option>
                    <Option value="4">TOYO</Option>
                </Select>
            ),
        },
        {
            label: 'Nội dung (VN)',
            name: 'contentId',
            rules: [{ required: true, message: 'Bạn chưa nhập nội dung (VN)' }],
            typeInput: (
                <Select allowClear placeholder="Chọn nội dung">
                    {contentList.map(item => (
                        <Option key={item.id} value={item.id}>
                            {item.contentVN}
                        </Option>
                    ))}
                </Select>
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
                                key: '2',
                                label: 'Xoá',
                                icon: <DeleteFilled />,
                                onClick: () =>
                                    setModalConfirm({
                                        onOk: () => deleteContentDepartment(record),
                                        open: true,
                                        message: (
                                            <Space direction="vertical" align="center">
                                                Bạn có chắc muốn xóa nội dung đánh giá?
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
            title: 'Bộ phận (VN)',
            dataIndex: 'departmentVN',
            key: 'departmentVN',
            ellipsis: true,
        },
        {
            title: 'Nội dung (VN)',
            dataIndex: 'contentVN',
            key: 'contentVN',
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
                        icon={<PlusCircleFill style={{ fontSize: 22, paddingTop: 3 }} />}
                        onClick={() =>
                            setModalContent({ open: true, title: 'THÊM MỚI NỘI DUNG ĐÁNH GIÁ' })
                        }
                        shape={'circle'}
                        type={'primary'}
                    />
                </Flex>
                <Table
                    bordered
                    columns={columnsContent}
                    dataSource={contentDepartmentList}
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

export default EvaluateContentPage;
