import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Image, Layout, Menu, Typography } from 'antd';
import {
    BookFill,
    ChatFill,
    HouseFill,
    KeyFill,
    PeopleFill,
    PersonCheckFill,
    PersonHeart,
    Search,
} from 'react-bootstrap-icons';
const imgSrc = require('../../assets/images/logo.png');
const { Text } = Typography;
const { Header, Content, Footer } = Layout;

const items = [
    { key: '', label: 'Trang chủ', icon: <HouseFill size={20} /> },
    { key: 'password', label: 'Đổi mật khẩu', icon: <KeyFill size={20} /> },
    { key: 'feedback', label: 'Góp ý - Báo lỗi', icon: <ChatFill size={18} /> },
    { key: 'manual', label: 'Hướng dẫn sử dụng', icon: <BookFill size={18} /> },
    { key: 'history', label: 'Lịch sử nghỉ phép', icon: <Search size={18} /> },
    {
        key: '6',
        type: 'group',
        // label: (
        //     <Text strong style={{ color: '#007bff' }}>
        //         Leader
        //     </Text>
        // ),
        children: [
            { key: 'leader', label: 'Duyệt nghỉ phép', icon: <PersonCheckFill size={20} /> },
        ],
    },
    {
        key: '8',
        type: 'group',
        // label: (
        //     <Text strong style={{ color: '#dc3545' }}>
        //         Manager
        //     </Text>
        // ),
        children: [
            { key: 'manager', label: 'Quản lý nghỉ phép', icon: <PersonHeart size={20} /> },
            { key: 'user', label: 'Quản lý nhân viên', icon: <PeopleFill size={20} /> },
        ],
    },
];
const HeaderComponent = () => {
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}
            >
                <Link to="/">
                    <Image alt="Logo WineFood" preview={false} src={imgSrc} width={270} />
                </Link>
                <Menu
                    expandIcon={<HouseFill />}
                    defaultSelectedKeys={['2']}
                    items={items}
                    mode="horizontal"
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                ></Menu>
            </Header>
        </Layout>
    );
};
export default HeaderComponent;

// import { Alert, Col, Image, Row, Typography } from 'antd';

// import React from 'react';

// import { Link } from 'react-router-dom';
// import Marquee from 'react-fast-marquee';
// const { Text } = Typography;
// const imgSrc = require('../../assets/images/logo.png');
// const HeaderComponent = () => (
//     <Row>
//         <Col xs={24} sm={10} md={8} lg={6}>
//             <Link to="/">
//                 <Image alt="Logo WineFood" preview={false} src={imgSrc} width={270} />
//             </Link>
//         </Col>
//         <Col xs={24} sm={14} md={16} lg={18}>
//             <Alert
//                 banner
//                 message={
//                     <Marquee gradient={false} pauseOnHover>
//                         <Text style={{ color: '#007bff' }}>
//                             Nhằm cải thiện{' '}
//                             <b>
//                                 <i>Phần mềm nghỉ phép</i>
//                             </b>{' '}
//                             được tốt hơn. Mong mọi người đóng góp ý kiến vào phần{' '}
//                             <b>
//                                 <i>Góp ý - Báo lỗi (chức năng này nằm trong Menu)</i>
//                             </b>
//                             . Xin cảm ơn.
//                         </Text>
//                     </Marquee>
//                 }
//                 showIcon={false}
//                 type={'info'}
//                 style={{ height: 60, margin: '10px 20px 10px 10px' }}
//             />
//         </Col>
//     </Row>
// );

// export default HeaderComponent;
