import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./chart.css";

function setLabels(dt1, dt2, dt3) {
  return [...dt1, ...dt2, ...dt3];
}

function setTemp(yesterday, today, tomorrows) {
  const current = [...yesterday, ...today, ...tomorrows];
  const prev = [...yesterday, ...yesterday, ...today];
  //plugin 이용해서 prev 앞쪽 인덱스는 투명화

  return [current, prev];
}
function setData(labels, prev, current) {
  // const labels =

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
        hoverBorderWidth: 15,
        yAxisID: "y-axis-1",
      },
    ],
  };

  return data;
}

const labeles = {
  backgroundColor: function (context) {
    return context.dataset.backgroundColor;
  },
  borderColor: function (context) {
    return context.dataset.backgroundColor;
  },
  borderRadius: 16,
  borderWidth: 1,
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
  legend: {
    display: true,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: "black",
          fontSize: 16,
        },
        padding: 10,
      },
    ],
    yAxes: [
      {
        id: "y-axis-1",
        display: false,
        stacked: false,
        ticks: {
          suggestedMin: -30,
          suggestedMax: 30,
          stepSize: 1,
        },
      },
      // {
      //   id: "y-axis-2",
      //   display: false,
      //   stacked: true,
      // },
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
  responsive: false,
  // aspectRatio: 3,
  maintainAspectRatio: false,
  tooltip: { enable: false },
};

function Graph({ yesterdays, todays, tomorrows }) {
  const labels = setLabels(yesterdays.dt, todays.dt, tomorrows.dt);
  const [current, prev] = setTemp(yesterdays.temp, todays.temp, tomorrows.temp);
  const data = setData(labels, prev, current);
  return (
    <>
      <div className="header">
        <h1 className="title">TITLE</h1>
      </div>
      <div className="chartWrapper">
        <div className="chartAreaWrapper">
          <Line
            data={data}
            options={options}
            // style={{ width: "100%", height: "100%" }}
            width={1000}
            height={500}
          />
        </div>
      </div>
    </>
  );
}

export default Graph;
