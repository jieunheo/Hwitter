import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  console.log(user);
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profile'>{user.displayName} Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;