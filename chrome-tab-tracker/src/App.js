/* global chrome */

import React, { useState, useEffect } from 'react';
import { Container,  List, ListItem, ListItemText, Typography } from '@mui/material';

function App() {
  const [tabData, setTabData] = useState({});

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

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // fetch every 5 seconds

    // cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container className="mx-auto max-w-screen-md mt-8">
      <Typography variant="h4" className="mb-4 text-center font-semibold">Activity Tracker</Typography>
      <List className="divide-y divide-gray-200">
        {Object.keys(tabData).map((url) => (
          <ListItem key={url}>
            <ListItemText 
              primary={url} 
              secondary={`${tabData[url]} seconds`} 
              className="py-4"
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
