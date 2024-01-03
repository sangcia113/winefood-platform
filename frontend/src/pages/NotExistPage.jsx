import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

const NotExistPage = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi! Trang mà bạn đang truy cập không tồn tại!"
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    Trang chủ
                </Button>
            }
        />
    );
};
export default NotExistPage;
