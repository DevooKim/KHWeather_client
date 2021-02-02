import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import getDate from "../../utils/getDate";
import getHourIndex from "../../utils/getHourIndex";
import WeatherIcons from "../weathers/WeatherIcons";
import { IconContext } from "react-icons";
import { Box, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { light } from "../../Theme";

let globalTheme = light;

function setTemp(yesterday, today, tomorrows) {
  const current = [...yesterday, ...today, ...tomorrows];
  const prev = [...yesterday, ...yesterday, ...today];
  return { current, prev };
}

const setData = (now, labels, temps, precipitation) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "오늘 날씨",
        data: temps.current,
        fill: false,
        backgroundColor: globalTheme.chartColor.today,
        borderColor: globalTheme.chartColor.today,
        pointStyle: "circle",
        yAxisID: "y-axis-1",
      },
      {
        label: "어제 날씨",
        data: temps.prev,
        fill: false,
        backgroundColor: globalTheme.chartColor.yesterday.line,
        borderColor: globalTheme.chartColor.yesterday.line,
        pointStyle: "circle",
        yAxisID: "y-axis-1",
        datalabels: {
          backgroundColor: (context) => {
            if (context.active && context.dataIndex < 8) return "rgba(0,0,0,0)";
            if (context.active) return globalTheme.chartColor.pointColor;

            if (context.dataIndex === now) return globalTheme.chartColor.now;
            else if (context.dataIndex % 8 === 0)
              // return "rgba(54, 162, 235,0.8)";
              return globalTheme.chartColor.yesterday.bg;

            return globalTheme.chartColor.pointColor;
          },
          borderColor: (context) => {
            if (context.active && context.dataIndex < 8) return "rgba(0,0,0,0)";

            // return "rgba(54, 162, 235, 0.3)";
            return globalTheme.chartColor.yesterday.line;
          },
          color: (context) => {
            if (context.active && context.dataIndex < 8) return "rgba(0,0,0,0)";
            if (context.active) return globalTheme.chartColor.color; //"rgba(0,0,0,0.7)";
            if (context.dataIndex === now)
              return globalTheme.chartColor.pointColor;

            return globalTheme.chartColor.halfBlack; //"rgba(0,0,0,0.7)";
          },
        },
      },
      {
        type: "bar",
        label: "강수량",
        data: precipitation,
        backgroundColor: globalTheme.chartColor.precipitation,
        borderColor: globalTheme.chartColor.precipitation,
        datalabels: {
          align: "end",
          anchor: "end",
          // offset: 30,
          borderWidth: 1,
          borderRadius: 0,
          backgroundColor: globalTheme.chartColor.precipitation,
          color: globalTheme.chartColor.halfBlack, //"rgba(0,0,0,0.8)",
          formatter: (value) => {
            return value;
          },
        },
        yAxisID: "y-axis-2",
      },
    ],
  };
};

const setLabelesOption = (now) => {
  return {
    align: (context) => {
      if (context.active) {
        const index = context.dataIndex;
        const datasets = context.chart.data.datasets;
        const v0 = datasets[0].data[index];
        const v1 = datasets[1].data[index];
        const invert = v0 - v1 > 0;
        return context.datasetIndex === 0
          ? invert
            ? "end"
            : "start"
          : invert
          ? "start"
          : "end";
      }
      return "center";
    },
    backgroundColor: (context) => {
      if (context.active) return globalTheme.chartColor.pointColor;
      if (context.dataIndex === now) return globalTheme.chartColor.now;
      else if (context.dataIndex % 8 === 0)
        return "context.dataset.backgroundColor";

      // return "context.dataset.backgroundColor";
      return globalTheme.chartColor.pointColor;
    },
    borderColor: (context) => {
      return context.dataset.backgroundColor;
    },
    borderRadius: (context) => {
      return context.active ? 0 : 16;
    },
    borderWidth: 3,
    color: (context) => {
      if (context.active) return globalTheme.chartColor.color;
      if (context.dataIndex % 8 === 0) return globalTheme.chartColor.pointColor; //"white";
      if (context.dataIndex === now) return globalTheme.chartColor.pointColor; //"white";

      return globalTheme.chartColor.color;
    },
    font: {
      weight: "bold",
    },
    padding: 3,
    offset: 8,
    textAlign: "center",
    formatter: (value, context) => {
      value = Math.round(value);
      return context.active
        ? context.dataset.label + "\n" + value + "℃"
        : Math.round(value);
    },
    listeners: {
      click: (context) => {
        console.log("click: " + context.dataIndex);
        // return <div>test</div>;
        return;
      },
    },
  };
};

