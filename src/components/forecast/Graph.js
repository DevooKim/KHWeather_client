import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./chart.css";
import getDate from "../../utils/getDate";

function setLabels(dt1, dt2, dt3) {
  return [...dt1, ...dt2, ...dt3];
}

function setTemp(yesterday, today, tomorrows) {
  const current = [...yesterday, ...today, ...tomorrows];
  const prev = [...yesterday, ...yesterday, ...today];
  return [current, prev];
}
function setData(labels, prev, current) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "오늘 날씨",
        data: current,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132)",
        hoverBorderColor: "rgba(255, 99, 132)",
        pointStyle: "circle",
        pointBorderWidth: 10,
        hoverBorderWidth: 20,
        yAxisID: "y-axis-1",
      },
      {
        label: "어제 날씨",
        data: prev,
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderColor: "rgba(54, 162, 235, 0.3)",
        hoverBorderColor: "rgba(54, 162, 235, 0.3)",
        pointStyle: "circle",
        pointBorderWidth: 10,
        hoverBorderWidth: 20,
        yAxisID: "y-axis-1",
      },
    ],
  };

  return data;
}

const labeles = {
  backgroundColor: function (context) {
    if (context.dataIndex % 8 === 0) return "white";
    return context.dataset.backgroundColor;
  },
  borderColor: function (context) {
    return context.dataset.backgroundColor;
  },
  // borderRadius: 16,
  borderRadius: function (context) {
    if (context.dataIndex % 8 === 0) return 0;
    return 16;
  },
  borderWidth: function (context) {
    if (context.dataIndex % 8 === 0) return 3;
    return 1;
  },
  color: "rgba(0,0,0)",
  font: {
    weight: "bold",
  },
  padding: 2,
  formatter: Math.round,
};

const options = {
  plugins: {
    datalabels: labeles,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          autoSkip: false,
          fontColor: "green",
          // fontColor: function (value, index) {
          //   return "green";
          // },
          fontSize: 16,
          minRotation: 0,
          maxRotation: 0,
          callback: function (value, index) {
            if (index % 8 === 0) return value;
            return value[1];
          },
        },
        gridLines: {
          display: true,
        },
      },
    ],
    yAxes: [
      {
        id: "y-axis-1",
        display: false,
        ticks: {
          suggestedMin: -30,
          suggestedMax: 30,
          stepSize: 1,
        },
        zeroLineColor: "rgba(0, 0, 0, 0.25)",
        zeroLineWidth: 1,
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
  // responsive: false,
  maintainAspectRatio: false,
  tooltip: { enable: false },
};

function Graph({ yesterdays, todays, tomorrows, lastUpdate }) {
  const labels = setLabels(yesterdays.dt, todays.dt, tomorrows.dt);
  const [current, prev] = setTemp(yesterdays.temp, todays.temp, tomorrows.temp);
  const data = setData(labels, prev, current);
  return (
    <>
      <div className="chartWrapper">
        <p>{`업데이트: ${getDate(lastUpdate, "HOURS")}시${getDate(
          lastUpdate,
          "MINUTES"
        )}분`}</p>
        <div className="chartAreaWrapper">
          {/* <Line data={data} options={options} width={1500} height={500} /> */}
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default Graph;
