import React from 'react';
import {Avatar} from '@material-ui/core';
import './IndividualMessageComponent.css';

type IndMessageUserProps = {
  authUser: string;
  message: any;
}

const IndividualMessageComponent = ({authUser, message}: IndMessageUserProps ): JSX.Element => {
  const { authEmail } = JSON.parse(authUser)

  const { displayName, email, photoURL, messageBody, createdAt } = message;
  const Date = createdAt.toDate()
  const formattedDate = Date.toString().slice(4, 16)

  const messageType = email === authEmail ? 'owner' : 'recipient';

  return (
    <div className={`message-${messageType}`}>
      <Avatar alt={displayName} src={photoURL} className='avatar'/>
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

export default IndividualMessageComponent
