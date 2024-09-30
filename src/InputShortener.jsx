import React, { useState } from 'react';
import './App.css'

const InputShortener = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [customAlias, setCustomAlias] = useState('');

  const handleShorten = () => {
    const generatedShortURL = `short.url/${customAlias || Math.random().toString(36).substring(2, 8)}`;
    setShortURL(generatedShortURL);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortURL);
    alert('Short URL copied to clipboard!');
  };

  return (
    <div className="container">
      <h1>URL Shortener Tool</h1>
      <input
        type="text"
        placeholder="Enter your long URL"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        className="input"
      />
      <button onClick={handleShorten} className="button">Shorten URL</button>

      {shortURL && (
        <div className="result-container">
          <p>Shortened URL:</p>
          <div className="short-url">
            <span>{shortURL}</span>
            <button onClick={copyToClipboard} className="copy-button">Copy</button>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Custom Alias (optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        className="input"
      />
    </div>
  );
};

export default InputShortener;
