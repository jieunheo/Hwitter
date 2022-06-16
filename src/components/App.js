import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';

import AppRouter from './Router';

function App() {
  const [init, setInit] = useState(false); // 초기화 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  // console.log(authService.currentUser);
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);

  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
