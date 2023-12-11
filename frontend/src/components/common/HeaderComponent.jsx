import { Alert, Col, Image, Row, Typography } from 'antd';

import React from 'react';

import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
const { Text } = Typography;
const imgSrc = require('../../assets/images/logo.png');
const HeaderComponent = () => (
    <Row>
        <Col xs={24} sm={10} md={8} lg={6}>
            <Link to="/">
                <Image alt="Logo WineFood" preview={false} src={imgSrc} width={270} />
            </Link>
        </Col>
        <Col xs={24} sm={14} md={16} lg={18}>
            <Alert
                banner
                message={
                    <Marquee gradient={false} pauseOnHover>
                        <Text style={{ color: '#007bff' }}>
                            Nhằm cải thiện{' '}
                            <b>
                                <i>Phần mềm nghỉ phép</i>
                            </b>{' '}
                            được tốt hơn. Mong mọi người đóng góp ý kiến vào phần{' '}
                            <b>
                                <i>Góp ý - Báo lỗi (chức năng này nằm trong Menu)</i>
                            </b>
                            . Xin cảm ơn.
                        </Text>
                    </Marquee>
                }
                showIcon={false}
                type={'info'}
                style={{ height: 60, margin: '10px 20px 10px 10px' }}
            />
        </Col>
    </Row>
);

export default HeaderComponent;
