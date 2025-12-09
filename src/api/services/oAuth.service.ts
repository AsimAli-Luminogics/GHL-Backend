import {Request} from 'express';
import dotenv from 'dotenv';
import {ConfigurationRepository} from '../repository/configuration/configuration.repository';
import {oAuthUtil} from '../../utils/oAuth.util';
import {Configuration} from '../../database/repomodels/configuration.repomodel';
import {DataCopier} from '../../utils/dataCopier.util';
import {IConfiguration} from '../../database/interfaces/configuration.interface';
import constants from '../../utils/constants.util';
import crypto from 'crypto';

dotenv.config();

class OAuthService {
  private configurationRepository: ConfigurationRepository;

  constructor() {
    this.configurationRepository = new ConfigurationRepository();
  }

  // Octoparse OAuth Methods

  async generateToken(req: Request) {
    const reqTemp: any = req;

    const getConfiguration =
      await this.configurationRepository.getOne<IConfiguration>(
        {
          accountType: 'octoparse',
        },
        '+accessToken +refreshToken +expiresIn',
      );

    if (!getConfiguration) {
      const token = await oAuthUtil.postRequest(
        `${process.env.octoparseUri}/token`,
        {
          username: process.env.octoparseConfigurationname,
          password: process.env.octoparsePassword,
          grant_type: 'password',
        },
      );

      const updateData = {
        accessToken: token.data.access_token,
        refreshToken: token.data.refresh_token,
        expiresIn: Date.now() + Number(token.data.expires_in) * 1000,
        accountType: 'octoparse',
      };

      const validateConfiguration = await oAuthUtil.createAuth(updateData);

      return [true, validateConfiguration];
    }

    return [true, getConfiguration];
  }

  async refreshToken(req: Request) {
    const getConfiguration =
      await this.configurationRepository.getOne<IConfiguration>(
        {
          type: 'octoparse',
        },
        '+octoparseAccessToken +octoparseRefreshToken +octoparseTokenExpiry',
      );

    const token = await oAuthUtil.postRequest(
      `${process.env.octoparseUri}/token`,
      {
        refresh_token: getConfiguration?.refreshToken,
        grant_type: 'refresh_token',
      },
    );

    const updateData = {
      octoparseAccessToken: token.data.access_token,
      octoparseRefreshToken: token.data.refresh_token,
      octoparseTokenExpiry: Date.now() + Number(token.data.expires_in) * 1000,
    };

    await oAuthUtil.updateAuth(getConfiguration, updateData, 'octoparse');

    return [true, constants.successUpdateMessage('Token')];
  }

  // GHL OAuth Methods

  async authUri(req: Request) {
    const base = 'https://marketplace.gohighlevel.com/oauth/chooselocation';
    const state = crypto.randomBytes(16).toString('hex');
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.GHL_CLIENT_ID!,
      redirect_uri: process.env.GHL_REDIRECT_URI!,
      scope:
        'contacts.readonly contacts.write locations.readonly charges.readonly charges.write',
      state: state,
    });

    return [true, `${base}?${params.toString()}`];
  }

  async ghlCallback(req: Request) {
    const {code} = req.query;
    const token = await oAuthUtil.ghlServiceRequest(
      `${process.env.GHL_SERVICE_CONNECTION_URI}/token`,
      {
        client_id: process.env.GHL_CLIENT_ID!,
        client_secret: process.env.GHL_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.GHL_REDIRECT_URI!,
      },
    );

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

    const createdAuth = await oAuthUtil.createAuth(updateData);

    console.log('token123', token);
    return [true, createdAuth];
  }

  async refreshGHLToken(req: Request) {
    const getConfiguration =
      await this.configurationRepository.getOne<IConfiguration>(
        {
          accountType: 'ghl',
        },
        '+accessToken +refreshToken +expiresIn +refreshTokenId +companyId +locationId +accountUserId',
      );

    const token = await oAuthUtil.ghlServiceRequest(
      `${process.env.GHL_SERVICE_CONNECTION_URI}/token`,
      {
        client_id: process.env.GHL_CLIENT_ID!,
        client_secret: process.env.GHL_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: getConfiguration?.refreshToken,
        refresh_token_id: getConfiguration?.refreshTokenId,
      },
    );
    const updateData = {
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      expiresIn: Date.now() + Number(token.expires_in) * 1000,
      refreshTokenId: token.refreshTokenId,
    };
    await oAuthUtil.updateAuth(getConfiguration!, updateData, 'ghl');

    return [true, constants.successUpdateMessage('GHL Token')];
  }

  async getGHLAuthDetails(req: Request) {
    const getConfiguration =
      await this.configurationRepository.getOne<IConfiguration>(
        {
          accountType: 'ghl',
        },
        '+accessToken +refreshToken +expiresIn +companyId +locationId +accountUserId',
      );

    if (!getConfiguration) {
      return [false, constants.notFoundMessage('gHL auth details')];
    }

    return [true, getConfiguration];
  }
}

export default OAuthService;
