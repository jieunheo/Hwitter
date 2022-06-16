import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';

import AppRouter from './Router';

function App() {
  const [init, setInit] = useState(false); // 초기화 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
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
      {init ? <AppRouter isLoggedIn={isLoggedIn} user={user} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
