import React from 'react';
import classes from '../../assets/css/Input.module.css';

const Input = ({ id, type, label, value, onChange, isValid }) => {
  return (
    <div className={classes['input-box']}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={isValid ? '' : classes['err']}
      />
    </div>
  );
};
export default Input;
