import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';

import classes from 'components/App.module.css';
import AppRouter from './Router';

function App() {
  const [init, setInit] = useState(false); // 초기화 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setInit(true);
    });
  }, []);

  const editUserHandler = () => {
    const user = authService.currentUser;
    setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      updateProfile: (args) => user.updateProfile(args)
    });
  };

  // console.log(authService.currentUser);
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);

  return (
    <div className={classes.wrap}>
      {init ? <AppRouter editUserHandler={editUserHandler} isLoggedIn={isLoggedIn} user={user} /> : 'Initializing...'}
      <footer className={classes.footer}>&copy; {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
