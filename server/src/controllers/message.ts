import admin from '../config/firebaseConfig';

const firestore: admin.firestore.Firestore = admin.firestore();
const messageCollection: admin.firestore.CollectionReference = firestore.collection('messages');

interface MessageInfo {
  formText: string;
  name: string;
  authEmail: string;
  token: string;
  photo: string;
}

export const addMessageToDB = async (messageInfo: MessageInfo ) => {
  const { formText, name, photo, authEmail, token } = messageInfo;
  await admin
      .auth()
      .verifyIdToken(token);
  await messageCollection.add({
    messageBody: formText,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    displayName: name,
    photoURL: photo,
    email: authEmail
  });
}
