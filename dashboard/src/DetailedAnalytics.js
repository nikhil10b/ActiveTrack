import React from 'react';

function DetailedAnalytics({ website }) {
  const analyticsData = {
    totalTime: 3600,
    pagesVisited: [
      { page: 'Home', timeSpent: 1200 },
      { page: 'Products', timeSpent: 1800 },
      { page: 'Contact', timeSpent: 600 },
    ],
    idleTime: 300,
    activeTime: 3300,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Detailed Analytics for {website}</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-bold">Total Time Spent: {analyticsData.totalTime} seconds</p>
          <p className="font-bold">Idle Time: {analyticsData.idleTime} seconds</p>
          <p className="font-bold">Active Time: {analyticsData.activeTime} seconds</p>
        </div>
        <div>
          <h3 className="font-bold">Pages Visited:</h3>
          <ul>
            {analyticsData.pagesVisited.map((page, index) => (
              <li key={index} className="list-disc ml-4">
                {page.page}: {page.timeSpent} seconds
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailedAnalytics;
