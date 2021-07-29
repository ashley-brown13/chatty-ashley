import admin from '../config/firebaseConfig';

const firestore: admin.firestore.Firestore = admin.firestore();

interface UserData {
  displayName: string;
  uid: string;
  email: string;
  photoURL: string;
}

export const addUserToDB = async (userData:UserData ) => {
  await admin.firestore()
    .collection('users')
    .doc(userData.uid)
    .set(userData);
}

export const checkIfUserExistsInDB = async (uid: string) => {
  const firebaseUser = await firestore.collection("users").doc(uid);
  const userDocument = await firebaseUser.get();
  return userDocument;
}
