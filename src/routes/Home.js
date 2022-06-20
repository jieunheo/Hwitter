import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

import Hweet from "components/Hweet";
import HweetForm from "components/HweetForm";
import classes from 'routes/Home.module.css';

const Home = ({ user }) => {
  const [loadingHweets, setLoadingHweets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dbService.collection('hweets').orderBy('createAt','desc').onSnapshot(snapshot => {    
      const hweetArray = snapshot.docs.map(item => ({
        id: item.id,
        ...item.data()
      }));
      console.log(hweetArray);
      setLoadingHweets(hweetArray);
    });
  }, []);

  return (
    <div className={classes.form}>
      {!isEditing && <HweetForm user={user} />}
      <div>
        <ul>
          {loadingHweets.map(item => (
            <Hweet setEditing={setIsEditing} key={item.id} item={item} isAuthor={item.author === user.uid} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;