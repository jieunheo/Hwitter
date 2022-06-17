import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "fbase";

const Hweet = ({ item, isAuthor }) => {
  const [isEditing, setisEditing] = useState(false);
  const [enteredText, setEnteredText] = useState(item.text);
  const [imageUrl, setImageUrl] = useState('');

  const onToggleEditHandler = () => {
    setisEditing(prev => !prev);
  };

  const onEditOkHandler = async (event) => {
    event.preventDefault();

    await dbService.doc(`hweets/${item.id}`).update({text: enteredText});
    if(imageUrl !== '') {
      const fileRef = storageService.ref().child(`${item.author}/${uuidv4()}`);
      const response = await fileRef.putString(imageUrl, 'data_url');
      const fileUrl = await response.ref.getDownloadURL();
      await dbService.doc(`hweets/${item.id}`).update({url: fileUrl});
    }

    setisEditing(false);
  };

  const enteredTextHandler = (event) => {
    const {target: { value }} = event;
    setEnteredText(value);
  };

  const onDeleteHandler = async () => {
    const ok = window.confirm('Realy???');

    
    if(ok) {
      await dbService.doc(`hweets/${item.id}`).delete();
      await storageService.refFromURL(item.url).delete();
    }
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
    <li key={item.id}>
      {isEditing ? (
        <form onSubmit={onEditOkHandler}>
          <input type='text' value={enteredText} onChange={enteredTextHandler} required />
          <input
            type='file'
            accept='image/*'
            onChange={onFileChangeHandler}
          />
          {item.url && !imageUrl && <img alt='loaded img' src={item.url} />}
          {imageUrl && (
            <div>
              <img alt='loaded img' src={imageUrl} />
              <button onClick={onClearImageHandler}>Clear</button>
            </div>
          )}
          <button onClick={onToggleEditHandler}>Cancel</button>
          <button onClick={onEditOkHandler}>Edit</button>
        </form>
      ) : (
        <Fragment>
          <p>{item.text}</p>
          {item.url && <img src={item.url} alt='hweet img' />}
          {isAuthor && (
            <Fragment>
              <button onClick={onToggleEditHandler}>Edit</button>
              <button onClick={onDeleteHandler}>Delete</button>
            </Fragment>
          )}
        </Fragment>
      )}
    </li>
  );
};

export default Hweet;