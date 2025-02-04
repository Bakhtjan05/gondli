'use client';
import React, { useState } from 'react';
import './ChartDiagram.scss';
import { useTranslations } from 'next-intl';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import Image from 'next/image';

type StatisticChartProps = {
    data: {
        date: string | null;
        value: number;
    }[];
    views: number;
    sales: number;
    orders: number;
    conversionRate: number;
};

const ChartDiagram: React.FC = () => {
    const t = useTranslations();
    const chartData: StatisticChartProps = {
        data: [
            { date: `may 04, 2024`, value: 186 },
            { date: null, value: 267 },
            { date: null, value: 302 },
            { date: null, value: 153 },
            { date: null, value: 324 },
            { date: null, value: 210 },
            { date: null, value: 141 },
            { date: null, value: 369 },
            { date: null, value: 251 },
            { date: null, value: 285 },
            { date: null, value: 325 },
            { date: null, value: 199 },
            { date: null, value: 310 },
            { date: null, value: 357 },
            { date: null, value: 137 },
            { date: null, value: 190 },
            { date: null, value: 269 },
            { date: null, value: 276 },
            { date: null, value: 323 },
            { date: null, value: 148 },
            { date: null, value: 211 },
            { date: null, value: 341 },
            { date: null, value: 220 },
            { date: null, value: 189 },
            { date: null, value: 334 },
            { date: null, value: 362 },
            { date: null, value: 267 },
            { date: null, value: 151 },
            { date: null, value: 205 },
            { date: null, value: 288 },
            { date: null, value: 312 },
            { date: `june 04, 2024`, value: 248 },
        ],
        views: 30126,
        sales: 80126,
        orders: 697,
        conversionRate: 91.1,
    };
    const chartConfig: ChartConfig = {
        week: {
            label: t('dashboard-yourStatistics-week'),
            color: '#2563eb',
        },
        month: {
            label: t('dashboard-yourStatistics-month'),
            color: '#124C59',
        },
        quarter: {
            label: t('dashboard-yourStatistics-quarter'),
            color: '#fff',
        },
        year: {
            label: t('dashboard-yourStatistics-year'),
            color: '#000',
        },
    };

    const [view, setView] = useState<number>(1);
    const [accordion, setAccordion] = useState<boolean>(false);
    const filters = [
        t('dashboard-yourStatistics-month'),
        t('dashboard-yourStatistics-week'),
        t('dashboard-yourStatistics-quarter'),
        t('dashboard-yourStatistics-year'),
    ];
    const [filter, setFilter] = useState<number>(0); // filter dropdown

    const getMax = () => {
        let max = 0;

        chartData.data.forEach((item) => {
            if (item.value > max) max = item.value;
        });

        return max;
    };

    const formatY = () => {
        const tickArr: number[] = [];
        const maxVal = getMax();
        if (maxVal / 100 < 1) {
            tickArr.push(0);
            tickArr.push(100);
        } else {
            for (let index = 0; index < maxVal / 100 + 1; index++) {
                tickArr.push(100 * index);
            }
        }
        return tickArr;
    };

    return (
        <React.Fragment>
            <div className='yourStatistics'>
                <div className='header'>
                    <div className='btns'>
                        <button onClick={() => setView(1)}>
                            <div className='btn_content'>
                                <span className='btn_content_value max-lg:!text-sm'>
                                    {chartData.sales.toLocaleString()}
                                </span>
                                <span className='btn_content_title flex items-center'>
                                    {`Net Sales`}
                                    <Image className='lg:hidden' src={"/images/icons/chevron-up.svg"} alt='' width={16} height={16} />

                                </span>
                            </div>
                            {view === 1 ? <div className='gradientBorder max-lg:hidden'></div> : null}
                        </button>
                        <button className='max-lg:!hidden' onClick={() => setView(2)}>
                            <div className='btn_content'>
                                <span className='btn_content_value'>
                                    {chartData.sales.toLocaleString()} CHF
                                </span>
                                <span className='btn_content_title'>
                                    {`Gross Profit`}
                                </span>
                            </div>
                            {view === 2 ? <div className='gradientBorder'></div> : null}
                        </button>
                        <button className='max-lg:!hidden' onClick={() => setView(3)}>
                            <div className='btn_content'>
                                <span className='btn_content_value'>
                                    {chartData.orders.toLocaleString()}
                                </span>
                                <span className='btn_content_title'>
                                    {`Gross Margin`}
                                </span>
                            </div>
                            {view === 3 ? <div className='gradientBorder'></div> : null}
                        </button>
                    </div>

                    <div className='dropdown'>
                        <button
                            className='accordion max-lg:!p-3'
                            onClick={() => setAccordion(!accordion)}
                        >
                            {filters[filter]}
                            {accordion ? (
                                <Image
                                    className='chevron_up'
                                    priority
                                    src={`/images/services/dropdown.svg`}
                                    width={8}
                                    height={5}
                                    alt={`dropdown`}
                                />
                            ) : (
                                <Image
                                    className='chevron'
                                    priority
                                    src={`/images/services/dropdown.svg`}
                                    width={8}
                                    height={5}
                                    alt={`dropdown`}
                                />
                            )}
                        </button>
                        <div
                            className={accordion ? 'accordion_list' : 'accordion_list_hidden'}
                        >
                            {filters.map(
                                (item, index) =>
                                    index !== 0 && <button key={index}>{item}</button>,
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-full overflow-x-auto overflow-y-hidden'>
                    <ChartContainer config={chartConfig} className='chart'>
                        <AreaChart
                            data={chartData.data}
                            className="area-chart"
                        >
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2E5761" stopOpacity={1} />
                                    <stop offset="33%" stopColor="#254E58" stopOpacity={1} />
                                    <stop offset="66%" stopColor="#174049" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#0D363F" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} stroke="#124C59" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={16}
                                axisLine={false}
                                className="x-axis x-block"
                                interval="preserveStartEnd"
                                tick={{ fill: "#fff", fontWeight: 500, fontSize: "14px" }}
                            />
                            <YAxis
                                dataKey="value"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                type="number"
                                ticks={formatY()}
                                domain={[0, getMax() / 100 + 1]}
                                className="y-axis"
                                tick={{ fill: "#A9E2EF", fontWeight: 100, fontSize: "14px" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#FFFFFF"
                                strokeWidth={2}
                                fill="url(#colorGradient)"
                                dot={false}
                                fillOpacity={1}
                            />
                        </AreaChart>
                    </ChartContainer>
                </div>

            </div>
        </React.Fragment>
    );
};

export default ChartDiagram;
