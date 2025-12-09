'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
const dotenv_1 = __importDefault(require('dotenv'));
const Configuration_repository_1 = require('../repository/Configuration/Configuration.repository');
const octoparse_util_1 = require('../../utils/octoparse.util');
const Configuration_repomodel_1 = require('../../database/repomodels/Configuration.repomodel');
const dataCopier_util_1 = require('../../utils/dataCopier.util');
const constants_util_1 = __importDefault(require('../../utils/constants.util'));
dotenv_1.default.config();
class OctoparseService {
  constructor() {
    this.ConfigurationRepository =
      new Configuration_repository_1.ConfigurationRepository();
  }
  async generateToken(req) {
    const reqTemp = req;
    const getConfiguration = await this.ConfigurationRepository.getOne(
      {
        type: 'octoparse',
      },
      '+octoparseAccessToken +octoparseRefreshToken +octoparseTokenExpiry',
    );
    let validateConfiguration;
    if (!getConfiguration) {
      const token = await octoparse_util_1.octoparseUtil.octoparsePostRequest(
        '/token',
        {
          Configurationname: process.env.octoparseConfigurationname,
          password: process.env.octoparsePassword,
          grant_type: 'password',
        },
      );
      const updateData = {
        octoparseAccessToken: token.data.access_token,
        octoparseRefreshToken: token.data.refresh_token,
        octoparseTokenExpiry: Date.now() + Number(token.data.expires_in) * 1000,
        type: 'octoparse',
      };
      const newConfiguration = new Configuration_repomodel_1.Configuration();
      validateConfiguration = dataCopier_util_1.DataCopier.copy(
        newConfiguration,
        updateData,
      );
      await this.ConfigurationRepository.create(validateConfiguration);
      return [true, validateConfiguration];
    }
    return [true, getConfiguration];
  }
  async refreshToken(req) {
    const getConfiguration = await this.ConfigurationRepository.getOne(
      {
        type: 'octoparse',
      },
      '+octoparseAccessToken +octoparseRefreshToken +octoparseTokenExpiry',
    );
    const token = await octoparse_util_1.octoparseUtil.octoparsePostRequest(
      '/token',
      {
        refresh_token: getConfiguration?.octoparseRefreshToken,
        grant_type: 'refresh_token',
      },
    );
    const updateData = {
      octoparseAccessToken: token.data.access_token,
      octoparseRefreshToken: token.data.refresh_token,
      octoparseTokenExpiry: Date.now() + Number(token.data.expires_in) * 1000,
    };
    const validateConfiguration = dataCopier_util_1.DataCopier.copy(
      getConfiguration,
      updateData,
    );
    await this.ConfigurationRepository.updateByOne(
      {type: 'octoparse'},
      validateConfiguration,
    );
    return [true, constants_util_1.default.successUpdateMessage('Token')];
  }
}
exports.default = OctoparseService;
//# sourceMappingURL=octoparse.service.js.map
