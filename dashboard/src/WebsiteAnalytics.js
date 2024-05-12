// WebsiteAnalytics.js
import React from 'react';

function WebsiteAnalytics({ website }) {
  // Sample analytics data (replace with your actual data)
  const analyticsData = {
    totalVisits: 100,
    averageTimeSpent: 120,
    mostVisitedPage: '/home',
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{website} Analytics</h2>
      <p>Total Visits: {analyticsData.totalVisits}</p>
      <p>Average Time Spent: {analyticsData.averageTimeSpent} seconds</p>
      <p>Most Visited Page: {analyticsData.mostVisitedPage}</p>
      {/* Add more analytics data as needed */}
    </div>
  );
}

export default WebsiteAnalytics;