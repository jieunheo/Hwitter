import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "fbase";

import classes from 'components/HweetForm.module.css';

const HweetForm = ({ user }) => {
  const [enteredText, setEnteredText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const enteredTextHandler = (event) => {
    const {target: { value }} = event;
    setEnteredText(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    let fileUrl = '';
    if(imageUrl) {
      const fileRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
      const response = await fileRef.putString(imageUrl, 'data_url');
      fileUrl = await response.ref.getDownloadURL();
    }
    const hweet = {
      text: enteredText,
      createAt: Date.now(),
      author: user.uid,
      url: fileUrl
    }
    console.log(hweet);

    await dbService.collection('hweets').add(hweet);
    setEnteredText('');
    setImageUrl('');
  };
  
  const onFileChangeHandler = (event) => {
    const {target: { files }} = event;
    const getFile = files[0];
    
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {currentTarget: { result }} = finishedEvent;
      setImageUrl(result);
    };
    reader.readAsDataURL(getFile);
  };

  const onClearImageHandler = () => {
    setImageUrl('');
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input
        type='text'
        placeholder='What is tour mind?'
        maxLength={120}
        onChange={enteredTextHandler}
        value={enteredText}
      />
      <label htmlFor='file'>add file</label>
      <input
        type='file'
        id='file'
        accept='image/*'
        onChange={onFileChangeHandler}
      />
      <button>Twieet</button>
      {imageUrl && (
        <div className={classes['image-wrap']}>
          <img alt='loaded img' src={imageUrl} />
          <button onClick={onClearImageHandler}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default HweetForm;