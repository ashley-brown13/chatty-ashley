import React, { useState } from 'react';
import firebase from '../../config/firebaseConfig';
import { Button, TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import './AddMessageComponent.css'

const firestore = firebase.firestore();
const messageCollection = firestore.collection('messages');

type AddMessageProps = {
  authUser: string;
}

const AddMessageComponent = ({authUser}: AddMessageProps): JSX.Element => {
  const [formText, setFormText] = useState('')
  const { name, photo, authEmail } = JSON.parse(authUser)

  const addMessage = async (e) => {
    e.preventDefault();

    await messageCollection.add({
      messageBody: formText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: name,
      photoURL: photo,
      email: authEmail
    })

    setFormText('');
  }

  return (
    <div className="add-message-component">
				<form onSubmit={addMessage} className="add-message-form">
          <TextField
            multiline
            rows={2}
            id="outlined-basic"
            className="add-message-text-field"
            label="Enter message here"
            variant="outlined" value={formText}
            onChange={(e) => setFormText(e.target.value)}/>
          <Button type="submit" variant="contained" color="primary" id="send-message-button" endIcon={<Icon>send</Icon>}>Send</Button>
      </form>
    </div>
  );
}

export default AddMessageComponent;
