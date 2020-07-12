import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
<BrowserRouter>  {/*Gives app the ability of routing */}
  <App />
</BrowserRouter>
,document.getElementById('root')
);
