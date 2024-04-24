import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

import { Card, Flex, Table, Typography } from 'antd';

import { EnvironmentContentComponent, ModalErrorComponent } from '../../components';

import { createConnection } from '../../utils';

const { Text } = Typography;

const itemsBreadcrumb = [{ title: <Link to={'/vesinh'}>Home</Link> }];

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [accumulator, setAccumulator] = useState([]);
    const [detailAccumulator, setDetailAccumulator] = useState([]);

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
                `/environment/evaluate/accumulator`
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
                `/environment/evaluate/accumulator/detail`
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
    }, []);

    return (
        <EnvironmentContentComponent items={itemsBreadcrumb} loading={loading}>
            <div style={{ marginBottom: 50, textAlign: 'center' }}>
                <Text strong style={{ fontSize: 30, textAlign: 'center' }}>
                    LŨY KẾ ĐIỂM VỆ SINH MÔI TRƯỜNG CỦA CÁC TỔ NĂM 2024
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
                                columnWidth: 100,
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

            <Card
                title={
                    <Text strong style={{ fontSize: 30, textAlign: 'center' }}>
                        BẢNG ĐÁNH GIÁ VỆ SINH CHUNG 6 THÁNG ĐẦU NĂM 2024
                    </Text>
                }
            >
                <Table
                    bordered
                    columns={columns}
                    dataSource={detailAccumulator}
                    pagination={false}
                    scroll={{ x: true }}
                    showSorterTooltip={false}
                />
            </Card>
            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />
        </EnvironmentContentComponent>
    );
};

export default HomePage;
