import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import firebaseAdmin from './config/firebaseConfig';
import { addUserToDB, getToken } from './controllers/user'

const app = express();
const port: number = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', async (req: express.Request, res: express.Response) => {
  const userId: string = req.body.uid;
  const db: firebaseAdmin.firestore.Firestore = firebaseAdmin.firestore();
  const firebaseUser = db.collection("users").doc(userId);
  await firebaseUser.get().then((doc) => {
    if (!doc.exists) {
      addUserToDB(req, res)
    }
  });
  let token:string = await getToken(userId)
  return res.json(token)
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
