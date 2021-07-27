import admin from '../config/firebaseConfig';
import { Request, Response } from 'express';

interface UserData {
  displayName: string;
  uid: string;
  email: string;
  photoURL: string;
}



export const addUserToDB = async (req: Request, res: Response) => {
    const userData: UserData = req.body;

    await admin.firestore()
      .collection('users')
      .doc(userData.uid)
      .set(userData)
}

export const getToken = async (userId) => {
  const token: string = await admin.auth().createCustomToken(userId)
  return token
}
