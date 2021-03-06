import React, { useState } from 'react';
import firebase from '../../config/firebaseConfig';
import { sendMessage } from '../../Controllers/messages'
import { Button, TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import './MessageForm.css'

type MessageFormProps = {
  authUser: string;
  setError: (error) => void;
}

type FormText = string

const MessageForm = ({authUser, setError}: MessageFormProps): JSX.Element => {
  const [formText, setFormText] = useState<FormText>('');
  const { name, photo, authEmail } = JSON.parse(authUser);

  const addMessage = async (e): Promise<void> => {
    e.preventDefault();
    const token: string|undefined = await firebase.auth().currentUser?.getIdToken();
    const sent = await sendMessage({formText, name, photo, authEmail, token});
    if(sent){
      setFormText('');
    } else {
      const stringedError = JSON.stringify({
        title: "Server Error",
        description: "There was an error on the server. The system was unable to send your message."
      })
      setError(stringedError);
    }
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

export default MessageForm;
