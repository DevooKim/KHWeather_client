import React from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, -19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132)",
      hoverBorderColor: "rgba(255, 99, 132, 0.5)",
      pointStyle: "circle",
      pointBorderWidth: 15,
      hoverBorderWidth: 20,
      yAxisID: "y-axis-1",
    },
    {
      label: "# of No Votes",
      data: [1, 2, 1, 1, 2, 2],
      fill: false,
      backgroundColor: "rgb(54, 162, 235)",
      borderColor: "rgba(54, 162, 235, 0.2)",
      yAxisID: "y-axis-2",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
      },
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-2",
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
  // plugins: {
  //   datalabels: {
  //     borderRadius: 32,
  //     color: "white",
  //     font: {
  //       weight: "bold",
  //     },
  //     formatter: function (value, context) {
  //       value = Math.round(value * 100) / 100;
  //       return context.active
  //         ? context.dataset.label + "\n" + value + "%"
  //         : Math.round(value);
  //     },
  //     offset: 8,
  //     padding: 5,
  //     textAlign: "center",
  //   },
  // },
  tooltip: { enable: false },
};

function Graph() {
  return (
    <>
      <div className="header">
        <h1 className="title">Multi Axis Line Chart</h1>
        <div className="links">
          <a
            className="btn btn-gh"
            href="https://chartjs-plugin-datalabels.netlify.app/samples/charts/line.html"
          >
            document
          </a>
          <br />
          <a
            className="btn btn-gh"
            href="https://github.com/reactchartjs/react-chartjs-2/blob/react16/example/src/charts/MultiAxisLine.js"
          >
            Github Source
          </a>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
}

export default Graph;
