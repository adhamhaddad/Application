import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from '../assets/css/Main.module.css';

const Home = lazy(() => import('../pages/Home'));
const Settings = lazy(() => import('../pages/Settings'));
const Products = lazy(() => import('../pages/Products'));
const Profile = lazy(() => import('../pages/Profile'));
const About = lazy(() => import('../pages/About'));

const Main = () => {
  return (
    <main className={classes['main']}>
      <Switch>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/products'>
          <Products />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/settings'>
          <Settings />
        </Route>
      </Switch>
    </main>
  );
};
export default Main;
