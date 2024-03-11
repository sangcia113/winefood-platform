import { PhoneFilled } from '@ant-design/icons';
import { Button, Card, Flex, Space } from 'antd';
import { Link } from 'react-router-dom';

const MainPage = () => (
    <Flex
        align="center"
        justify="center"
        style={{ backgroundColor: 'rgb(240, 242, 245)', height: '100vh' }}
    >
        <Card
            actions={[
                <Link onClick={() => window.open('https://zalo.me/0972868740', '_blank')}>
                    <PhoneFilled style={{ color: '#f50' }} /> Mr.Sang - 0972868740
                </Link>,
            ]}
        >
            <Space align="center" direction="vertical">
                <Link to={'/nghiphep'}>
                    <Button type="primary">Phần mềm nghỉ phép</Button>
                </Link>
                <Link to={'/vesinh'}>
                    <Button type="primary">Phần mềm chấm điểm vệ sinh</Button>
                </Link>
            </Space>
        </Card>
    </Flex>
);

export default MainPage;
