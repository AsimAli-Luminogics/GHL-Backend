import mongoose, {Schema} from 'mongoose';
import {IConfiguration} from '../interfaces/configuration.interface';
import commonUtil from '../../utils/common.util';
import {v4} from 'uuid';
import asyncLocalStorage from '../../utils/localStorage.util';
import UpdateLog from './updateLogs.model';

const configurationModel: Schema = new Schema({
  accessToken: {type: String},
  refreshToken: {type: String},
  accountType: {type: String},
  expiresIn: {type: Number},
  companyId: {type: String},
  locationId: {type: String},
  refreshTokenId: {type: String},
  accountUserId: {
    type: String,
  },
  isDeleted: {type: Boolean},
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  logTrackingId: {
    type: String,
  },
});

configurationModel.pre('save', async function (next) {
  this.logTrackingId = v4();
  next();
});

const logUpdate = async function (next) {
  const query = this.getQuery();
  const update = this.getUpdate();
  const previousDoc = await this.model.findOne(query);
  this.previousDoc = previousDoc;
  next();
};

const logUpdatePost = async function (doc) {
  let traceId = '',
    ip = '',
    ConfigurationId = '',
    url = '',
    method = '';

  const store = asyncLocalStorage.getStore();
  if (store) {
    if (store.get('traceId')) traceId = store.get('traceId');
    if (store.get('ip')) ip = store.get('ip');
    if (store.get('ConfigurationId'))
      ConfigurationId = store.get('ConfigurationId');
    if (store.get('url')) url = store.get('url');
    if (store.get('method')) method = store.get('method');
  }

  const previousDoc = this.previousDoc;

  const logEntry = new UpdateLog({
    traceId,
    previousData: previousDoc,
    currentData: doc,
    model: this.model.modelName,
    logTrackingId: previousDoc?.logTrackingId ?? '',
    ip,
    ConfigurationId,
    url,
    method,
    createdAt: commonUtil.getCurrentDate(),
  });

  logEntry.save().catch(err => {
    console.error('Error saving log entry', err);
  });
};

configurationModel.pre('findOneAndUpdate', logUpdate);
configurationModel.pre('updateMany', logUpdate);
configurationModel.pre('updateOne', logUpdate);

configurationModel.post('findOneAndUpdate', logUpdatePost);
configurationModel.post('updateMany', logUpdatePost);
configurationModel.post('updateOne', logUpdatePost);

export const Configuration = mongoose.model<IConfiguration>(
  'Configurations',
  configurationModel,
);
