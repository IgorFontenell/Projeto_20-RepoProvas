"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cryptr = new cryptr_1.default(process.env.CRYPTR_SECRET);
function encrypt(value) {
    return cryptr.encrypt(value);
}
exports.encrypt = encrypt;
function decrypt(encryptedValue) {
    return cryptr.decrypt(encryptedValue);
}
exports.decrypt = decrypt;
