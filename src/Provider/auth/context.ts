import { createContext} from 'react';
import {  AuthState , AuthActions, Credentials } from './interface';

// Define types for context values
const initialState: AuthState = {
  isAuthenticated: false,
  authToken: null,
};

// Create contexts with types
const AuthStateContext = createContext<AuthState>(initialState);
const AuthActionsContext = createContext<AuthActions>({
  login: async() => {},
  logout: () => {}
});

export { AuthActionsContext, AuthStateContext, initialState};