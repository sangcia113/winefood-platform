import React from 'react';

import { Form, Input } from 'antd';

const FormComponent = ({ form, onFinish, formFields }) => {
    return (
        <Form
            form={form}
            labelCol={{ span: 10 }}
            onFinish={onFinish}
            wrapperCol={{ span: 14 }}
            // layout='vertical'
        >
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            {formFields.map(({ label, name, rules, typeInput }, index) => (
                <Form.Item key={index} label={label} name={name} rules={rules}>
                    {typeInput}
                </Form.Item>
            ))}
        </Form>
    );
};

export default FormComponent;
