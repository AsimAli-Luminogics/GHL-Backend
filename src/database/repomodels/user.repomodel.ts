import commonUtil from '../../utils/common.util';

export class User {
  name = '';
  email = '';
  password = '';
  type = '';
  verifyToken: string;
  role = '';
  isActive = false;
  phone = '';
  gender = '';
  isDeleted = false;
  sessionIds = Array<string>();
  octoparseAccessToken = '';
  octoparseRefreshToken = '';
  octoparseTokenExpiry = 0;
  createdAt = commonUtil.getCurrentDate();
  updatedAt = commonUtil.getCurrentDate();
}
