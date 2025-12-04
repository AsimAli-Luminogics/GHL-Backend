"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const user_repository_1 = require("../repository/user/user.repository");
const octoparse_util_1 = require("../../utils/octoparse.util");
const user_repomodel_1 = require("../../database/repomodels/user.repomodel");
const dataCopier_util_1 = require("../../utils/dataCopier.util");
const constants_util_1 = __importDefault(require("../../utils/constants.util"));
dotenv_1.default.config();
class OctoparseService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async generateToken(req) {
        const reqTemp = req;
        const getUser = await this.userRepository.getOne({
            type: 'octoparse',
        }, '+octoparseAccessToken +octoparseRefreshToken +octoparseTokenExpiry');
        let validateUser;
        if (!getUser) {
            const token = await octoparse_util_1.octoparseUtil.octoparsePostRequest('/token', {
                username: process.env.octoparseUsername,
                password: process.env.octoparsePassword,
                grant_type: 'password',
            });
            const updateData = {
                octoparseAccessToken: token.data.access_token,
                octoparseRefreshToken: token.data.refresh_token,
                octoparseTokenExpiry: Date.now() + Number(token.data.expires_in) * 1000,
                type: 'octoparse',
            };
            const newUser = new user_repomodel_1.User();
            validateUser = dataCopier_util_1.DataCopier.copy(newUser, updateData);
            await this.userRepository.create(validateUser);
            return [true, validateUser];
        }
        return [true, getUser];
    }
    async refreshToken(req) {
        const getUser = await this.userRepository.getOne({
            type: 'octoparse',
        }, '+octoparseAccessToken +octoparseRefreshToken +octoparseTokenExpiry');
        const token = await octoparse_util_1.octoparseUtil.octoparsePostRequest('/token', {
            refresh_token: getUser?.octoparseRefreshToken,
            grant_type: 'refresh_token',
        });
        const updateData = {
            octoparseAccessToken: token.data.access_token,
            octoparseRefreshToken: token.data.refresh_token,
            octoparseTokenExpiry: Date.now() + Number(token.data.expires_in) * 1000,
        };
        const validateUser = dataCopier_util_1.DataCopier.copy(getUser, updateData);
        await this.userRepository.updateByOne({ type: 'octoparse' }, validateUser);
        return [true, constants_util_1.default.successUpdateMessage('Token')];
    }
}
exports.default = OctoparseService;
//# sourceMappingURL=octoparse.service.js.map