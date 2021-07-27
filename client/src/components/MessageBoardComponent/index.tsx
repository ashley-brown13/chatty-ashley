import React, { useRef, useEffect, useState } from 'react';
import firebase from '../../config/firebaseConfig';
import {Box, Button} from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import IndividualMessageComponent from '../IndividualMessageComponent';
import './MessageBoardComponent.css'

const firestore = firebase.firestore();
const messageCollection = firestore.collection('messages');

type MessageBoardProps = {
  authUser: string;
}

const MessageBoardComponent = ({authUser}: MessageBoardProps): JSX.Element => {
  const scroll = useRef();
  const grabMessages = messageCollection.orderBy('createdAt').limitToLast(50);
  const [listOfMessages]= useCollectionData(grabMessages);
  const [hide, setHide] = useState(true)

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setHide(true)
    }
    if(!bottom && hide === true){
      setHide(false)
    }
  }

  const scrollToBottom = () => {
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom()
  }, [listOfMessages])

  return (
    <div className="message-board">
      <Box
        border={2}
        borderColor="text.primary"
        borderRadius={16}
        display="flex"
        flexDirection="column"
        p="20px"
        bgcolor="#F5F5F5"
        height="90%"
        width="100%"
        id="message-board-box"
        onScroll={handleScroll}
      >
        {!hide && <span id="positioned"><Button hidden={hide} variant="contained" color="secondary" onClick={scrollToBottom}>Scroll to Bottom</Button></span>}
        {listOfMessages && listOfMessages.map(message => <IndividualMessageComponent key={message.createdAt} message={message} authUser={authUser} />)}
        <span ref={scroll}></span>
      </Box>
    </div>
  );
}

export default MessageBoardComponent
