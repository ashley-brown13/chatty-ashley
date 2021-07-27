import React from 'react';
import { Button } from '@material-ui/core';
import './LoginPage.css'

type AppProps = {
  handleLogin: () => void;
}

const LoginPage = ({ handleLogin }: AppProps): JSX.Element => {

  return (
    <div className="login-page">
        <Button onClick={handleLogin} variant="outlined" color="primary" className="login-button">Google Login</Button>
    </div>
  );
}

export default LoginPage;
