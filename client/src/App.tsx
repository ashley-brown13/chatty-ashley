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

interface User {
  name?:string;
  authEmail?:string;
  photo?:string;
}

const App = (): JSX.Element => {
  const authUser:string | null = window.localStorage.getItem('authUser')
  const [user, setUser] = useState(null || authUser);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((payload) => {
        if (payload) {
          const displayName = payload.user?.displayName
          const photoURL = payload.user?.photoURL
          const uid = payload.user?.uid
          const email = payload.user?.email
          login({ displayName, photoURL, uid, email })
        }
      });
  };

  async function login(user){
    const response = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user),
    });
    if(response.ok) {
      const { displayName, email, photoURL } = user
      const localUser:User = {
        name: displayName,
        authEmail: email,
        photo: photoURL
      }
      setUser(JSON.stringify(localUser))
      window.localStorage.setItem('authUser', JSON.stringify(localUser));
    }
  }

  function handleLogout(){
    window.localStorage.removeItem('authUser')
    setUser(null)
  }

  return (
    <div className="App">
      {user ? (
        <div>
          <div className="navigation-bar">
            <img src={logo} alt={logo} id='logo-image'/>
            <ExitToAppRoundedIcon onClick={handleLogout} color="secondary" id='logout'/>
          </div>
            <MessageBoardComponent authUser={user}/>
            <AddMessageComponent authUser={user}/>
        </div>
			) : (
				<LoginPage handleLogin={handleLogin}/>
			)}
    </div>
  );
}

export default App;
