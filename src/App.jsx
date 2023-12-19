import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './App.css';

function App() {
  const [chartState, setChartState] = useState({
    series: [
      {
        name: 'Desktops',
        data: [10, 41, 26, 22, 11, 22, 33, 52, 41],
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
        max: 400, 
      },
    },
  });

  const handleWheel = (event) => {
    const deltaY = event.deltaY;

    setChartState((prevChartState) => {
      const { min, max } = prevChartState.options.yaxis;
      const dataMax = Math.max(...prevChartState.series[0].data);

      const minRange = 0;
      const maxRange = 400;

      console.log('lllll', max ,min);
      const newMin = deltaY > 0 ? Math.max(min / 2, minRange) : Math.min(min * 2, max / 2);
      
      let newMax = deltaY > 0 ? Math.min(max * 2, maxRange) : Math.min(max / 2, maxRange);
      console.log(dataMax);
      if(newMax >= dataMax){
       
      }
      else{
        
        newMax =dataMax
   
      }
      return {
        ...prevChartState,
        options: {
          ...prevChartState.options,
          yaxis: {
            ...prevChartState.options.yaxis,
            min: newMin,
            max: newMax,
          },
        },
      };
    });
  };

  const handleFilterChange = (selectedRange) => {
    setChartState((prevChartState) => {
      const newMax = parseInt(selectedRange, 10); 
      return {
        ...prevChartState,
        options: {
          ...prevChartState.options,
          yaxis: {
            ...prevChartState.options.yaxis,
            max: newMax,
          },
        },
      };
    });
  };
  return (
    <>
        <div style={{ marginBottom: '20px' }}>
        <label>Select Y-axis Range:</label>
        <select onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="100">0 - 100</option>
          <option value="200">0 - 200</option>
          <option value="300">0 - 300</option>
          <option value="400">0 - 400</option>
        </select>
      </div>
      <div onWheel={handleWheel} style={{ height: '100vh', overflow: 'hidden' }}>
        <ReactApexChart options={chartState.options} series={chartState.series} type="line" height={500} />
      </div>
    </>
  );
}

export default App;
