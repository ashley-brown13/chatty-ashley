import admin from '../config/firebase-config';
import { Request, Response } from 'express';

export const addUserToDB = async (req: Request, res: Response) => {
    const {
      displayName,
      uid,
      email,
      photoURL
    } = req.body;

    await admin.firestore()
      .collection('users')
      .doc(uid)
      .set({ uid, displayName, email, photoURL })
}
