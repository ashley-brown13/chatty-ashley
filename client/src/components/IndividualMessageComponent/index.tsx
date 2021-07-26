import React from 'react';
import {Avatar} from '@material-ui/core';

type IndMessageUserProps = {
  authUser: string;
  message: any;
}

const IndividualMessageComponent = ({authUser, message}: IndMessageUserProps ): JSX.Element => {
  const { authEmail } = JSON.parse(authUser)

  const { displayName, email, photoURL, messageBody, createdAt } = message;
  const Date = createdAt.toDate()
  const formattedDate = Date.toString().slice(4, 16)

  const messageType = email === authEmail ? 'owner' : 'recipent';

  return (
    <div className={`message-${messageType}`}>
      <Avatar alt={displayName} src={photoURL} />
      <div className='message-name-date-body'>
        <div className='message-name-date'>
          <p>{displayName}</p>
          <p>{formattedDate}</p>
        </div>
        <p>{messageBody}</p>
      </div>
    </div>
  )
}

export default IndividualMessageComponent
