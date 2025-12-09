"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const common_util_1 = __importDefault(require("../../utils/common.util"));
class Configuration {
    constructor() {
        this.accessToken = '';
        this.refreshToken = '';
        this.accountType = '';
        this.expiresIn = 0;
        this.companyId = '';
        this.locationId = '';
        this.refreshTokenId = '';
        this.accountUserId = ''; // user id associated with the ghl account and etc
        this.isDeleted = false;
        this.createdAt = common_util_1.default.getCurrentDate();
        this.updatedAt = common_util_1.default.getCurrentDate();
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.repomodel.js.map