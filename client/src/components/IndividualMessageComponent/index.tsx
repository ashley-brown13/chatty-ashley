import React from 'react';
import {Avatar} from '@material-ui/core';

type IndMessageUserProps = {
  authUser: string;
  message: any;
}

const IndividualMessageComponent = ({authUser, message}: IndMessageUserProps ): JSX.Element => {
  const { authEmail } = JSON.parse(authUser)

  const { displayName, email, photoURL, messageBody } = message;

  const messageType = email === authEmail ? 'owner' : 'recipent';

  return (
    <div className={`message-${messageType}`}>
      <Avatar alt={displayName} src={photoURL} />
      <p>{displayName}</p>
      <p>{messageBody}</p>
    </div>
  )
}

export default IndividualMessageComponent
