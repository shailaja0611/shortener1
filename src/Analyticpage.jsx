import React, { useState, useEffect } from 'react';


import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const UrlShortenerComponent = ({ longUrl, setLongUrl, customAlias, setCustomAlias, shortUrl, setShortUrl }) => {
  const handleShortenUrl = () => {
    if (!longUrl) {
      alert("Please enter a valid URL.");
      return;
    }
    const generatedShortUrl = customAlias ? `short.ly/${customAlias}` : 'short.ly/abc123'; // Use backticks
    setShortUrl(generatedShortUrl);
  };

  return (
    <div>
      <h1>URL Shortener Tool</h1>
      <div>
        <label>Enter URL:</label>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>
      <div>
        <label>Custom Alias (optional):</label>
        <input
          type="text"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          placeholder="Custom Alias"
        />
      </div>
      <button onClick={handleShortenUrl}>Shorten URL</button>
      {shortUrl && (
        <div>
          <p>Shortened URL: <strong>{shortUrl}</strong></p>
          <button onClick={() => navigator.clipboard.writeText(shortUrl)}>Copy</button>
        </div>
      )}
    </div>
  );
};

const Analytics = ({ clickCount, referralSources, geographicData, timeMetrics, deviceType }) => {
  const timeMetricsData = {
    labels: Object.keys(timeMetrics),
    datasets: [
      {
        label: 'Clicks Over Time',
        data: Object.values(timeMetrics),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <h1>Analytics Page</h1>
      <div>
        <h2>Click Count</h2>
        <p>{clickCount}</p>
      </div>
      <div>
        <h2>Referral Sources</h2>
        <ul>
          {Object.entries(referralSources).map(([source, count]) => (
            <li key={source}>{source}: {count}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Geographic Data</h2>
        <ul>
          {Object.entries(geographicData).map(([location, count]) => (
            <li key={location}>{location}: {count}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Time-based Metrics</h2>
        <Line data={timeMetricsData} />
      </div>
      <div>
        <h2>Device Type</h2>
        <ul>
          {Object.entries(deviceType).map(([device, count]) => (
            <li key={device}>{device}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Analyticspage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [referralSources, setReferralSources] = useState({});
  const [geographicData, setGeographicData] = useState({});
  const [timeMetrics, setTimeMetrics] = useState({});
  const [deviceType, setDeviceType] = useState({});

  useEffect(() => {
    fetch('/api/analytics')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setClickCount(data.clickCount);
        setReferralSources(data.referralSources);
        setGeographicData(data.geographicData);
        setTimeMetrics(data.timeMetrics);
        setDeviceType(data.deviceType);
      })
      .catch(error => {
        console.error('Error fetching analytics data:', error);
      });
  }, []);

  return (
    <div>
      <UrlShortenerComponent
        longUrl={longUrl}
        setLongUrl={setLongUrl}
        customAlias={customAlias}
        setCustomAlias={setCustomAlias}
        shortUrl={shortUrl}
        setShortUrl={setShortUrl}
      />
      <Analytics
        clickCount={clickCount}
        referralSources={referralSources}
        geographicData={geographicData}
        timeMetrics={timeMetrics}
        deviceType={deviceType}
      />
    </div>
  );
};

export default Analyticspage;
