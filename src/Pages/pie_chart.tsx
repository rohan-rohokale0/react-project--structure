import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const PieChart = () => {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Basic Pie Chart',
      align: 'center',
    },
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
  };

  const series = [44, 55, 13, 43];

  return (
    <div>
      <Chart options={options} series={series} type="pie" height={350} />
    </div>
  );
};

export default PieChart;
