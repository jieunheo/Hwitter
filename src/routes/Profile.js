import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import { authService } from "fbase";

const Profile = () => {
  const history = useHistory();

  const logoutHandler = () => {
    authService.signOut();

    history.replace('/');
  };

  return (
    <Fragment>
      <span>Profile</span>
      <button onClick={logoutHandler}>Log Out</button>
    </Fragment>
  );
};

export default Profile;