import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

import Hweet from "components/Hweet";
import HweetForm from "components/HweetForm";

const Home = ({ user }) => {
  const [loadingHweets, setLoadingHweets] = useState([]);

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
    <div>
      <HweetForm user={user} />
      <div>
        <ul>
          {loadingHweets.map(item => (
            <Hweet key={item.id} item={item} isAuthor={item.author === user.uid} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;