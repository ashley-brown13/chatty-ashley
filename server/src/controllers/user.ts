import admin from '../config/firebaseConfig';
import { Request, Response, NextFunction } from 'express';

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
      .set(userData)
}
