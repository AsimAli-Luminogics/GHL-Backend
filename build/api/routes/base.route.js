"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setup;
const oAuth_routes_1 = __importDefault(require("./oAuth.routes"));
function setup(app) {
    app.use('/api/v1/auth', oAuth_routes_1.default);
}
//# sourceMappingURL=base.route.js.map