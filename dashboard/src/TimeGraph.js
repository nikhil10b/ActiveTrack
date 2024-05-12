import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function TimeGraph({ timeData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    const renderChart = () => {
      const labels = Object.keys(timeData);
      const data = Object.values(timeData);

      if (chartRef.current && labels.length > 0) {
        const ctx = chartRef.current.getContext('2d');
        chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Time Spent (seconds)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    renderChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [timeData]);

  return <canvas ref={chartRef} />;
}

export default TimeGraph;
