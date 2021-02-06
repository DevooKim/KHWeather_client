import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import getDate from "../../utils/getDate";
import getHourIndex from "../../utils/getHourIndex";
import WeatherIcons from "../weathers/WeatherIcons";
import { IconContext } from "react-icons";
import { Box, Paper } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { ChartTheme } from "../../App";

let globalTheme = undefined;

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
        backgroundColor: globalTheme.line.today,
        borderColor: globalTheme.line.today,
        pointStyle: "circle",
        yAxisID: "y-axis-1",
      },
      {
        label: "어제 날씨",
        data: temps.prev,
        fill: false,
        backgroundColor: fade(globalTheme.line.yesterday, 0.4),
        borderColor: fade(globalTheme.line.yesterday, 0.8),
        pointStyle: "circle",
        yAxisID: "y-axis-1",
        datalabels: {
          backgroundColor: (context) => {
            if (context.active && context.dataIndex < 8) return "rgba(0,0,0,0)";
            if (context.active) return globalTheme.primaryColor;

            if (context.dataIndex === now) return globalTheme.now;
            else if (context.dataIndex % 8 === 0)
              // return "rgba(54, 162, 235,0.8)";
              return fade(globalTheme.line.yesterday, 0.8);

            // return globalTheme.primaryColor;
            return "white";
          },
          borderColor: (context) => {
            if (context.active && context.dataIndex < 8) return "rgba(0,0,0,0)";

            // return "rgba(54, 162, 235, 0.3)";
            return fade(globalTheme.line.yesterday, 0.8);
          },
          color: (context) => {
            if (context.active && context.dataIndex < 8) return "rgba(0,0,0,0)";
            if (context.active) return globalTheme.secondaryColor; //"rgba(0,0,0,0.7)";
            if (context.dataIndex === now) return globalTheme.primaryColor;

            // return fade(globalTheme.secondaryColor, 0.7); //"rgba(0,0,0,0.7)";
            return fade("#000000", 0.7); //"rgba(0,0,0,0.7)";
          },
        },
      },
      {
        type: "bar",
        label: "강수량",
        data: precipitation,
        backgroundColor: globalTheme.line.precipitation,
        borderColor: globalTheme.line.precipitation,
        datalabels: {
          align: "end",
          anchor: "end",
          // offset: 30,
          borderWidth: 1,
          borderRadius: 0,
          backgroundColor: globalTheme.line.precipitation,
          color: fade(globalTheme.secondaryColor, 0.8), //"rgba(0,0,0,0.8)",
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
      if (context.active) return globalTheme.primaryColor;
      if (context.dataIndex === now) return globalTheme.now;
      else if (context.dataIndex % 8 === 0)
        return "context.dataset.backgroundColor";

      // return "context.dataset.backgroundColor";
      // return globalTheme.primaryColor;
      return "white";
    },
    borderColor: (context) => {
      return context.dataset.backgroundColor;
    },
    borderRadius: (context) => {
      return context.active ? 0 : 16;
    },
    borderWidth: 3,
    color: (context) => {
      if (context.active) return globalTheme.secondaryColor;
      if (context.dataIndex % 8 === 0 || context.dataIndex === now)
        return "white";
      // if (context.dataIndex === now) return globalTheme.primaryColor; //"white";

      // return globalTheme.secondaryColor;
      return "black";
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
        fontColor: globalTheme.secondaryColor,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: false,
            // fontColor: globalTheme.secondaryColor,
            fontColor: "black",
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
            color: fade(globalTheme.secondaryColor, 0.8), //"rgba(1,1,1,0.5)",
            zeroLineColor: fade(globalTheme.secondaryColor, 0.8), //"rgba(1,1,1,0.5)",
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
          zeroLineColor: fade(globalTheme.secondaryColor, 0.25), //"rgba(0, 0, 0, 0.25)",
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
    tooltips: { enabled: false },
  };
};

const useStyles = makeStyles((theme) => ({
  chartWrapper: {
    position: "relative",
    overflowX: "auto",
    overflowY: "hidden",
    backgroundColor: theme.colors.chart.bg,
    borderRadius: 8,
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
    backgroundColor: theme.colors.chart.bg,
  },
}));

function Chart({ forecasts }) {
  const classes = useStyles();
  globalTheme = useContext(ChartTheme);
  const { yesterdays, todays, tomorrows, lastUpdate } = forecasts;
  const hour = getDate(lastUpdate, "HOURS"); //서버에서 처리
  const min = getDate(lastUpdate, "MINUTES"); //서버에서 처리
  const currentIndex = getHourIndex(hour, min, true) + 8;

  const labels = [...yesterdays.dt, ...todays.dt, ...tomorrows.dt]; //부모에서 처리
  const temps = setTemp(yesterdays.temp, todays.temp, tomorrows.temp); //부모에서 처리
  const data = setData(currentIndex, labels, temps, [
    ...yesterdays.rain,
    ...todays.rain,
    ...tomorrows.rain, //rain 부모에서 처리
  ]);
  const labelsOption = setLabelesOption(currentIndex);
  const options = setOptions(labelsOption);
  return (
    <>
      <Paper className={classes.chartWrapper} elevation={5}>
        {/* <div className={classes.chartWrapper}> */}
        <Box className={classes.lastUpdate} component="span">
          {`업데이트: ${getDate(lastUpdate, "HOURS")}시${getDate(
            lastUpdate,
            "MINUTES"
          )}분`}
        </Box>
        <Box className={classes.chartAreaWrapper}>
          <div className={classes.chartIcons}>
            <IconContext.Provider
              value={{ size: "2.5rem", color: globalTheme.icon }}
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
          </div>
          <Line data={data} options={options} key={lastUpdate} />
        </Box>
        {/* </div> */}
      </Paper>
    </>
  );
}

// export default React.memo(Chart);
export default Chart;
