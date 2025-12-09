"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvSetup = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class EnvSetup {
    static setEnvVariables() {
        const env = process.env.environment;
        switch (env) {
            case 'local':
                this.dbURI = `mongodb://localhost:27017/Ghl-DB`;
                // case 'dev':
                //   this.dbURI = `mongodb://${process.env.dbConfigurationname_Dev}:${process.env.dbPassword_Dev}`;
                //   this.invitationLink = constantsUtil.ACCOUNT_INVITATION_BASE_LINK_DEV;
                //   break;
                // case 'prod':
                //   this.dbURI = `mongodb://${process.env.dbConfigurationname_Prod}:${process.env.dbPassword_Prod}`;
                //   this.invitationLink = constantsUtil.ACCOUNT_INVITATION_BASE_LINK;
                //   break;
                // case 'staging':
                //   this.dbURI = `mongodb://${process.env.dbConfigurationname_Staging}:${process.env.dbPassword_Staging}`;
                //   this.invitationLink =
                //     constantsUtil.ACCOUNT_INVITATION_BASE_LINK_STAGING;
                break;
        }
    }
}
exports.EnvSetup = EnvSetup;
//# sourceMappingURL=setEnv.js.map