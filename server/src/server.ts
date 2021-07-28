import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import firebaseAdmin from './config/firebaseConfig';
import { addUserToDB } from './controllers/user';

const app = express();
const port: number = 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const firestore: firebaseAdmin.firestore.Firestore = firebaseAdmin.firestore();
const messageCollection: firebaseAdmin.firestore.CollectionReference = firestore.collection('messages');

app.post('/api/login', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userId: string = req.body.uid;
  const userData = req.body;
  const firebaseUser = firestore.collection("users").doc(userId);
  await firebaseUser.get().then((doc) => {
    if (!doc.exists) {
      addUserToDB(userData)
    }
  });
  return res.json({success: true})
});

app.post('/api/messages/send', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { formText, name, photo, authEmail, token } = req.body;
  await firebaseAdmin
    .auth()
    .verifyIdToken(token)
  await messageCollection.add({
    messageBody: formText,
    createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    displayName: name,
    photoURL: photo,
    email: authEmail
  })
  return res.json({success: true})
})

app.use((req: express.Request, res: express.Response) => {
  res.status(500);
  res.json({
    message: 'Server Error'
  });
});


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = app;
