import React, { Fragment } from 'react';
import { HashRouter, /*Redirect,*/ Route, Switch } from 'react-router-dom';

import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Profile from 'routes/Profile';
import Navigation from "components/Navigation";

const AppRouter =  ({ isLoggedIn }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn
        ? (
          <Fragment>
            <Route path='/' exact><Home /></Route>
            <Route path='/profile' exact><Profile /></Route>
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