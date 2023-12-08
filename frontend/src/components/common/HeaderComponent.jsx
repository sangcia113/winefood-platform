import { Alert, Typography } from 'antd';

import React from 'react';
import Marquee from 'react-fast-marquee';
const { Text } = Typography;
const HeaderComponent = () => (
    <Alert
        banner
        message={
            <Marquee gradient={false} pauseOnHover>
                <Text style={{ color: '#007bff' }}>
                    {' '}
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
        style={{ height: 50 }}
    />
);

export default HeaderComponent;
