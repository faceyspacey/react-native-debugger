import { remote, webFrame } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';

if (process.platform === 'darwin') {
  // Reset TouchBar when reload the app
  remote.getCurrentWindow().setTouchBar([]);
}

webFrame.setZoomFactor(1);
webFrame.setZoomLevelLimits(1, 1);

const store = configureStore();

window.checkWorkerRunning = () => {
  const debuggerState = store.getState().debugger;
  const isRunning = !!debuggerState.worker;
  const location = debuggerState.location;
  return { isRunning, location };
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
