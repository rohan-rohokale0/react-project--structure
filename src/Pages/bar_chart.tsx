import React from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { ApexOptions } from 'apexcharts';

const BarChart = () => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Basic Bar Chart',
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
       
      },
    },
    dataLabels: {
      enabled: true,
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
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
