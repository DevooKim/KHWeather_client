import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import 'chart.js/auto';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
} from 'chart.js';
import { max, min } from 'lodash';

import WeatherCard from '../WeatherCard/WeatherCard';
import WeatherIcons from '../weathers/WeatherIcons';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    ChartDataLabels,
    ChartDataLabels
);
// ChartJS.register(ChartDataLabels);

const getMinMax = ({ mainTempData, subTempData, rainData }) => {
    const maxTemp = max([...mainTempData, ...subTempData]);
    const minTemp = min([...mainTempData, ...subTempData]);
    const maxRain = max(rainData);

    return {
        maxTemp,
        minTemp,
        maxRain
    };
};

const convertDate = (value) => {
    const newDate = new Date(value);
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const hour = newDate.getHours();
    return hour === 0 ? [`${month}월 ${date}일`, `${hour}시`] : `${hour}시`;
};

const convertData = ({ yesterdays, todays, tomorrows }) => {
    const labels = [...yesterdays, ...todays, ...tomorrows].map((v) => convertDate(v.dt.date));
    const mainTempData = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        ...todays,
        ...tomorrows
    ].map((v) => v?.temp);
    const subTempData = [...yesterdays, ...yesterdays, ...todays].map((v) => v.temp);
    const rainData = [...yesterdays, ...todays, ...tomorrows].map(
        (v) => (v.rain && v.rain['1h']) || (v.snow && v.snow['1h'])
    );
    return { labels, mainTempData, subTempData, rainData };
};

function getGradient(ctx, chartArea) {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'blue');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1, 'red');
    }

    return gradient;
}
const setupData = ({ labels, mainTempData, subTempData, rainData }) => ({
    labels,
    datasets: [
        {
            label: '오늘 날씨',
            data: mainTempData,
            borderColor: 'rgb(255, 99, 132)',
            // borderColor: function (context) {
            //     const chart = context.chart;
            //     const { ctx, chartArea } = chart;

            //     if (!chartArea) {
            //         // This case happens on initial chart load
            //         return;
            //     }
            //     return getGradient(ctx, chartArea);
            // },
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            // pointBorderColor: 'black',
            radius: 0,
            datalabels: {
                // borderRadius: 16,
                // borderWidth: 16,
            },
            // xAxisID: 'xAxisLine',
            yAxisID: 'yAxisLine',
            order: 1
        },
        {
            label: '어제 날씨',
            data: subTempData,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // pointBorderColor: 'black',
            radius: 0,
            datalabels: {
                // clamp: true
                // borderRadius: 16,
                // borderWidth: 16,
            },
            // xAxisID: 'xAxisLine',
            yAxisID: 'yAxisLine',
            order: 2
        },
        {
            type: 'bar',
            label: '강수량',
            data: rainData,
            backgroundColor: 'lightblue',
           
            // xAxisID: 'xAxisBar',
            datalabels: {
                display: (context) => {
                    const index = context.dataIndex;
                    const data = context.dataset?.data;
                    return data[index] > 0;
                },
                backgroundColor: 'transparent',
                borderWidth: 0,
                color: 'black',
                formatter: (value) => value
            },
            yAxisID: 'yAxisBar',
            order: 3
        }
    ]
});

const setupOptions = ({ maxTemp, minTemp, maxRain }) => ({
    responsive: true,
    stacked: false,
    interaction: {
        mode: 'index',
        intersect: false
    },
    plugins: {
        datalabels: {
            backgroundColor: (context) => {
                if (context.active) return '';
                if (context.dataIndex % 8 === 0) return 'black';
                return 'white';
            },
            borderColor: (context) => context.dataset.borderColor,
            borderRadius: 16,
            borderWidth: (context) => (context.active ? 0 : 3),
            color: (context) => (context.dataIndex % 8 === 0 ? 'white' : 'black'),
            font: {
                weight: 'bold'
            },
            offset: 8,
            formatter: (value, context) => (context.active ? '' : value)
        },
        legend: {
            position: 'bottom',
            labels: {
                font: {
                    size: 14,
                    weight: 'bold'
                    // fontColor: globalTheme.secondaryColor
                }
            }
        },
        tooltip: {
            position: 'nearest',
            // backgroundColor: 'white',
            titleFont: { style: 'bold', size: 16 },
            bodyFont: { size: 14 },
            caretSize: 16,
            callbacks: {
                title: (context) => {
                    const label = context[0].label || '';
                    const newLabel = label.replace(/,/g, ' ');
                    return newLabel;
                },
            }
        }
    },
    layout: {
        padding: { top: 85, right: 20, left: 20 }
    },
    scales: {
        x: {
            ticks: {
                autoSkip: false,
                color: 'black',
                font: {
                    size: 14,
                    weight: 'bold'
                }
                // callback: (value, index, ticks) => {
                //     console.log(ticks[0])
                // }
            },
            grid: {
                lineWidth: 2,
                color: 'pink',
                drawBorder: true,
                offset: false
                // drawOnChartArea: false
            }
        },
        yAxisLine: {
            display: false,
            suggestedMin: minTemp - 5,
            suggestedMax: maxTemp + 5
        },
        yAxisBar: {
            display: false,
            // suggestedMin: 0,
            suggestedMax: maxRain * 5
            // beginAtZero: true
        }
    },
    maintainAspectRatio: false
});

const WeatherChart = ({ lastUpdate, yesterdays, todays, tomorrows }) => {
    console.log('chartRender');
    const updateTime = useMemo(() => {
        const date = new Date(lastUpdate);
        return `${date.getDate()}시 ${date.getMinutes()}분`;
    });
    const { labels, mainTempData, subTempData, rainData } = useMemo(
        () => convertData({ yesterdays, todays, tomorrows }),
        []
    );
    const chartData = setupData({ labels, mainTempData, subTempData, rainData });
    const { maxTemp, minTemp, maxRain } = getMinMax({ mainTempData, subTempData, rainData });
    const options = setupOptions({ maxTemp, minTemp, maxRain });

    return (
        <WeatherCard sx={{ overflowX: 'scroll' }}>
            <Box sx={{ width: '90rem', position: 'relative' }}>
                <Box
                    sx={{
                        width: '90rem',
                        position: 'absolute',
                        top: '20px',
                        left: '30px',
                        paddingRight: '60px'
                    }}
                >
                    업데이트: {updateTime}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {yesterdays.map((v) => (
                            <WeatherIcons
                                key={v.dt.date}
                                weatherIcon={v.weather[0].icon}
                                fontSize="40"
                            />
                        ))}
                        {todays.map((v) => (
                            <WeatherIcons
                                key={v.dt.date}
                                weatherIcon={v.weather[0].icon}
                                fontSize="40"
                            />
                        ))}
                        {tomorrows.map((v) => (
                            <WeatherIcons
                                key={v.dt.date}
                                weatherIcon={v.weather[0].icon}
                                fontSize="40"
                            />
                        ))}
                    </Box>
                </Box>
                <Line height={400} options={options} data={chartData} />
            </Box>
        </WeatherCard>
    );
};

export default WeatherChart;
