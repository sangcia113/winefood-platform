import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

import { DatePicker, Flex, Table, Typography } from 'antd';

import { EnvironmentContentComponent, ModalErrorComponent } from '../../components';

import { createConnection } from '../../utils';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Text } = Typography;

const itemsBreadcrumb = [{ title: <Link to={'/vesinh'}>Home</Link> }];

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [accumulator, setAccumulator] = useState([]);
    const [detailAccumulator, setDetailAccumulator] = useState([]);
    const [filterAccumulator, setFilterAccumulator] = useState({
        startMonth: dayjs().month() + 1 <= 6 ? 1 : 7,
        startYear: dayjs().year(),
        toMonth: dayjs().month() + 1 <= 6 ? 6 : 12,
        toYear: dayjs().year(),
    });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const colors = ['#1677ff', '#f5222d', '#faad14', '#389e0d'];

    const columns = [
        {
            key: 'month',
            dataIndex: 'month',
            title: (
                <>
                    月<br />
                    Tháng
                </>
            ),
            align: 'center',
            render: record => <Text strong>{record}</Text>,
        },
        {
            title: (
                <>
                    部門
                    <br />
                    Bộ phận
                </>
            ),
            children: [
                {
                    title: (
                        <>
                            事務所
                            <br />
                            OFFICE
                        </>
                    ),
                    ellipsis: true,
                    children: [
                        {
                            key: 'office',
                            dataIndex: 'office',
                            title: (
                                <>
                                    得点
                                    <br />
                                    Số điểm đạt
                                </>
                            ),
                            ellipsis: true,
                            align: 'center',
                        },
                        {
                            title: (
                                <>
                                    累計
                                    <br />
                                    Lũy kế
                                </>
                            ),
                            ellipsis: true,
                            align: 'center',
                            render: (_, record, index) => {
                                const sum = detailAccumulator
                                    .slice(0, index + 1)
                                    .reduce((acc, curr) => acc + parseInt(curr.office), 0);
                                return index === detailAccumulator.length - 1 ? (
                                    <Text strong type="danger">
                                        {sum}
                                    </Text>
                                ) : (
                                    sum
                                );
                            },
                        },
                    ],
                },
                {
                    title: (
                        <>
                            白酒チーム
                            <br />
                            SHIROZAKE
                        </>
                    ),
                    ellipsis: true,
                    children: [
                        {
                            key: 'shirozake',
                            dataIndex: 'shirozake',
                            title: (
                                <>
                                    得点
                                    <br />
                                    Số điểm đạt
                                </>
                            ),
                            ellipsis: true,
                            align: 'center',
                        },
                        {
                            title: (
                                <>
                                    累計
                                    <br />
                                    Lũy kế
                                </>
                            ),
                            ellipsis: true,
                            align: 'center',
                            render: (_, record, index) => {
                                const sum = detailAccumulator
                                    .slice(0, index + 1)
                                    .reduce((acc, curr) => acc + parseInt(curr.shirozake), 0);
                                return index === detailAccumulator.length - 1 ? (
                                    <Text strong type="danger">
                                        {sum}
                                    </Text>
                                ) : (
                                    sum
                                );
                            },
                        },
                    ],
                },
                {
                    title: (
                        <>
                            ボトリングチーム
                            <br />
                            BOTTLING
                        </>
                    ),
                    ellipsis: true,
                    children: [
                        {
                            key: 'bottling',
                            dataIndex: 'bottling',
                            title: (
                                <>
                                    得点
                                    <br />
                                    Số điểm đạt
                                </>
                            ),
                            ellipsis: true,
                            align: 'center',
                        },
                        {
                            title: (
                                <>
                                    累計
                                    <br />
                                    Lũy kế
                                </>
                            ),
                            ellipsis: true,
                            align: 'center',
                            render: (_, record, index) => {
                                const sum = detailAccumulator
                                    .slice(0, index + 1)
                                    .reduce((acc, curr) => acc + parseInt(curr.bottling), 0);
                                return index === detailAccumulator.length - 1 ? (
                                    <Text strong type="danger">
                                        {sum}
                                    </Text>
                                ) : (
                                    sum
                                );
                            },
                        },
                    ],
                },
                {
                    title: (
                        <>
                            精米/メンテナンス
                            <br />
                            TOYO/KỸ THUẬT
                        </>
                    ),
                    ellipsis: true,
                    children: [
                        {
                            key: 'toyo',
                            dataIndex: 'toyo',
                            title: (
                                <>
                                    得点
                                    <br />
                                    Số điểm đạt
                                </>
                            ),
                            ellipsis: true,
                            align: 'center',
                        },
                        {
                            title: (
                                <>
                                    累計
                                    <br />
                                    Lũy kế
                                </>
                            ),
                            ellipsis: true,
                            align: 'center',
                            render: (_, record, index) => {
                                const sum = detailAccumulator
                                    .slice(0, index + 1)
                                    .reduce((acc, curr) => acc + parseInt(curr.toyo), 0);
                                return index === detailAccumulator.length - 1 ? (
                                    <Text strong type="danger">
                                        {sum}
                                    </Text>
                                ) : (
                                    sum
                                );
                            },
                        },
                    ],
                },
            ],
        },
    ];

    const getAccumulator = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(
                `/environment/evaluate/accumulator?startMonth=${filterAccumulator.startMonth}&startYear=${filterAccumulator.startYear}&toMonth=${filterAccumulator.toMonth}&toYear=${filterAccumulator.toYear}`
            );

            setAccumulator(response.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    const getDetailAccumulator = async () => {
        try {
            setLoading(true);

            const response = await createConnection(accessToken).get(
                `/environment/evaluate/accumulator/detail?startMonth=${filterAccumulator.startMonth}&startYear=${filterAccumulator.startYear}&toMonth=${filterAccumulator.toMonth}&toYear=${filterAccumulator.toYear}`
            );

            setDetailAccumulator(response.data.map(item => ({ ...item, key: item.month })));
        } catch (error) {
            setModalError({ error, open: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAccumulator();
        getDetailAccumulator();
    }, [filterAccumulator]);

    return (
        <EnvironmentContentComponent items={itemsBreadcrumb} loading={loading}>
            <Flex align="center" justify="end" style={{ margin: '20px 0 30px 0' }}>
                <RangePicker
                    allowClear={false}
                    defaultValue={() => {
                        // Nếu tháng hiện tại nhỏ hơn hoặc bằng 6
                        if (filterAccumulator.startMonth <= 6)
                            return [
                                dayjs().set('month', 0).set('year', filterAccumulator.startYear),
                                dayjs().set('month', 5).set('year', filterAccumulator.startYear),
                            ];

                        // Nếu tháng hiện tại lớn hơn 6
                        return [
                            dayjs().set('month', 6).set('year', filterAccumulator.startYear),
                            dayjs().set('month', 11).set('year', filterAccumulator.startYear),
                        ];
                    }}
                    format="MM/YYYY"
                    onCalendarChange={dates => {
                        const [startDate, endDate] = dates || [];

                        setFilterAccumulator({
                            startMonth: dayjs(startDate).format('MM'),
                            startYear: dayjs(startDate).format('YYYY'),
                            toMonth: dayjs(endDate).format('MM'),
                            toYear: dayjs(endDate).format('YYYY'),
                        });
                    }}
                    picker="month"
                />
            </Flex>
            <div style={{ textAlign: 'center' }}>
                <Text strong style={{ fontSize: 30 }}>
                    LŨY KẾ ĐIỂM VỆ SINH MÔI TRƯỜNG CỦA CÁC TỔ
                    <br />
                    TỪ {filterAccumulator.startMonth}/{filterAccumulator.startYear} ĐẾN{' '}
                    {filterAccumulator.toMonth}/{filterAccumulator.toYear}
                </Text>
            </div>
            <div style={{ margin: 'auto', marginBottom: 50, maxWidth: 800 }}>
                <ReactApexChart
                    options={{
                        dataLabels: {
                            style: {
                                fontSize: '16px',
                                fontWeight: 'normal',
                            },
                        },
                        plotOptions: {
                            bar: {
                                // columnWidth: 100,
                            },
                        },
                        xaxis: {
                            labels: {
                                style: {
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                },
                            },
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    fontSize: '16px',
                                },
                            },
                            title: {
                                text: 'Accumulated of Department',
                                style: {
                                    fontSize: '18px',
                                },
                            },
                        },
                    }}
                    series={[
                        {
                            name: '',
                            data: accumulator.map((item, index) => ({
                                x: item.departmentVN,
                                y: item.accumulator,
                                fillColor: colors[index],
                            })),
                        },
                    ]}
                    type="bar"
                    height={400}
                />
            </div>
            <div style={{ marginBottom: 20, textAlign: 'center' }}>
                <Text strong style={{ fontSize: 30, textWrap: 'wrap' }}>
                    BẢNG ĐÁNH GIÁ VỆ SINH CHUNG
                    <br />
                    TỪ {filterAccumulator.startMonth}/{filterAccumulator.startYear} ĐẾN{' '}
                    {filterAccumulator.toMonth}/{filterAccumulator.toYear}
                </Text>
            </div>
            <Table
                bordered
                className="table-detail-accumulator"
                columns={columns}
                dataSource={detailAccumulator}
                pagination={false}
                scroll={{ x: true }}
                showSorterTooltip={false}
            />
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />
        </EnvironmentContentComponent>
    );
};

export default HomePage;
