import React, { Fragment, useState } from "react";
import { dbService } from "fbase";

const Hweet = ({ item, isAuthor }) => {
  const [isEditing, setisEditing] = useState(false);
  const [enteredText, setEnteredText] = useState(item.text);

  const onToggleEditHandler = () => {
    setisEditing(prev => !prev);
  };

  const onEditOkHandler = async (event) => {
    event.preventDefault();
    
    await dbService.doc(`hweets/${item.id}`).update('text', enteredText); // update({text: enteredText})도 가능

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
    }
  };

  return (
    <li key={item.id}>
      {isEditing ? (
        <form onSubmit={onEditOkHandler}>
          <input type='text' value={enteredText} onChange={enteredTextHandler} required />
          <button onClick={onToggleEditHandler}>Cancel</button>
          <button onClick={onEditOkHandler}>Edit</button>
        </form>
      ) : (
        <Fragment>
          <p>{item.text}</p>
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