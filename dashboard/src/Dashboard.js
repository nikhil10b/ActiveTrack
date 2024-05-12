import React, { useState } from 'react';
import TimeTracking from './TimeTracking';
import DetailedAnalytics from './DetailedAnalytics';
import WebsiteCategorization from './WebsiteCategorization';
import TimeGraph from './TimeGraph';
import WebsiteAnalytics from './WebsiteAnalytics';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';


function Dashboard() {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDQYNZBV6yrA5FgycnrVZjqo0E4KPg-GDo",
    authDomain: "activitytracker-9aa4e.firebaseapp.com",
    projectId: "activitytracker-9aa4e",
    storageBucket: "activitytracker-9aa4e.appspot.com",
    messagingSenderId: "934778305994",
    appId: "1:934778305994:web:83c8a0567941a93344e333",
    measurementId: "G-HJZ869TXD7"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const timeData = {
    'example.com': 120,
    'google.com': 300,
    'youtube.com': 180,
  };

  const websites = Object.keys(timeData);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('daily');
  const [watchList, setWatchList] = useState([]);
  const [idleScreen, setIdleScreen] = useState(false);

  const handleWebsiteClick = website => {
    setSelectedWebsite(website);
  };

  const handleTimePeriodChange = period => {
    setSelectedTimePeriod(period);
  };

  const addToWatchList = person => {
    if (!watchList.includes(person)) {
      setWatchList([...watchList, person]);
    }
  };

  const removeFromWatchList = person => {
    setWatchList(watchList.filter(item => item !== person));
  };

  const handleIdleScreen = status => {
    setIdleScreen(status);
  };

  const generateFeedback = () => {
    // Functionality to generate feedback
  };
  const handleLogout = () => {
    // firebase.auth().signOut().then(() => {
    //   setUser(null);
    // }).catch(error => {
    //   console.error('Error occurred while logging out:', error);
    // });
  };

  return (
    <div className="container mx-auto max-w-screen-lg py-8">
      <h1 className="text-6xl font-bold mb-8">Personalized Dashboard</h1>
      <button onClick={handleLogout} className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => handleTimePeriodChange('daily')} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Daily
        </button>
        <button onClick={() => handleTimePeriodChange('weekly')} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Weekly
        </button>
        <button onClick={() => handleTimePeriodChange('monthly')} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Monthly
        </button>
        <button onClick={() => handleTimePeriodChange('yearly')} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Yearly
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TimeTracking timeData={timeData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DetailedAnalytics />
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8">Time Graph</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <TimeGraph timeData={timeData} />
      </div>
      <h2 className="text-2xl font-bold mt-8">Tracked Sites</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {websites.map((website, index) => (
          <li key={index} className="bg-white p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-100" onClick={() => handleWebsiteClick(website)}>
            {website}
          </li>
        ))}
      </ul>
      {selectedWebsite && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <WebsiteAnalytics website={selectedWebsite} />
        </div>
      )}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <WebsiteCategorization websites={websites} />
      </div>
      <h2 className="text-2xl font-bold mt-8">Watchlist</h2>
      <ul>
        {watchList.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <p className="font-bold">Idle Screen: {idleScreen ? 'Idle' : 'Active'}</p>
      </div>
      <button onClick={() => addToWatchList('John')} className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add John to Watchlist
      </button>
      <button onClick={() => removeFromWatchList('John')} className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Remove John from Watchlist
      </button>
      <button onClick={() => handleIdleScreen(true)} className="btn bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
        Simulate Idle Screen
      </button>
      <button onClick={generateFeedback} className="btn bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Generate Feedback
      </button>
    </div>
  );
}

export default Dashboard;
