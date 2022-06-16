import React, { useState } from "react";

import { authService, firebaseInstance } from "fbase";

const Auth = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true); // 회원가입페이지인지
  const [error, setError] = useState('');

  const onEnteredHandler = (event) => {
    const {target: {name, value}} = event;

    if(name === 'email') setEnteredEmail(value);
    if(name === 'password') setEnteredPassword(value);

    // if(event.target.name === 'email') setEnteredEmail(event.target.value);
    // if(event.target.name === 'password') setEnteredPassword(event.target.value);
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

  const toggleAcountHnadler = () => {
    setNewAccount(prevAccount => !prevAccount);
  }

  const onSocialClick = async (event) => {
    const {target: { name }} = event;
    
    let provider;
    if(name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
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
        {error}
        <button>{newAccount ? 'Create Account' : 'Log In'}</button>
      </form>
      <span onClick={toggleAcountHnadler}>{!newAccount ? 'To Create Account' : 'To Log In'}</span>
      <div>
        <button name='google' onClick={onSocialClick}>Continue with Google</button>
        <button name='github' onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;