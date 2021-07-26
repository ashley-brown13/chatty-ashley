import React from 'react';
import firebase from '../../config/firebaseConfig';
import { Box } from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import IndividualMessageComponent from '../IndividualMessageComponent';

const firestore = firebase.firestore();
const messageCollection = firestore.collection('messages');

type MessageBoardProps = {
  authUser: string;
}

const MessageBoardComponent = ({authUser}: MessageBoardProps): JSX.Element => {

  const grabMessages = messageCollection.orderBy('createdAt').limitToLast(50);
  const [listOfMessages]= useCollectionData(grabMessages);

  return (
    <Box>
      {listOfMessages && listOfMessages.map(message => <IndividualMessageComponent key={message.createdAt} message={message} authUser={authUser} />)}
    </Box>
  );
}

export default MessageBoardComponent
