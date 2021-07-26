import React, { useState } from 'react';
import firebase from '../../config/firebaseConfig';
import { Button, TextField } from '@material-ui/core';


const firestore = firebase.firestore();
const messageCollection = firestore.collection('messages');

type AddMessageProps = {
  authUser: string;
}

const AddMessageComponent = ({authUser}: AddMessageProps): JSX.Element => {
  const [formText, setFormText] = useState('')
  const { name, photo, email } = JSON.parse(authUser)

  const addMessage = async (e) => {
    e.preventDefault();

    await messageCollection.add({
      messageBody: formText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: name,
      photoURL: photo,
      email: email
    })

    setFormText('');
  }


  return (
    <div className="add-message-component">
				<form onSubmit={addMessage}>
          <TextField
            id="outlined-basic"
            label="Enter message here"
            variant="outlined" value={formText}
            onChange={(e) => setFormText(e.target.value)}/>
          <Button type="submit" variant="contained" color="primary">Send</Button>
      </form>
    </div>
  );
}

export default AddMessageComponent;
