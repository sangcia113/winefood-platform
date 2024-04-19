import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

import { Flex, Typography } from 'antd';

import { ContentComponent } from '../../components';

const { Text, Title } = Typography;

const itemsBreadcrumb = [
    { title: <Link to={'/vesinh'}>Home</Link> },
    { title: <Link to={'/vesinh/admin'}>Admin</Link> },
];

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [summaryData, setSummaryData] = useState([]);

    return (
        <ContentComponent items={itemsBreadcrumb} loading={loading}>
            <Flex align="center" justify="center">
                <Text strong style={{ fontSize: 30, textAlign: 'center' }}>
                    LŨY KẾ ĐIỂM VỆ SINH MÔI TRƯỜNG CỦA CÁC TỔ
                    <br />
                    THÁNG 04 - 2024
                </Text>
            </Flex>
            <ReactApexChart
                options={{
                    chart: {
                        type: 'bar',
                        // stacked: Xác định xem các loại dữ liệu có được xếp chồng lên nhau không.
                        stacked: false,
                        height: 500,
                        zoom: {
                            type: 'x',
                            enabled: true,
                            autoScaleYaxis: true,
                        },
                        toolbar: {
                            autoSelected: 'zoom',
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    // markers: Cấu hình cho đánh dấu trên biểu đồ.
                    markers: {
                        size: 0,
                    },
                    title: {
                        text: 'Thống Kê Tổng Số Ngày Nghỉ Của Nhân Viên',
                        align: 'center',
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            inverseColors: false,
                            opacityFrom: 0.5,
                            opacityTo: 0,
                            stops: [0, 90, 100],
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Số ngày nghỉ',
                        },
                    },
                    tooltip: {
                        shared: false,
                        y: { formatter: total => `${total} (ngày)` },
                    },
                }}
                series={[
                    {
                        name: 'Tổng số ngày nghỉ: ',
                        data: summaryData.map(item => ({
                            x: item.name,
                            y: item.totalLeave,
                        })),
                    },
                ]}
                type="area"
                height={700}
            />
        </ContentComponent>
    );
};

export default HomePage;
