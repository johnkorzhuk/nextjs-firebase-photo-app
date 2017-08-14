// @flow

import type { Action } from '../types';

type State = {};

const INITIAL_STATE = {};

export default (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
