
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './App.css'

function App() {
  const [chartState, setChartState] = useState({
    series: [
      {
        name: 'Desktops',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      yaxis: {
        min: 0,
        max: 200, // Initial Y-axis range
      },
    },
  });

  const handleWheel = (event) => {
    const deltaY = event.deltaY;

    setChartState((prevChartState) => {
      const { min, max } = prevChartState.options.yaxis;

      const newMin = deltaY > 0 ? min - 10 : min + 10;
      const newMax = deltaY > 0 ? max - 10 : max + 10;

      return {
        ...prevChartState,
        options: {
          ...prevChartState.options,
          yaxis: {
            ...prevChartState.options.yaxis,
            min: newMin >= 0 ? newMin : 0,
            max: newMax,
          },
        },
      };
    });
  };
  return (
    <>
   <div onWheel={handleWheel} style={{ height: '100vh', overflow: 'hidden' }}>
      <ReactApexChart options={chartState.options} series={chartState.series} type="line" height={350} />
    </div>
    </>
  )
}

export default App
