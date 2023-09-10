"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = void 0;
const user_service_1 = require("../services/user.service");
async function getUserByUsername(req, res) {
    const { username } = req.params;
    const user = await (0, user_service_1.getByUsername)(username);
    if (!user)
        return res.status(404).json({ message: 'User tidak ditemukan', data: null });
    return res.status(200).json({
        message: 'User ditemukan',
        data: { user }
    });
}
exports.getUserByUsername = getUserByUsername;
//# sourceMappingURL=user.controller.js.map