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
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordIncorret = exports.createBodyUser = void 0;
const faker_1 = require("@faker-js/faker");
function createBodyUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            email: faker_1.faker.internet.email(),
            password: "test1*",
            confirmPassword: "test1*"
        };
    });
}
exports.createBodyUser = createBodyUser;
function passwordIncorret() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            email: faker_1.faker.internet.email(),
            password: "test1*",
            confirmPassword: "test1*"
        };
    });
}
exports.passwordIncorret = passwordIncorret;
