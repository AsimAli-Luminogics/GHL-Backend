import axios from 'axios';
import mongoose from 'mongoose';
import {GHLConfig} from '../config/ghl.config';
import {HighLevel, MongoDBSessionStorage} from '@gohighlevel/api-client';
import {EnvSetup} from './setEnv';
import {DataCopier} from './dataCopier.util';
import {IConfiguration} from '../database/interfaces/configuration.interface';
import {Configuration} from '../database/repomodels/configuration.repomodel';
import {ConfigurationRepository} from '../api/repository/configuration/configuration.repository';
class OAuthUtil {
  private configurationRepository: ConfigurationRepository;

  constructor() {
    this.configurationRepository = new ConfigurationRepository();
  }

  async postRequest(url: string, data: any) {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return response.data;
  }

  async octoparseGetRequest(url: string) {
    const response = await axios.get(`${process.env.octoparseUri}${url}`, {
      headers: {
        Authorization: `Bearer ${process.env.telnyxApiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  }

  async ghlServiceRequest(url: string, data: any) {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  }

  async createAuth(updateData: any) {
    const newConfiguration = new Configuration();
    const validateConfiguration = DataCopier.copy(newConfiguration, updateData);
    return await this.configurationRepository.create<IConfiguration>(
      validateConfiguration,
    );
  }

  async updateAuth(
    getConfiguration: IConfiguration,
    updateData: any,
    configurationType: string,
  ) {
    const validateConfiguration = DataCopier.copy(getConfiguration, updateData);
    await this.configurationRepository.updateByOne<IConfiguration>(
      {type: configurationType},
      validateConfiguration,
    );
  }
}

export const oAuthUtil = new OAuthUtil();
