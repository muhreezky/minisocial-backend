"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const auth_service_1 = require("../services/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const user_service_1 = require("../services/user.service");
async function registerUser(req, res) {
    try {
        const { email, username, password } = req.body;
        const user = await (0, auth_service_1.newAccount)(email, username, password);
        if (!user)
            return res.status(400).json({
                status: 400,
                message: 'Username atau E-mail sudah ada',
                data: null,
            });
        return res
            .status(201)
            .json({ message: 'Akun berhasil dibuat', data: { user } });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, error: e });
    }
}
exports.registerUser = registerUser;
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        console.log('Data', req.body);
        const user = await (0, auth_service_1.login)(email, password);
        console.log('User : ', user);
        if (!user)
            return res.status(400).json({ message: 'Login gagal, cek kembali data anda', data: null });
        const token = jsonwebtoken_1.default.sign({ id: user?.id, username: user?.username }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '7 days',
        });
        return res.status(200).json({
            message: 'Login berhasil',
            data: {
                username: user?.username,
                token,
            },
        });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, error: e });
    }
}
exports.loginUser = loginUser;
async function getMe(req, res) {
    try {
        const token = req.token;
        const user = await (0, user_service_1.getUserById)(token.id);
        if (!user)
            return res.status(404).json({ message: 'User tidak ada', data: null });
        return res.status(200).json({ message: 'User ditemukan', data: { user } });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, error: e });
    }
}
exports.getMe = getMe;
//# sourceMappingURL=auth.controller.js.map