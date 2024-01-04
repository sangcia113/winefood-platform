import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

const NotAuthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403 Forbidden"
            subTitle="Tài khoản của bạn không có quyền truy cập vào trang này"
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    Trang chủ
                </Button>
            }
        />
    );
};
export default NotAuthorizedPage;
