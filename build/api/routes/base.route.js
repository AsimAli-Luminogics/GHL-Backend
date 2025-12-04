"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setup;
const user_routes_1 = __importDefault(require("./user.routes"));
const octoparse_routes_1 = __importDefault(require("./octoparse.routes"));
function setup(app) {
    app.use('/api/v1/user', user_routes_1.default);
    app.use('/api/v1/octoparse', octoparse_routes_1.default);
}
//# sourceMappingURL=base.route.js.map