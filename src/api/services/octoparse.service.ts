import {Request} from 'express';
import dotenv from 'dotenv';
import {UserRepository} from '../repository/user/user.repository';
import {octoparseUtil} from '../../utils/octoparse.util';
import {User} from '../../database/repomodels/user.repomodel';
import {DataCopier} from '../../utils/dataCopier.util';
import {IUser} from '../../database/interfaces/user.interface';
import constants from '../../utils/constants.util';

dotenv.config();

class OctoparseService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async generateToken(req: Request) {
    const reqTemp: any = req;

    const getUser = await this.userRepository.getOne<User>(
      {
        type: 'octoparse',
      },
      '+octoparseAccessToken +octoparseRefreshToken +octoparseTokenExpiry',
    );

    let validateUser: IUser;

    if (!getUser) {
      const token = await octoparseUtil.octoparsePostRequest('/token', {
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

      const newUser = new User();
      validateUser = DataCopier.copy(newUser, updateData);
      await this.userRepository.create<IUser>(validateUser);

      return [true, validateUser];
    }

    return [true, getUser];
  }

  async refreshToken(req: Request) {
    const getUser = await this.userRepository.getOne<IUser>(
      {
        type: 'octoparse',
      },
      '+octoparseAccessToken +octoparseRefreshToken +octoparseTokenExpiry',
    );

    const token = await octoparseUtil.octoparsePostRequest('/token', {
      refresh_token: getUser?.octoparseRefreshToken,
      grant_type: 'refresh_token',
    });

    const updateData = {
      octoparseAccessToken: token.data.access_token,
      octoparseRefreshToken: token.data.refresh_token,
      octoparseTokenExpiry: Date.now() + Number(token.data.expires_in) * 1000,
    };

    const validateUser = DataCopier.copy(getUser, updateData);
    await this.userRepository.updateByOne<IUser>(
      {type: 'octoparse'},
      validateUser,
    );

    return [true, constants.successUpdateMessage('Token')];
  }
}

export default OctoparseService;
