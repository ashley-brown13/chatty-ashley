import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import AddMessageComponent from './components/AddMessageComponent';
import MessageBoardComponent from './components/MessageBoardComponent';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import logo from './images/ChattyAshleyLogo.png'
import {googleLogin} from './Controllers/login'

const App = (): JSX.Element => {
  const authUser:string | null = window.localStorage.getItem('authUser')
  const [user, setUser] = useState<string | null>(null || authUser);

  const handleLogin = async (): Promise<void> => {
    const localUser = await googleLogin()
    const stringedUser: string = JSON.stringify(localUser)
    window.localStorage.setItem('authUser', stringedUser);
    setUser(stringedUser)
  }

  const handleLogout = (): void => {
    window.localStorage.removeItem('authUser')
    setUser(null)
  }

  return (
    <div className="App">
      {user ? (
        <>
          <div id="navigation-bar">
            <img src={logo} alt="logo" id='logo-image'/>
            <ExitToAppRoundedIcon onClick={handleLogout} color="secondary" id='logout'/>
          </div>
            <MessageBoardComponent authUser={user}/>
            <AddMessageComponent authUser={user}/>
        </>
			) : (
				<LoginPage handleLogin={handleLogin}/>
			)}
    </div>
  );
}

export default App;
