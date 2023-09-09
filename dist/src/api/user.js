"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const userRoute = (0, express_1.Router)();
userRoute.get('/:username', user_controller_1.getUserByUsername);
exports.default = userRoute;
//# sourceMappingURL=user.js.map