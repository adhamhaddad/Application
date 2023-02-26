import React, { useState, createContext } from 'react';

export const Auth = createContext({
  accessToken: '',
  isLoggedIn: false,
  user: {},
  Login: (email, pass, cb) => {},
  Logout: () => {}
});

const AuthContext = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn')
  );
  const [user, setUser] = useState({
    username: localStorage.getItem('username'),
    user_id: localStorage.getItem('user_id'),
    first_name: localStorage.getItem('first_name'),
    last_name: localStorage.getItem('last_name')
  });

  const loginHandler = (email, pass, cb) => {
    const { accessToken, user_id, username, first_name, last_name } = cb();
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('username', username);
    localStorage.setItem('first_name', first_name);
    localStorage.setItem('last_name', last_name);
    localStorage.setItem('isLoggedIn', 1);
  };

  const logoutHandler = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
  };

  const value = {
    accessToken: token,
    isLoggedIn: isLoggedIn,
    user: user,
    Login: loginHandler,
    Logout: logoutHandler
  };

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};
export default AuthContext;
