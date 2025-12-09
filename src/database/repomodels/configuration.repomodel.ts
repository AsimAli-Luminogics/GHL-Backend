import commonUtil from '../../utils/common.util';

export class Configuration {
  accessToken = '';
  refreshToken = '';
  accountType = '';
  expiresIn = 0;
  companyId = '';
  locationId = '';
  refreshTokenId = '';
  accountUserId = ''; // user id associated with the ghl account and etc
  isDeleted = false;
  createdAt = commonUtil.getCurrentDate();
  updatedAt = commonUtil.getCurrentDate();
}
