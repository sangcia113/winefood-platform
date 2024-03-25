import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneFilled } from '@ant-design/icons';
import { Button, Card, Flex } from 'antd';

const MainPage = () => (
    <Flex
        align="center"
        justify="center"
        style={{ backgroundColor: 'rgb(240, 242, 245)', height: '100vh' }}
    >
        <Card
            actions={[
                <Link onClick={() => window.open('https://zalo.me/0972868740', '_blank')}>
                    Mr.Sang - 0972868740 <PhoneFilled style={{ color: '#f50' }} />
                </Link>,
            ]}
            title={<Flex justify="center">PHẦN MỀM NỘI BỘ</Flex>}
            style={{ width: 300 }}
        >
            <Flex align="center" gap={16} justify="center" vertical>
                <Link to={'/nghiphep'}>
                    <Button style={{ color: '#1d39c4' }}>Xin nghỉ phép</Button>
                </Link>
                <Link to={'https://winefood-sw.com:8080/winefood/login.php'}>
                    <Button style={{ color: '#13c2c2' }}>Chấm điểm vệ sinh</Button>
                </Link>
            </Flex>
        </Card>
    </Flex>
);

export default MainPage;
