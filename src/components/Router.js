import React, { Fragment } from 'react';
import { HashRouter, /*Redirect,*/ Route, Switch } from 'react-router-dom';

import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Profile from 'routes/Profile';
import Navigation from "components/Navigation";

const AppRouter =  ({ isLoggedIn, user }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn
        ? (
          <Fragment>
            <Route path='/' exact><Home user={user} /></Route>
            <Route path='/profile' exact><Profile user={user} /></Route>
            {/* <Redirect from='*' to='/'/> */}
          </Fragment>
        ) : (
          <Fragment>
            <Route path='/' exact><Auth /></Route>
            {/* <Redirect from='*' to='/'/> */}
          </Fragment>
        )}
      </Switch>
    </HashRouter>
  )
};

export default AppRouter;