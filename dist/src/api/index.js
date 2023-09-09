"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emojis_1 = __importDefault(require("./emojis"));
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const post_1 = __importDefault(require("./post"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    });
});
router.use('/emojis', emojis_1.default);
router.use('/auth', auth_1.default);
router.use('/u', user_1.default);
router.use('/posts', post_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map