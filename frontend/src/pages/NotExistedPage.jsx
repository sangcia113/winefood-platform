import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

const NotExistedPage = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404 Not Found"
            subTitle="Trang mà bạn đang truy cập không tồn tại"
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    Trang chủ
                </Button>
            }
        />
    );
};
export default NotExistedPage;