const setOptions = (labeles) => {
  return {
    plugins: {
      datalabels: labeles,
    },
    legend: {
      labels: {
        fontSize: 12,
        fontStyle: "bold",
        fontColor: globalTheme.chartColor.halfBlack,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: false,
            fontColor: globalTheme.chartColor.color,
            fontSize: 14,
            fontStyle: "bold",
            minRotation: 0,
            maxRotation: 0,
            padding: 10,
            callback: (value, index) => {
              if (index % 8 === 0) return value;
              return value[1];
            },
          },
          lineWidth: 10,
          gridLines: {
            display: true,
            zeroLineWidth: 2,
            lineWidth: 2,
            color: globalTheme.chartColor.halfBlack, //"rgba(1,1,1,0.5)",
            zeroLineColor: globalTheme.chartColor.halfBlack, //"rgba(1,1,1,0.5)",
          },
        },
      ],
      yAxes: [
        {
          id: "y-axis-1",
          display: false,
          ticks: {
            suggestedMin: -20,
            suggestedMax: 40,
            stepSize: 1,
          },
          zeroLineColor: globalTheme.chartColor.color, //"rgba(0, 0, 0, 0.25)",
          zeroLineWidth: 1,
        },
        {
          id: "y-axis-2",
          display: false,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 50,
            // stepSize: 0.1,
          },
        },
      ],
    },
    layout: {
      padding: {
        top: 16,
        bottom: 16,
        left: 16,
        right: 16,
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    // responsive: false,
    maintainAspectRatio: false,
    tooltip: { enable: false },
  };
};

const useStyles = makeStyles((theme) => ({
  chartWrapper: {
    position: "relative",
    overflowX: "auto",
    overflowY: "hidden",
    backgroundColor: "#f5f5f5",
  },
  lastUpdate: {
    marginLeft: theme.spacing(3),
    fontSize: "0.8rem",
    fontWeight: 700,
  },
  chartAreaWrapper: {
    position: "relative",
    width: "1300px",
    height: "350px",
  },
  chartIcons: {
    display: "flex",
    position: "absolute",
    justifyContent: "space-between",
    top: "40px",
    bottom: 0,
    left: 0,
    right: 0,
    height: "min-content",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    backgroundColor: "#f5f5f5",
  },
}));

function Chart({ forecasts }) {
  const classes = useStyles();
  const { yesterdays, todays, tomorrows, lastUpdate } = forecasts;
  const hour = getDate(lastUpdate, "HOURS");
  const min = getDate(lastUpdate, "MINUTES");
  const currentIndex = getHourIndex(hour, min, true) + 8;

  const labels = [...yesterdays.dt, ...todays.dt, ...tomorrows.dt];
  const temps = setTemp(yesterdays.temp, todays.temp, tomorrows.temp);
  const data = setData(currentIndex, labels, temps, [
    ...yesterdays.rain,
    ...todays.rain,
    ...tomorrows.rain,
  ]);
  const labelsOption = setLabelesOption(currentIndex);
  const options = setOptions(labelsOption);
  return (
    <>
      {/* <ChartWrapper className="chartWrapper"> */}
      <Paper className={classes.chartWrapper} elevation={5}>
        <Box className={classes.lastUpdate} component="span">
          {`업데이트: ${getDate(lastUpdate, "HOURS")}시${getDate(
            lastUpdate,
            "MINUTES"
          )}분`}
        </Box>
        <Box className={classes.chartAreaWrapper}>
          <div className={classes.chartIcons}>
            <IconContext.Provider
              value={{ size: "2.5rem", color: globalTheme.colors.icon }}
            >
              {yesterdays.weather.map((weather) => (
                <WeatherIcons weatherIcon={weather.icon} key={weather.key} />
              ))}
              {todays.weather.map((weather) => (
                <WeatherIcons weatherIcon={weather.icon} key={weather.key} />
              ))}
              {tomorrows.weather.map((weather) => (
                <WeatherIcons weatherIcon={weather.icon} key={weather.key} />
              ))}
            </IconContext.Provider>
            {/* </div> */}
          </div>
          <Line data={data} options={options} key={lastUpdate} />
        </Box>
      </Paper>
    </>
  );
}

export default Chart;
