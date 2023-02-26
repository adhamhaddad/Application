import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../assets/css/Header.module.css';

const Header = () => {
  return (
    <header className={classes['header']}>
      <div className={classes['logo']}>
        <img src="#" alt="" />
      </div>
      <nav className={classes['navbar']}>
        <ul>
          <li>
            <NavLink to='/home'>
              <i className='fa-solid fa-home'></i>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile'>
              <i className='fa-solid fa-user-circle'></i>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to='/products'>
              <i className='fa-solid fa-shopping-cart'></i>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/about'>
              <i className='fa-solid fa-question-circle'></i>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to='/settings'>
              <i className='fa-solid fa-cog'></i>
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
