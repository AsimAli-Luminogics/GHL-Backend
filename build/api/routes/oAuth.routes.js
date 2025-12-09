"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oauth_controller_1 = __importDefault(require("../controllers/oauth/oauth.controller"));
const router = (0, express_1.Router)();
// Octoparse OAuth Routes
router.post('/octoparse/token', oauth_controller_1.default.generateToken);
router.post('/octoparse/token/refresh', oauth_controller_1.default.refreshToken);
// GHL OAuth Routes
router.get('/ghl/authUri', oauth_controller_1.default.authUri);
router.get('/callback', oauth_controller_1.default.ghlCallback);
// router.post('/ghl/token/refresh', OAuthController.ghlRefreshToken);
router.get('/ghl/authDetails', oauth_controller_1.default.getGHLAuthDetails);
exports.default = router;
//# sourceMappingURL=oAuth.routes.js.map