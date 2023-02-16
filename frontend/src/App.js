import React, { lazy, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Auth } from './utils/auth';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));

const App = () => {
  const authCtx = useContext(Auth);
  console.log(authCtx.isLoggedIn);
  return (
    <>
      {authCtx.isLoggedIn && (
        <>
          <Header />
          <Main />
          <Footer />
        </>
      )}
      {!authCtx.isLoggedIn && (
        <>
          <Switch>
            <Route path='/signin'>
              <Signin />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='*'>
              <Signin />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
