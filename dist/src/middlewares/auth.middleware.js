"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function unauthed() {
    return express_1.response.status(401).json({ message: 'Maaf, anda tidak boleh masuk' });
}
function verifyUser(req, res, next) {
    try {
        const bearer = req.headers.authorization;
        if (!bearer)
            return unauthed();
        const token = bearer.split(' ')[1];
        if (!token)
            return unauthed();
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        req.token = decoded;
        next();
    }
    catch (e) {
        return res.status(500).json({ message: e.message, error: e });
    }
}
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.middleware.js.map