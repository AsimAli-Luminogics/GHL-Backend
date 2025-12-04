"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.octoparseUtil = void 0;
const axios_1 = __importDefault(require("axios"));
class OctoparseUtil {
    async octoparsePostRequest(url, data) {
        const response = await axios_1.default.post(`${process.env.octoparseUri}/${url}`, data, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        return response.data;
    }
    async octoparseGetRequest(url) {
        const response = await axios_1.default.get(`${process.env.octoparseUri}${url}`, {
            headers: {
                Authorization: `Bearer ${process.env.telnyxApiKey}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        return response.data;
    }
}
exports.octoparseUtil = new OctoparseUtil();
//# sourceMappingURL=octoparse.util.js.map