import React, { useState } from 'react';
import './App.css';
import firebase from './config/firebaseConfig';
import 'firebase/auth';
import 'firebase/firestore';
import LoginPage from './components/LoginPage';
import AddMessageComponent from './components/AddMessageComponent';
import MessageBoardComponent from './components/MessageBoardComponent';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import logo from './images/ChattyAshleyLogo.png'
import {googleLogin} from './Controllers/login'

const App = (): JSX.Element => {
  const authUser:string | null = window.localStorage.getItem('authUser')
  const [user, setUser] = useState(null || authUser);

  const handleLogin = async () => {
    const localUser = await googleLogin()
    window.localStorage.setItem('authUser', JSON.stringify(localUser));
    setUser(localUser)
  }

  function handleLogout(){
    window.localStorage.removeItem('authUser')
    setUser(null)
  }

  return (
    <div className="App">
      {user ? (
        <>
          <div className="navigation-bar">
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
