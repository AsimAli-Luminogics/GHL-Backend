"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuthUtil = void 0;
const axios_1 = __importDefault(require("axios"));
const dataCopier_util_1 = require("./dataCopier.util");
const configuration_repomodel_1 = require("../database/repomodels/configuration.repomodel");
const configuration_repository_1 = require("../api/repository/configuration/configuration.repository");
class OAuthUtil {
    constructor() {
        this.configurationRepository = new configuration_repository_1.ConfigurationRepository();
    }
    async postRequest(url, data) {
        const response = await axios_1.default.post(url, data, {
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
    async ghlServiceRequest(url, data) {
        const response = await axios_1.default.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    async createAuth(updateData) {
        const newConfiguration = new configuration_repomodel_1.Configuration();
        const validateConfiguration = dataCopier_util_1.DataCopier.copy(newConfiguration, updateData);
        return await this.configurationRepository.create(validateConfiguration);
    }
    async updateAuth(getConfiguration, updateData, configurationType) {
        const validateConfiguration = dataCopier_util_1.DataCopier.copy(getConfiguration, updateData);
        await this.configurationRepository.updateByOne({ type: configurationType }, validateConfiguration);
    }
}
exports.oAuthUtil = new OAuthUtil();
//# sourceMappingURL=oAuth.util.js.map