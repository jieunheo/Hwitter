import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

import Hweet from "components/Hweet";

const Home = ({ user }) => {
  const [enteredText, setEnteredText] = useState('');
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

  const enteredTextHandler = (event) => {
    const {target: { value }} = event;
    setEnteredText(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    await dbService.collection('hweets').add({
      text: enteredText,
      createAt: Date.now(),
      author: user.uid
    });
    setEnteredText('');
  };
  
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='What is tour mind?'
          maxLength={120}
          onChange={enteredTextHandler}
          value={enteredText}
        />
        <button>Twieet</button>
      </form>
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