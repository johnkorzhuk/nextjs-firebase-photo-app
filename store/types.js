// @flow

declare type ActionType =
  | 'root/USER_LOGOUT'
  | 'auth/SET_USER_TOKEN'
  | 'auth/SET_LOGGED_IN_EMAIL'
  | 'auth/TOGGLE_LOADING';

declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload?: P
|};

export type Action =
  | ActionT<'root/USER_LOGOUT', null>
  | ActionT<'auth/SET_USER_TOKEN', ?string>
  | ActionT<'auth/SET_LOGGED_IN_EMAIL', string>
  | ActionT<'auth/TOGGLE_LOADING', boolean>;

export type State = {
  auth: {
    userToken: ?string,
    loading: false
  }
};

// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
// eslint-disable-next-line no-use-before-define
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type GetState = () => State;
export type PromiseAction = Promise<Action>;
