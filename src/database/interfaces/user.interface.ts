import {Document} from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  type: string;
  verifyToken: string;
  role: string;
  isActive: boolean;
  phone: string;
  gender: string;
  sessionIds: Array<string>;
  octoparseAccessToken: string;
  octoparseRefreshToken: string;
  octoparseTokenExpiry: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
