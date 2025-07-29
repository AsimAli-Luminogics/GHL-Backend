"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_util_1 = __importDefault(require("../../utils/common.util"));
class User {
    constructor() {
        this.name = '';
        this.email = '';
        this.password = '';
        this.role = '';
        this.isActive = false;
        this.phone = '';
        this.gender = '';
        this.isDeleted = false;
        this.sessionIds = Array();
        this.createdAt = common_util_1.default.getCurrentDate();
        this.updatedAt = common_util_1.default.getCurrentDate();
    }
}
exports.User = User;
//# sourceMappingURL=user.repomodel.js.map