/* global chrome */

import React, { useState, useEffect } from 'react';

function App() {
  const [tabData, setTabData] = useState({});
  const [restrictedSites, setRestrictedSites] = useState([]);
  const [newRestrictedSite, setNewRestrictedSite] = useState('');
  const [timeLimits, setTimeLimits] = useState({});

  const fetchData = () => {
    chrome.tabs.query({}, tabs => {
      const tabUrls = tabs.reduce((result, tab) => {
        result[tab.id] = new URL(tab.url).hostname;
        return result;
      }, {});

      chrome.runtime.sendMessage({ cmd: 'getTabTimes' }, response => {
        const urlTimes = Object.keys(response).reduce((result, tabId) => {
          const url = tabUrls[tabId];
          if (url) {
            if (!result[url]) {
              result[url] = 0;
            }
            result[url] += response[tabId];
          }
          return result;
        }, {});

        setTabData(urlTimes);
      });
    });
  };

  const handleAddRestrictedSite = () => {
    setRestrictedSites([...restrictedSites, newRestrictedSite]);
    setNewRestrictedSite('');
  };

  const handleDeleteRestrictedSite = index => {
    const updatedRestrictedSites = [...restrictedSites];
    updatedRestrictedSites.splice(index, 1);
    setRestrictedSites(updatedRestrictedSites);
  };

  const handleClearActivity = url => {
    const updatedTabData = { ...tabData };
    delete updatedTabData[url];
    setTabData(updatedTabData);
  };

  const handleSetTimeLimit = (url, limit) => {
    setTimeLimits({ ...timeLimits, [url]: limit });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // fetch every 5 seconds

    // Check for time limits and close tabs if exceeded
    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        const url = new URL(tab.url).hostname;
        const limit = timeLimits[url];
        if (limit && tabData[url] && tabData[url] >= limit) {
          chrome.tabs.remove(tab.id);
          alert(`Time limit exceeded for ${url}. Tab closed.`);
        }
      });
    });

    // cleanup on unmount
    return () => clearInterval(intervalId);
  }, [timeLimits]);

  useEffect(() => {
    // Check if the current tab's URL is in the restricted sites list
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTabUrl = new URL(tabs[0].url).hostname;
      if (restrictedSites.includes(currentTabUrl)) {
        // If the current tab's URL is in the restricted sites list, close the tab
        chrome.tabs.remove(tabs[0].id);
        // Optionally, you can display a warning to the user here
        alert('Access to this site is restricted!');
      }
    });
  }, [restrictedSites]);

  return (
    <div className="mx-auto max-w-screen-md mt-8">
      <h1 className="text-4xl mb-4 text-center font-semibold">Activity Tracker</h1>
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          className="border border-gray-300 px-3 py-2 rounded-md outline-none"
          placeholder="Add Restricted Site"
          value={newRestrictedSite}
          onChange={e => setNewRestrictedSite(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleAddRestrictedSite}
        >
          Add
        </button>
      </div>
      <h2 className="text-2xl mb-4 mt-8 text-center font-semibold">Tracked Sites</h2>
      <ul className="divide-y divide-gray-200">
        {Object.keys(tabData).map((url, index) => (
          <li key={url} className="py-4 flex items-center justify-between">
            <div>
              <span className="font-bold">{url}:</span>
              <span className="text-gray-600 ml-2">{`${tabData[url]} seconds`}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-red-600 hover:text-red-800 transition-colors"
                onClick={() => handleClearActivity(url)}
              >
                Clear Activity
              </button>
              <input
                type="number"
                className="border border-gray-300 px-2 py-1 rounded-md w-24 outline-none"
                placeholder="Set Time Limit (seconds)"
                onChange={e => handleSetTimeLimit(url, parseInt(e.target.value))}
              />
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl mb-4 mt-8 text-center font-semibold">Restricted Sites</h2>
      <ul className="divide-y divide-gray-200">
        {restrictedSites.map((site, index) => (
          <li key={index} className="py-2 flex items-center justify-between">
            <span>{site}</span>
            <button
              className="text-red-600 hover:text-red-800 transition-colors"
              onClick={() => handleDeleteRestrictedSite(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

