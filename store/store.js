// @flow

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import logger from 'redux-logger';

import type { State } from './types';

import rootReducer from './reducers';

let middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

export default (initialState: State) =>
  createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
