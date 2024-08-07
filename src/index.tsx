import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './page';
import { Provider } from 'react-redux';
import store from '@redux';
import Electron from 'electron';
declare global {
  interface Window {
    ipcRenderer: Electron.IpcRenderer;
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
