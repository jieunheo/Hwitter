import React, { Fragment, useState } from "react";
import { authService } from "fbase";

import classes from 'components/AuthForm.module.css';

const AuthForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true); // 회원가입페이지인지
  const [error, setError] = useState('');

  const toggleAcountHnadler = () => {
    setNewAccount(prevAccount => !prevAccount);
  }

  const onEnteredHandler = (event) => {
    const {target: {name, value}} = event;

    if(name === 'email') setEnteredEmail(value);
    if(name === 'password') setEnteredPassword(value);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let data;
      if(newAccount) {
        // 새 계정 생성
        data = await authService.createUserWithEmailAndPassword(enteredEmail, enteredPassword);
      } else {
        // 로그인 시도
        data = await authService.signInWithEmailAndPassword(enteredEmail, enteredPassword);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <Fragment>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          required value={enteredEmail}
          onChange={onEnteredHandler}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required value={enteredPassword}
          onChange={onEnteredHandler}
        />
        {<p className={classes.error}>{error}</p>}
        <button>{newAccount ? 'Create Account' : 'Log In'}</button>
      </form>
      <div className={classes.btn}>
        <span onClick={toggleAcountHnadler}>{!newAccount ? 'To Create Account' : 'To Log In'}</span>
      </div>
    </Fragment>
  );
};

export default AuthForm;