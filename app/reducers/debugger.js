import {
  SET_DEBUGGER_STATUS,
  SET_DEBUGGER_WORKER,
  SET_DEBUGGER_LOCATION,
} from '../actions/debugger';

const refreshShortcut = process.platform === 'darwin' ? '⌘R' : 'Ctrl+R';
const initialState = {
  worker: null,
  status: 'waiting',
  statusMessage: `Waiting, press ${refreshShortcut} in simulator to reload and connect.`,
  location: {
    host: 'localhost',
    port: 8081,
  },
};

function setStatusToTitle(message) {
  document.title = `React Native Debugger - ${message}`;
}

const actionsMap = {
  [SET_DEBUGGER_STATUS]: (state, action) => {
    const newState = {
      ...state,
      status: action.status || initialState.status,
      statusMessage: action.statusMessage || initialState.statusMessage,
    };
    setStatusToTitle(newState.statusMessage);
    return newState;
  },
  [SET_DEBUGGER_WORKER]: (state, action) => {
    const newState = {
      ...state,
      worker: action.worker,
      status: action.status || initialState.status,
      statusMessage: action.statusMessage || initialState.statusMessage,
    };
    setStatusToTitle(newState.statusMessage);
    return newState;
  },
  [SET_DEBUGGER_LOCATION]: (state, action) => ({
    ...state,
    location: {
      ...state.location,
      ...action.loc,
    },
  }),
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
