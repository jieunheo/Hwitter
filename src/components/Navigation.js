import React from "react";
import { Link } from "react-router-dom";

import classes from 'components/Navigation.module.css';

const Navigation = ({ user }) => {
  console.log(user);
  return (
    <nav className={classes.nav}>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profile'>{user.displayName} Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;