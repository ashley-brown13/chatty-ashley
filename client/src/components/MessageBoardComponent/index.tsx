import React, { useRef, useEffect} from 'react';
import firebase from '../../config/firebaseConfig';
import Box from '@material-ui/core/Box';
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

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: 'smooth' });
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
        id="message-board-box"
      >
        {listOfMessages && listOfMessages.map(message => <IndividualMessageComponent key={message.createdAt} message={message} authUser={authUser} />)}
        <span ref={scroll}></span>
      </Box>
    </div>
  );
}

export default MessageBoardComponent
