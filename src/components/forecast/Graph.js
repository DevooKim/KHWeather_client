import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./chart.css";

function setLabels(dt1, dt2, dt3) {
  return [...dt1, ...dt2, ...dt3];
}

function setData(day, dt) {
  // const labels =

  const data = {
    // labels: day.dt,
    labels: dt,
    datasets: [
      {
        label: day.key,
        data: day.temp,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132)",
        hoverBorderColor: "rgba(255, 99, 132)",
        pointStyle: "circle",
        pointBorderWidth: 10,
        hoverBorderWidth: 20,
        yAxisID: "y-axis-1",
      },
    ],
  };

  return data;
}
// const data = {
//   labels: [
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//   ],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [-9, -11, -11, -11, -7, -4, -4, -8],
//       fill: false,
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgba(255, 99, 132)",
//       hoverBorderColor: "rgba(255, 99, 132)",
//       pointStyle: "circle",
//       pointBorderWidth: 10,
//       hoverBorderWidth: 20,
//       yAxisID: "y-axis-1",
//     },
//     {
//       label: "# of No Votes",
//       data: [1, 2, 3, 1, 2, 2, 15],
//       fill: false,
//       backgroundColor: "rgb(54, 162, 235)",
//       borderColor: "rgba(54, 162, 235)",
//       hoverBorderColor: "rgba(54, 162, 235, 0.5)",
//       pointStyle: "circle",
//       pointBorderWidth: 10,
//       hoverBorderWidth: 15,
//       yAxisID: "y-axis-1",
//     },
//     {
//       type: "bar",
//       label: "강수량",
//       data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
//       fill: false,
//       backgroundColor: "rgba(54, 162, 235, 0)",
//       borderColor: "#457AD1",
//       hoverBackgroundColor: "#457AD1",
//       hoverBorderColor: "#457AD1",
//       yAxisID: "y-axis-2",
//       datalabels: {
//         display: true,
//         align: "start",
//         anchor: "start",
//         offset: -30,
//         backgroundColor: "rgba(54, 162, 235, 1)",
//         borderColor: "rgba(54, 162, 235,)",
//         borderRadius: 4,
//         borderWidth: 2,
//         color: "#f1f1f1",
//       },
//     },
//   ],
// };

const labeles = {
  backgroundColor: function (context) {
    return context.dataset.backgroundColor;
  },
  borderColor: function (context) {
    return context.dataset.backgroundColor;
  },
  borderRadius: 16,
  borderWidth: 1,
  color: "white",
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
    display: false,
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
  // responsive: false,
  // aspectRatio: 3,
  maintainAspectRatio: false,
  tooltip: { enable: false },
};

function Graph({ yesterdays, todays, tomorrows }) {
  // const useStyle = ChartStyle
  const labels = setLabels(yesterdays.dt, todays.dt, tomorrows.dt);
  const data = setData(yesterdays, labels);
  return (
    <>
      <div className="header">
        <h1 className="title">Multi Axis Line Chart</h1>
      </div>
      <div className="chartWrapper">
        <div className="chartAreaWrapper">
          <Line
            data={data}
            options={options}
            // style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
}

export default Graph;
