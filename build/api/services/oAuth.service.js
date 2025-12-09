"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const configuration_repository_1 = require("../repository/configuration/configuration.repository");
const oAuth_util_1 = require("../../utils/oAuth.util");
const constants_util_1 = __importDefault(require("../../utils/constants.util"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
class OAuthService {
    constructor() {
        this.configurationRepository = new configuration_repository_1.ConfigurationRepository();
    }
    // Octoparse OAuth Methods
    async generateToken(req) {
        const reqTemp = req;
        const getConfiguration = await this.configurationRepository.getOne({
            accountType: 'octoparse',
        }, '+accessToken +refreshToken +expiresIn');
        if (!getConfiguration) {
            const token = await oAuth_util_1.oAuthUtil.postRequest(`${process.env.octoparseUri}/token`, {
                username: process.env.octoparseConfigurationname,
                password: process.env.octoparsePassword,
                grant_type: 'password',
            });
            const updateData = {
                accessToken: token.data.access_token,
                refreshToken: token.data.refresh_token,
                expiresIn: Date.now() + Number(token.data.expires_in) * 1000,
                accountType: 'octoparse',
            };
            const validateConfiguration = await oAuth_util_1.oAuthUtil.createAuth(updateData);
            return [true, validateConfiguration];
        }
        return [true, getConfiguration];
    }
    async refreshToken(req) {
        const getConfiguration = await this.configurationRepository.getOne({
            type: 'octoparse',
        }, '+octoparseAccessToken +octoparseRefreshToken +octoparseTokenExpiry');
        const token = await oAuth_util_1.oAuthUtil.postRequest(`${process.env.octoparseUri}/token`, {
            refresh_token: getConfiguration?.refreshToken,
            grant_type: 'refresh_token',
        });
        const updateData = {
            octoparseAccessToken: token.data.access_token,
            octoparseRefreshToken: token.data.refresh_token,
            octoparseTokenExpiry: Date.now() + Number(token.data.expires_in) * 1000,
        };
        await oAuth_util_1.oAuthUtil.updateAuth(getConfiguration, updateData, 'octoparse');
        return [true, constants_util_1.default.successUpdateMessage('Token')];
    }
    // GHL OAuth Methods
    async authUri(req) {
        const base = 'https://marketplace.gohighlevel.com/oauth/chooselocation';
        const state = crypto_1.default.randomBytes(16).toString('hex');
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.GHL_CLIENT_ID,
            redirect_uri: process.env.GHL_REDIRECT_URI,
            scope: 'contacts.readonly contacts.write locations.readonly charges.readonly charges.write',
            state: state,
        });
        return [true, `${base}?${params.toString()}`];
    }
    async ghlCallback(req) {
        const { code } = req.query;
        const token = await oAuth_util_1.oAuthUtil.ghlServiceRequest(`${process.env.GHL_SERVICE_CONNECTION_URI}/token`, {
            client_id: process.env.GHL_CLIENT_ID,
            client_secret: process.env.GHL_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.GHL_REDIRECT_URI,
        });
        const updateData = {
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            expiresIn: Date.now() + Number(token.expires_in) * 1000,
            accountType: 'ghl',
            companyId: token.companyId,
            locationId: token.locationId,
            refreshTokenId: token.refreshTokenId,
            accountUserId: token.userId,
        };
        const createdAuth = await oAuth_util_1.oAuthUtil.createAuth(updateData);
        console.log('token123', token);
        return [true, createdAuth];
    }
    async refreshGHLToken(req) {
        const getConfiguration = await this.configurationRepository.getOne({
            accountType: 'ghl',
        }, '+accessToken +refreshToken +expiresIn +refreshTokenId +companyId +locationId +accountUserId');
        const token = await oAuth_util_1.oAuthUtil.ghlServiceRequest(`${process.env.GHL_SERVICE_CONNECTION_URI}/token`, {
            client_id: process.env.GHL_CLIENT_ID,
            client_secret: process.env.GHL_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: getConfiguration?.refreshToken,
            refresh_token_id: getConfiguration?.refreshTokenId,
        });
        const updateData = {
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            expiresIn: Date.now() + Number(token.expires_in) * 1000,
            refreshTokenId: token.refreshTokenId,
        };
        await oAuth_util_1.oAuthUtil.updateAuth(getConfiguration, updateData, 'ghl');
        return [true, constants_util_1.default.successUpdateMessage('GHL Token')];
    }
    async getGHLAuthDetails(req) {
        const getConfiguration = await this.configurationRepository.getOne({
            accountType: 'ghl',
        }, '+accessToken +refreshToken +expiresIn +companyId +locationId +accountUserId');
        if (!getConfiguration) {
            return [false, constants_util_1.default.notFoundMessage('gHL auth details')];
        }
        return [true, getConfiguration];
    }
}
exports.default = OAuthService;
//# sourceMappingURL=oAuth.service.js.map