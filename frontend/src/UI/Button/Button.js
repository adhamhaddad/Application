import React from 'react';
import classes from '../../assets/css/Button.module.css';

const Button = ({ type, label }) => {
  return <button type={type} className={classes['button']}>{label}</button>;
};
export default Button;
