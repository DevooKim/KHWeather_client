import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import './chart.css'

const data = {
  labels: ["1", "2", "3", "4", "5", "6","1", "2", "3", "4", "5", "6","1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, -19, 3, 5.6, 2, 3,12, -19, 3, 5, 2, 3,12, -19, 3, 5, 2, 3,12, -19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132)",
      hoverBorderColor: "rgba(255, 99, 132, 0.5)",
      pointStyle: "circle",
      pointBorderWidth: 10,
      hoverBorderWidth: 15,
      // yAxisID: "y-axis-1",
    },
    {
      label: "# of No Votes",
      data: [1, 2, 3, 1, 2, 2, 15],
      fill: false,
      backgroundColor: "rgb(54, 162, 235)",
      borderColor: "rgba(54, 162, 235)",
      hoverBorderColor: "rgba(54, 162, 235, 0.5)",
      pointStyle: "circle",
      pointBorderWidth: 10,
      hoverBorderWidth: 15,
      // yAxisID: "y-axis-2",
    },
    {
      type: "bar",
      label: "강수량",
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      fill: false,
      backgroundColor: "rgba(54, 162, 235, 0)",
      borderColor: '#457AD1',
      hoverBackgroundColor: '#457AD1',
      hoverBorderColor: '#457AD1',
      datalabels: {
        display: true,
        align: 'end',
        anchor: 'start',
        offset: 50,
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235,)",
        borderRadius: 4,
        borderWidth: 2,
        color: '#f1f1f1'
      }
    }
  ],

};

const options = {
  plugins: {
    datalabels: {
    //   color: "white",
    //   font: {
    //     size: 14
    //   },
    //   formatter: Math.round,
    //   // offset: 8,
    //   padding: 5,
    //   textAlign: 'center',
    // },
    borderRadius: 100,
    color: 'white',
    formatter: Math.round,
    padding: 6
  }
  },
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      display: false,
      stacked: false
    }],
  },
  layout: {
    padding: {
      top: 50,
      bottom: 16,
      left: 16,
      right: 16
    }
  },
  // responsive: false,
  // aspectRatio: 10,
  maintainAspectRatio: false,  
  tooltip: { enable: false },
};

function Graph() {
  // const useStyle = ChartStyle
  return (
    <>
      <div className="header">
        <h1 className="title">Multi Axis Line Chart</h1>
      </div>
      <div className="chartWrapper">
        <div className="chartAreaWrapper">
          <Line data={data} options={options} height={"30vh"} width={"150vw"}/>
        </div>
      </div>
    </>
  );
}

export default Graph;
