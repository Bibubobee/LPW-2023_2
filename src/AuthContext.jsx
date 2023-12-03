import React, { createContext, useContext, useReducer, useEffect } from 'react';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const AuthProvider = ({ children }) => {
  const storedAuthState = localStorage.getItem('authState');
  const initialAuthState = storedAuthState ? JSON.parse(storedAuthState) : initialState;
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      dispatch({ type: LOGIN, payload: JSON.parse(storedAuthState) });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, LOGIN, LOGOUT };
