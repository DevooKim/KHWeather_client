import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { WiThunderstorm } from 'react-icons/wi';

import { ResponsiveLine } from '@nivo/line';
import { maxBy, minBy, max, min } from 'lodash';

import WeatherCard from '../WeatherCard/WeatherCard';
import WeatherIcons from '../weathers/WeatherIcons';

const getMinMax = ({ yesterdays, todays, tomorrows }) => {
    const yesterdayMin = minBy(yesterdays, (v) => v.temp);
    const todayMin = minBy(todays, (v) => v.temp);
    const tomorrowMin = minBy(tomorrows, (v) => v.temp);
    const yesterdayMax = maxBy(yesterdays, (v) => v.temp);
    const todayMax = maxBy(todays, (v) => v.temp);
    const tomorrowMax = maxBy(tomorrows, (v) => v.temp);

    return {
        max: max([yesterdayMax.temp, todayMax.temp, tomorrowMax.temp]),
        min: min([yesterdayMin.temp, todayMin.temp, tomorrowMin.temp])
    };
};

const formingDate = (value) => {
    const newDate = new Date(value);

    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const hour = newDate.getHours();
    return { month, date, hour };
};

const setData = (data, useOffset = false) => {
    const chartData = [];
    for (let i = 0; i < data.length; i += 1) {
        const newDate = new Date(data[i].dt.date);
        if (useOffset) {
            newDate.setDate(newDate.getDate() + 1);
        }
        chartData.push({
            x: newDate.toISOString(),
            y: data[i].temp,
            icon: data[i].weather[0].icon
        });
    }
    return chartData;
};

const formingData = ({ yesterdays, todays, tomorrows }) => {
    const mainTodayData = setData(todays);
    const mainTomorrowData = setData(tomorrows);
    const subYesterdayData1 = setData(yesterdays);
    const subYesterdayData2 = setData(yesterdays, true);
    const subTodayData = setData(todays, true);
    return [
        { id: '어제 날씨', data: [...subYesterdayData1, ...subYesterdayData2, ...subTodayData] },
        { id: '오늘 날씨', data: [...mainTodayData, ...mainTomorrowData] }
    ];
};

const WeatherChart = ({ yesterdays, todays, tomorrows }) => {
    const data = useMemo(() => formingData({ yesterdays, todays, tomorrows }), []);
    const minMax = useMemo(() => getMinMax({ yesterdays, todays, tomorrows }), []);
    return (
        <WeatherCard sx={{ overflowX: 'scroll' }}>
            <Box sx={{ height: '25rem', width: '100rem', position: 'relative' }}> 
                <Box
                    sx={{
                        width: 'calc(100rem - 52px)',
                        position: 'absolute',
                        top: '15px',
                        marginLeft: '40px'
                    }}
                >
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
                <ResponsiveLine
                    theme={{
                        fontSize: 14,
                        axis: {
                            ticks: {
                                text: {
                                    fontSize: 16,
                                    fill: '#333333'
                                }
                            }
                        },
                        legends: {
                            text: {
                                fontSize: 16,
                                fill: '#333333'
                            }
                        },
                        crosshair: {
                            line: {
                                stroke: 'pink',
                                strokeWidth: 4,
                                strokeOpacity: 1
                            }
                        }
                    }}
                    data={data}
                    margin={{ top: 60, right: 30, bottom: 70, left: 60 }}
                    yScale={{
                        type: 'linear',
                        min: minMax.min - 3, // sm: 5
                        max: minMax.max + 3 // sm: 5
                    }}
                    curve="cardinal"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        format: (value) => {
                            const { month, date, hour } = formingDate(value);
                            return hour === 0 ? `${month}월 ${date}일 ${hour}시` : `${hour}시`;
                        },
                        orient: 'bottom',
                        tickSize: 15,
                        tickPadding: 5,
                        tickRotation: 0,
                        legendOffset: 0,
                        legendPosition: 'middle'
                    }}
                    axisLeft={null}
                    enableGridX={true}
                    enableGridY={false}
                    lineWidth={4}
                    pointSize={28}
                    pointColor="#75ff1a"
                    pointBorderWidth={4}
                    pointBorderColor={{ from: 'serieColor' }}
                    enablePointLabel={true}
                    pointLabelYOffset={5}
                    enableSlices="x"
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 100,
                            translateY: 65,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 100,
                            itemHeight: 10,
                            itemOpacity: 0.75,
                            symbolSize: 20,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    motionConfig="molasses"
                />
            </Box>
        </WeatherCard>
    );
};

export default WeatherChart;
