import React, { useState, useReducer } from 'react';
import useHttp from '../hooks/use-http';
import classes from '../assets/css/Forms.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const formControl = (state, action) => {
  if (action === 'INPUT') {
    return {
      fname: {
        value: action.val,
        isValid: action.val >= 5 ? true : false
      },
      lname: {
        value: action.val,
        isValid: action.val >= 5 ? true : false
      },
      email: {
        value: action.val,
        isValid: action.val >= 5 ? true : false
      },
      password: {
        value: action.val,
        isValid: action.val >= 8 ? true : false
      }
    };
  } else if (action === 'BLUR') {
    return {
      fname: {
        value: state.fname,
        isValid: state.fname >= 5 ? true : false
      },
      lname: { value: state.lname, isValid: state.lname >= 5 ? true : false },
      email: { value: state.email, isValid: state.email >= 8 ? true : false },
      password: {
        value: state.password,
        isValid: state.password >= 8 ? true : false
      }
    };
  }
  return {
    fname: { value: '', isValid: false },
    lname: { value: '', isValid: false },
    email: { value: '', isValid: false },
    password: { value: '', isValid: false }
  };
};

const Signup = () => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [form, dispatchForm] = useReducer(formControl, {
    fname: { value: '', isValid: false },
    lname: { value: '', isValid: false },
    email: { value: '', isValid: false },
    password: { value: '', isValid: false }
  });

  const onFnameChange = (e) => {
    dispatchForm({ type: 'INPUT', input: 'FNAME', val: e.target.value });
  };
  const onLnameChange = (e) => {
    dispatchForm({ type: 'INPUT', input: 'LNAME', val: e.target.value });
  };
  const onEmailChange = (e) => {
    dispatchForm({ type: 'INPUT', input: 'EMAIL', val: e.target.value });
  };
  const onPasswordChange = (e) => {
    dispatchForm({ type: 'INPUT', input: 'PASSWORD', val: e.target.value });
  };

  const formDataResponse = (e) => {
    console.log(e);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const body = {
      first_name: form.fname.value,
      last_name: form.lname.value,
      email: form.email.value,
      password: form.password.value
    };
    sendRequest('', 'POST', body, formDataResponse);
  };

  return (
    <div className={classes['signin-page']}>
      <form onSubmit={onFormSubmit}>
        <Input
          id='fname'
          label='First Name'
          type='text'
          value={form.fname.value}
          onChange={onFnameChange}
          isValid={form.fname.isValid}
        />
        <Input
          id='lname'
          label='Last Name'
          type='text'
          value={form.lname.value}
          onChange={onLnameChange}
          isValid={form.lname.isValid}
        />
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
        {!isLoading && <Button type='submit' label='Sign up' />}
      </form>
    </div>
  );
};
export default Signup;
