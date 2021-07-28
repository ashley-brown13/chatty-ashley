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
exports.addUserToDB = void 0;
const firebaseConfig_1 = __importDefault(require("../config/firebaseConfig"));
const addUserToDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield firebaseConfig_1.default.firestore()
        .collection('users')
        .doc(userData.uid)
        .set(userData);
});
exports.addUserToDB = addUserToDB;
//# sourceMappingURL=user.js.map