import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './IndividualMessage.css';
import firebase from '../../config/firebaseConfig'

type IndMessageUserProps = {
  authUser: string;
  message: firebase.firestore.DocumentData;
}

const IndividualMessage = ({authUser, message}: IndMessageUserProps ): JSX.Element => {
  const { authEmail } = JSON.parse(authUser)

  const { displayName, email, photoURL, messageBody, createdAt } = message;
  let formattedDate: string | null = null
  if(createdAt){
    formattedDate = createdAt.toDate().toString().slice(4, 16)
  }

  const messageType:string = email === authEmail ? 'owner' : 'recipient';

  return (
    <div className={`message-${messageType}`}>
      <Avatar alt={displayName} src={photoURL} id='avatar'/>
      <div className={`message-${messageType}-info`}>
        <div className='message-name-date'>
          <p id='ind-message-display-name'>{displayName}</p>
          <p id='ind-message-date'>{formattedDate}</p>
        </div>
          <p id='ind-message-message-body'>{messageBody}</p>
      </div>
    </div>
  )
}

export default IndividualMessage
