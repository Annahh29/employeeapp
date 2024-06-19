import { createAction } from 'redux-actions';

// Define action types
enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  
}

// Define action creators
//export const login = createAction<string>(ActionTypes.LOGIN);
export const logout = createAction(ActionTypes.LOGOUT);
//export const register = createAction(ActionTypes.REGISTER);
export const login = createAction(ActionTypes.LOGIN);