"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserData = exports.getByUsername = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
async function getByUsername(username) {
    const user = await prisma_1.default.user.findFirst({
        where: { username },
    });
    return user;
}
exports.getByUsername = getByUsername;
async function getUserData(cred, uname) {
    console.log({ cred, uname });
    const user = await prisma_1.default.user.findFirst({
        where: {
            OR: [{ email: cred }, { username: uname || cred }],
        },
    });
    return user;
}
exports.getUserData = getUserData;
async function getUserById(id) {
    const user = await prisma_1.default.user.findFirst({
        where: { id },
    });
    return user;
}
exports.getUserById = getUserById;
//# sourceMappingURL=user.service.js.map