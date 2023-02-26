import React, { useState, useReducer } from 'react';
import useHttp from '../hooks/use-http';
import classes from '../assets/css/Forms.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const formControl = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      email: {
        value: action.val,
        isValid: action.val >= 5 ? true : false
      },
      password: {
        value: action.val,
        isValid: action.val >= 8 ? true : false
      }
    };
  } else if (action.type === 'BLUR') {
    return {
      email: { value: state.email, isValid: state.email >= 8 ? true : false },
      password: {
        value: state.password,
        isValid: state.password >= 8 ? true : false
      }
    };
  }
  return {
    email: { value: '', isValid: false },
    password: { value: '', isValid: false }
  };
};

const Signin = () => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [form, dispatchForm] = useReducer(formControl, {
    email: { value: '', isValid: false },
    password: { value: '', isValid: false }
  });

  const onEmailChange = (e) => {
    dispatchForm({ type: 'INPUT', input: 'EMAIL', val: e.target.value });
  };
  const onPasswordChange = (e) => {
    dispatchForm({ type: 'INPUT', input: 'PASSWORD', val: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: form.email.value,
      password: form.password.value
    };
    sendRequest('', 'POST', body, null);
  };

  return (
    <div className={classes['signin-page']}>
      <form onSubmit={onFormSubmit}>
        <Input
          id='email'
          label='Email Address'
          type='email'
          value={form.email.value}
          onChange={onEmailChange}
          isValid={form.email.isValid}
        />
        <Input
          id='password'
          label='Password'
          type='password'
          value={form.password.value}
          onChange={onPasswordChange}
          isValid={form.password.isValid}
        />
        {!isLoading && <Button type='submit' label='Sign in' />}
        {isError !== null && <p style={{ textAlign: 'center' }}>{isError}</p>}
      </form>
    </div>
  );
};
export default Signin;
