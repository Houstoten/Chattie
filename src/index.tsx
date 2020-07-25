import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Chat from './Chat'
import * as serviceWorker from './serviceWorker';
import { store } from './store'
import MessageEdit from './MessageEdit';
const { Provider } = require('react-redux');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Chat />
      <MessageEdit />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
