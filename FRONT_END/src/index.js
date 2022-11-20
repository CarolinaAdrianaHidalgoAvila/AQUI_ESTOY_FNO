import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWraper from './App';
import reportWebVitals from './reportWebVitals';

const script = document.createElement("script");
script.src = "https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWraper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
