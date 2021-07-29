import React, { useRef, useEffect, useState } from 'react';
import {Box, Button} from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import IndividualMessage from '../IndividualMessage';
import './MessageBoard.css'
import {grabMessages} from '../../Controllers/messages'

type MessageBoardProps = {
  authUser: string;
  setError: (error) => void;
}

type Hide = boolean

const MessageBoard = ({authUser, setError}: MessageBoardProps): JSX.Element => {
  const scroll = useRef();
  const [listOfMessages, loading, error]= useCollectionData(grabMessages);
  const [hide, setHide] = useState<Hide>(true)

  const handleScroll = (e) => {
    const bottom: boolean = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setHide(true)
    }
    if(!bottom && hide === true){
      setHide(false)
    }
  }

  if(error){
    setError({
      title: "Server Error",
      description: "There was an error on the server. Messages cannot be loaded."
    })
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
        {listOfMessages && listOfMessages.map(message => <IndividualMessage key={message.createdAt} message={message} authUser={authUser} />)}
        <span ref={scroll}></span>
      </Box>
    </div>
  );
}

export default MessageBoard
