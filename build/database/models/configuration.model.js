"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const common_util_1 = __importDefault(require("../../utils/common.util"));
const uuid_1 = require("uuid");
const localStorage_util_1 = __importDefault(require("../../utils/localStorage.util"));
const updateLogs_model_1 = __importDefault(require("./updateLogs.model"));
const configurationModel = new mongoose_1.Schema({
    accessToken: { type: String },
    refreshToken: { type: String },
    accountType: { type: String },
    expiresIn: { type: Number },
    companyId: { type: String },
    locationId: { type: String },
    refreshTokenId: { type: String },
    accountUserId: {
        type: String,
    },
    isDeleted: { type: Boolean },
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
    this.logTrackingId = (0, uuid_1.v4)();
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
    let traceId = '', ip = '', ConfigurationId = '', url = '', method = '';
    const store = localStorage_util_1.default.getStore();
    if (store) {
        if (store.get('traceId'))
            traceId = store.get('traceId');
        if (store.get('ip'))
            ip = store.get('ip');
        if (store.get('ConfigurationId'))
            ConfigurationId = store.get('ConfigurationId');
        if (store.get('url'))
            url = store.get('url');
        if (store.get('method'))
            method = store.get('method');
    }
    const previousDoc = this.previousDoc;
    const logEntry = new updateLogs_model_1.default({
        traceId,
        previousData: previousDoc,
        currentData: doc,
        model: this.model.modelName,
        logTrackingId: previousDoc?.logTrackingId ?? '',
        ip,
        ConfigurationId,
        url,
        method,
        createdAt: common_util_1.default.getCurrentDate(),
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
exports.Configuration = mongoose_1.default.model('Configurations', configurationModel);
//# sourceMappingURL=configuration.model.js.map