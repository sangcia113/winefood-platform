import React from 'react';

import { Form, Input } from 'antd';

const { Item } = Form;

const FormComponent = ({ form, onFinish, formFields }) => {
    return (
        <Form form={form} labelCol={{ span: 8 }} onFinish={onFinish} wrapperCol={{ span: 16 }}>
            <Item name="id" hidden>
                <Input />
            </Item>
            {formFields.map(({ label, name, rules, typeInput }, index) => (
                <Item key={index} label={label} name={name} rules={rules}>
                    {typeInput}
                </Item>
            ))}
        </Form>
    );
};

export default FormComponent;
