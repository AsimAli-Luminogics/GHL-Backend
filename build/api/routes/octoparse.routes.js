"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const octoparse_controller_1 = __importDefault(require("../controllers/octoparse/octoparse.controller"));
const router = (0, express_1.Router)();
router.post('/token', octoparse_controller_1.default.generateToken);
router.post('/token/refresh', octoparse_controller_1.default.refreshToken);
exports.default = router;
//# sourceMappingURL=octoparse.routes.js.map