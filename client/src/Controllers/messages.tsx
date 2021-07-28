import firebase from '../config/firebaseConfig'
import 'firebase/auth';
import 'firebase/firestore';

interface Message {
  formText: string;
  name: string;
  photo: string;
  authEmail: string;
  token: string|undefined;
}

export const sendMessage = async (message: Message): Promise<boolean> => {
  await fetch(`/api/messages/send`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(message),
  });
  return true
}

const firestore: firebase.firestore.Firestore = firebase.firestore();
const messageCollection: firebase.firestore.CollectionReference = firestore.collection('messages');
export const grabMessages = messageCollection.orderBy('createdAt').limitToLast(50);
