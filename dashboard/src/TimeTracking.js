// TimeTracking.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

function TimeTracking({ timeData }) {
  // Extract data for labels (website URLs) and time spent from timeData
  const labels = Object.keys(timeData);
  const data = Object.values(timeData);

  // Define data for the bar chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Time Spent (seconds)',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Define options for the bar chart
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time Spent (seconds)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Websites',
        },
      },
    },
  };

  return (
    <div>
      <h2>Time Tracking</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default TimeTracking;
