import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const LineChart = () => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Basic Line Chart',
      align: 'center',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    yaxis: {
      title: {
        text: 'Sales',
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
  };

  const series = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
