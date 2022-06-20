import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { authService, dbService } from "fbase";
import Hweet from "components/Hweet";
import classes from 'routes/Profile.module.css';

const Profile = ({ user, editUserHandler }) => {
  const [enteredName, setEnteredName] = useState(user.displayName ? user.displayName : '');
  const [loadedHweets, setLoadedHweets] = useState([]);
  const history = useHistory();

  const logoutHandler = () => {
    authService.signOut();

    history.replace('/');
  };

  const getMyHweets = async () => {
    const hweets = await dbService
                        .collection('hweets')
                        .where('author', '==', user.uid)
                        .orderBy('createAt', 'desc')
                        .get();
    
    setLoadedHweets(hweets.docs.map(item => ({
      id: item.id,
      ...item.data()
    })));
  };

  useEffect(() => {
    getMyHweets();
  }, []);

  const onInputChangeHandler = (event) => {
    const {target: { value }} = event;
    setEnteredName(value);
  }

  const updateProfileHandler = async (event) => {
    event.preventDefault();

    if(user.displayName !== enteredName) {
      await user.updateProfile({
        displayName: enteredName
      });
      editUserHandler();
    };
  };

  return (
    <div>
      <form onSubmit={updateProfileHandler} className={classes.form}>
        <input type='text' placeholder='display name' value={enteredName} onChange={onInputChangeHandler} />
        <input type='email' placeholder={user.email} readOnly />
        <button>Update Profile</button>
      </form>
      <ul>
        {loadedHweets.map(item => (
          <Hweet key={item.id} item={item} isAuthor={true} />
        ))}
      </ul>
      <div className={classes.actions}>
        <button onClick={logoutHandler}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;