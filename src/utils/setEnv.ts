import dotenv from 'dotenv';
import constantsUtil from './constants.util';
dotenv.config();
export class EnvSetup {
  static dbURI: string;
  static invitationLink: string;

  static setEnvVariables() {
    const env = process.env.environment;
    switch (env) {
      case 'local':
        this.dbURI = `mongodb://localhost:27017/Ghl-DB`;
        // case 'dev':
        //   this.dbURI = `mongodb://${process.env.dbUsername_Dev}:${process.env.dbPassword_Dev}`;
        //   this.invitationLink = constantsUtil.ACCOUNT_INVITATION_BASE_LINK_DEV;
        //   break;
        // case 'prod':
        //   this.dbURI = `mongodb://${process.env.dbUsername_Prod}:${process.env.dbPassword_Prod}`;
        //   this.invitationLink = constantsUtil.ACCOUNT_INVITATION_BASE_LINK;
        //   break;
        // case 'staging':
        //   this.dbURI = `mongodb://${process.env.dbUsername_Staging}:${process.env.dbPassword_Staging}`;
        //   this.invitationLink =
        //     constantsUtil.ACCOUNT_INVITATION_BASE_LINK_STAGING;
        break;
    }
  }
}
