import mongoose from 'mongoose';

export interface IConfiguration {
  _id?: string;
  accessToken: string;
  refreshToken: string;
  accountType: string;
  expiresIn: number;
  companyId: string;
  locationId: string;
  refreshTokenId: string;
  accountUserId: string;

  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
