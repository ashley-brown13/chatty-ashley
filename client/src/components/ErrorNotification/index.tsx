import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

type ErrorProps = {
  error: {
    title: string;
    description: string;
  }
  setError: (error) => void;
}

const ErrorNotification = ({error, setError}: ErrorProps ): JSX.Element => {

  const handleClose = () => {
    setError(null)
  }

  return (
    <Dialog
      open={!!error}
      onClose={handleClose}
      aria-labelledby="error-title"
      aria-describedby="error-description"
    >
    <DialogTitle id="error-title">{error?.title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="error-description">
        {error?.description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary" autoFocus>
        Ok
      </Button>
    </DialogActions>
    </Dialog>
  )
}

export default ErrorNotification
