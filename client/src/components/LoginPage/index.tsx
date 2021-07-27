import React from 'react';
import { Button } from '@material-ui/core';
import './LoginPage.css'
import loginPageLogo from '../../images/ChattyAshley.png'

type AppProps = {
  handleLogin: () => void;
}

const LoginPage = ({ handleLogin }: AppProps): JSX.Element => {

  return (
    <div className="login-page">
        <img src={loginPageLogo} alt='logo' id='login-logo-image'/>
        <Button onClick={handleLogin} variant="contained" color="secondary" size="large" id="login-button">Google Login</Button>
    </div>
  );
}

export default LoginPage;
