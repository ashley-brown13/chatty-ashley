import firebase from '../config/firebaseConfig'
import 'firebase/auth';
import 'firebase/firestore';

interface User {
  name?:string;
  authEmail?:string;
  photo?:string;
}

export const googleLogin = async (): Promise<User> => {
  const payload = await firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  const displayName = payload.user?.displayName
  const photoURL = payload.user?.photoURL
  const uid = payload.user?.uid
  const email = payload.user?.email
  const localUser = await login({ displayName, photoURL, uid, email })
  return localUser
};

async function login(user): Promise<User>{
  await fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(user),
  });
  const { displayName, email, photoURL } = user
  const localUser:User = {
    name: displayName,
    authEmail: email,
    photo: photoURL
  }
  return localUser
}
