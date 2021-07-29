import * as functions from 'firebase-functions';
import { https } from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import firebaseAdmin from './config/firebaseConfig';
import { addUserToDB, checkIfUserExistsInDB } from './controllers/user';
import { addMessageToDB } from './controllers/message'

const app = express();
const port: number = 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/api/login', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { displayName, photoURL, uid, email } = req.body;
    const userDocument = await checkIfUserExistsInDB(uid);
    if (!userDocument.exists) {
      await addUserToDB({ displayName, photoURL, uid, email });
    }
    return res.json({success: true})
  } catch (e) {
    return next();
  }
});

app.post('/api/messages/send', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await addMessageToDB(req.body);
    return res.json({success: true});
  } catch (e) {
    return next();
  }
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

exports.app = https.onRequest(app);
