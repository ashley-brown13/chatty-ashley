"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const firebaseConfig_1 = __importDefault(require("./config/firebaseConfig"));
const user_1 = require("./controllers/user");
const app = express_1.default();
const port = 5000;
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.json());
const firestore = firebaseConfig_1.default.firestore();
const messageCollection = firestore.collection('messages');
app.post('/api/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.uid;
    const userData = req.body;
    const firebaseUser = firestore.collection("users").doc(userId);
    yield firebaseUser.get().then((doc) => {
        if (!doc.exists) {
            user_1.addUserToDB(userData);
        }
    });
    return res.json({ success: true });
}));
app.post('/api/messages/send', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { formText, name, photo, authEmail, token } = req.body;
    yield firebaseConfig_1.default
        .auth()
        .verifyIdToken(token);
    yield messageCollection.add({
        messageBody: formText,
        createdAt: firebaseConfig_1.default.firestore.FieldValue.serverTimestamp(),
        displayName: name,
        photoURL: photo,
        email: authEmail
    });
    return res.json({ success: true });
}));
app.use((req, res) => {
    res.status(500);
    res.json({
        message: 'Server Error'
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.app = firebase_functions_1.https.onRequest(app);
//# sourceMappingURL=server.js.map