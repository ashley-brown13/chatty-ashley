import React, {useEffect, useState} from 'react';
import './App.css';
import firebase from 'firebase/app';
import './config/firebaseConfig';
import 'firebase/auth';
import 'firebase/firestore';
import LoginPage from './components/LoginPage';

const App = (): JSX.Element => {
  const [authorization, setAuthorization] = useState(
    false || window.localStorage.getItem('authorization') === 'true'
  );
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setAuthorization(true);
  //       window.localStorage.setItem('authorization', 'true');
  //     }
  //   });
  // }, []);

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
          setCurrentUser({ displayName, photoURL, uid })
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
      setAuthorization(true);
      window.localStorage.setItem('authorization', 'true');
    }
  }

  return (
    <div className="App">
      {authorization ? (
				null
			) : (
				<LoginPage handleLogin={handleLogin}/>
			)}
    </div>
  );
}

export default App;
