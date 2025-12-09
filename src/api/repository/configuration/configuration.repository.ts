import { IConfiguration } from '../../../database/interfaces/configuration.interface';
import { Configuration } from '../../../database/models/configuration.model';
import { BaseRepository } from '../base.repository';
import { IConfigurationRepository } from './configuration.repository.interface';

export class ConfigurationRepository
  extends BaseRepository<IConfiguration>
  implements IConfigurationRepository
{
  constructor() {
    super(Configuration);
  }
}
