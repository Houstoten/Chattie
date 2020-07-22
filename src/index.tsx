import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
// import App from './App';
import Chat from './controls_components/Chat'
import PageHeader from './controls_components/PageHeader'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <PageHeader />
    <Chat />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
