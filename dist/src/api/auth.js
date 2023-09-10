"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authRoute = (0, express_1.Router)();
authRoute.post('/register', auth_controller_1.registerUser);
authRoute.post('/login', auth_controller_1.loginUser);
authRoute.get('/me', auth_middleware_1.verifyUser, auth_controller_1.getMe);
exports.default = authRoute;
//# sourceMappingURL=auth.js.map