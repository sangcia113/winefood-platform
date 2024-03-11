import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

const NotAuthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403 Forbidden"
            subTitle={
                <>
                    Sorry, you are not authorized to access this page
                    <br />
                    Xin lỗi, tài khoản của bạn không có quyền truy cập vào trang này
                </>
            }
            extra={
                <Button type="primary" onClick={() => navigate('/nghiphep')}>
                    Trang chủ
                </Button>
            }
        />
    );
};
export default NotAuthorizedPage;
