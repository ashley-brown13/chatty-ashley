import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import MessageForm from './components/MessageForm';
import MessageBoard from './components/MessageBoard';
import {Button} from '@material-ui/core';
import logo from './images/ChattyAshleyLogo.png';
import {googleLogin} from './Controllers/login';
import ErrorNotification from './components/ErrorNotification';

interface Error {
  title?: string;
  description?: string;
}

const App = (): JSX.Element => {
  const authUser = window.localStorage.getItem('authUser');
  const [user, setUser] = useState<string | null>(null || authUser);
  const [error, setError] = useState<Error | null>(null);

  const handleLogin = async (): Promise<void> => {
    const localUser = await googleLogin();
    if(!localUser.name){
      setError({
        title: "Login Error",
        description: "The system was unable to log you in."
      });
    } else {
      const stringedUser: string = JSON.stringify(localUser);
      window.localStorage.setItem('authUser', stringedUser);
      setUser(stringedUser);
    }
  }

  const handleLogout = (): void => {
    window.localStorage.removeItem('authUser');
    setUser(null);
  }

  return (
      <div className="App">
        {user ? (
          <>
            <div id="navigation-bar">
              <img src={logo} alt="logo" id='logo-image'/>
              <Button variant="contained" color="secondary" id="logout" onClick={handleLogout}>Logout</Button>
            </div>
              <MessageBoard authUser={user} setError={setError}/>
              <MessageForm authUser={user} setError={setError}/>
          </>
        ) : (
          <LoginPage handleLogin={handleLogin}/>
        )}
        <ErrorNotification error={error} setError={setError}/>
      </div>
  );
}

export default App;
