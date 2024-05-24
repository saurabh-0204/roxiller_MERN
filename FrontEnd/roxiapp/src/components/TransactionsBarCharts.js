
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TransactionsBarChart = ({ barChartData }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const labels = barChartData.map(data => data.priceRange);
    const data = barChartData.map(data => data.numberOfItems);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Items',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [barChartData]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TransactionsBarChart;
