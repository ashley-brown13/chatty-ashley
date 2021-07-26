import React, { useState } from 'react';
import './App.css';
import firebase from './config/firebaseConfig';
import 'firebase/auth';
import 'firebase/firestore';
import LoginPage from './components/LoginPage';
import AddMessageComponent from './components/AddMessageComponent';
// import AddMessageComponent from './components/AddMessageComponent';

interface User {
  name?:string;
  email?:string;
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
        email: email,
        photo: photoURL
      }
      setUser(JSON.stringify(localUser))
      window.localStorage.setItem('authUser', JSON.stringify(localUser));
    }
  }

  return (
    <div className="App">
      {user ? (
				<AddMessageComponent authUser={user}/>
			) : (
				<LoginPage handleLogin={handleLogin}/>
			)}
    </div>
  );
}

export default App;
