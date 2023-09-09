"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.newAccount = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const user_service_1 = require("./user.service");
async function newAccount(email, username, password) {
    try {
        const exists = !!(await (0, user_service_1.getUserData)(email, username));
        if (exists)
            return null;
        const salt = await bcrypt.genSalt(6);
        const hashed = await bcrypt.hash(password, salt);
        const account = await prisma_1.default.user.create({
            data: { email, password: hashed, username, imageUrl: `https://ui-avatars.com/api/?size=200&name=${username}` },
        });
        return account;
    }
    catch (e) {
        console.log(e?.stack);
        throw e;
    }
}
exports.newAccount = newAccount;
async function login(email, password) {
    const user = await (0, user_service_1.getUserData)(email);
    if (!user)
        return null;
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
        return null;
    return user;
}
exports.login = login;
//# sourceMappingURL=auth.service.js.map