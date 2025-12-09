"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oAuth_service_1 = __importDefault(require("../../services/oAuth.service"));
const responseHelper_util_1 = __importDefault(require("../../../utils/responseHelper.util"));
const constants_util_1 = __importDefault(require("../../../utils/constants.util"));
class OAuthController {
    constructor() {
        this.generateToken = async (req, res) => {
            try {
                const response = await this.oAuthService.generateToken(req);
                if (!response[0]) {
                    return res
                        .status(constants_util_1.default.CODE.RECORD_NOT_FOUND)
                        .send(responseHelper_util_1.default.get4xxResponse(response[1]));
                }
                return res.status(constants_util_1.default.CODE.OK).send(responseHelper_util_1.default.get2xxResponse({
                    statusCode: constants_util_1.default.CODE.OK,
                    data: response[1],
                    message: constants_util_1.default.successFoundMessage('Token'),
                }));
            }
            catch (error) {
                console.log(error.response?.data);
                return res
                    .status(constants_util_1.default.CODE.BAD_REQUEST)
                    .send(responseHelper_util_1.default.get4xxResponse(constants_util_1.default.Messages.EXCEPTION));
            }
        };
        this.refreshToken = async (req, res) => {
            try {
                const response = await this.oAuthService.refreshToken(req);
                if (!response[0]) {
                    return res
                        .status(constants_util_1.default.CODE.RECORD_NOT_FOUND)
                        .send(responseHelper_util_1.default.get4xxResponse(response[1]));
                }
                return res.status(constants_util_1.default.CODE.OK).send(responseHelper_util_1.default.get2xxResponse({
                    statusCode: constants_util_1.default.CODE.OK,
                    data: response[1],
                    message: constants_util_1.default.successUpdateMessage('Token'),
                }));
            }
            catch (error) {
                console.log(error);
                return res
                    .status(constants_util_1.default.CODE.BAD_REQUEST)
                    .send(responseHelper_util_1.default.get4xxResponse(constants_util_1.default.Messages.EXCEPTION));
            }
        };
        this.authUri = async (req, res) => {
            try {
                const response = await this.oAuthService.authUri(req);
                if (!response[0]) {
                    return res
                        .status(constants_util_1.default.CODE.RECORD_NOT_FOUND)
                        .send(responseHelper_util_1.default.get4xxResponse(response[1]));
                }
                return res.status(constants_util_1.default.CODE.OK).send(responseHelper_util_1.default.get2xxResponse({
                    statusCode: constants_util_1.default.CODE.OK,
                    data: response[1],
                    message: constants_util_1.default.successFoundMessage('Auth URI'),
                }));
            }
            catch (error) {
                console.log(error);
                return res
                    .status(constants_util_1.default.CODE.BAD_REQUEST)
                    .send(responseHelper_util_1.default.get4xxResponse(constants_util_1.default.Messages.EXCEPTION));
            }
        };
        this.ghlCallback = async (req, res) => {
            try {
                const response = await this.oAuthService.ghlCallback(req);
                if (!response[0]) {
                    return res
                        .status(constants_util_1.default.CODE.RECORD_NOT_FOUND)
                        .send(responseHelper_util_1.default.get4xxResponse(response[1]));
                }
                return res.status(constants_util_1.default.CODE.OK).send(responseHelper_util_1.default.get2xxResponse({
                    statusCode: constants_util_1.default.CODE.OK,
                    data: response[1],
                    message: constants_util_1.default.successFoundMessage('GHL Callback'),
                }));
            }
            catch (error) {
                return res
                    .status(constants_util_1.default.CODE.BAD_REQUEST)
                    .send(responseHelper_util_1.default.get4xxResponse(error.response?.data?.error_description));
            }
        };
        // ghlRefreshToken = async (req: Request | any, res: Response) => {
        //   try {
        //     const response = await this.oAuthService.ghlRefreshToken(req);
        //     if (!response[0]) {
        //       return res
        //         .status(constants.CODE.RECORD_NOT_FOUND)
        //         .send(responseHelper.get4xxResponse(response[1]));
        //     }
        //     return res.status(constants.CODE.OK).send(
        //       responseHelper.get2xxResponse({
        //         statusCode: constants.CODE.OK,
        //         data: response[1],
        //         message: constants.successUpdateMessage('GHL Token'),
        //       }),
        //     );
        //   } catch (error) {
        //     console.log(error);
        //     return res
        //       .status(constants.CODE.BAD_REQUEST)
        //       .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
        //   }
        // };
        this.getGHLAuthDetails = async (req, res) => {
            try {
                const response = await this.oAuthService.getGHLAuthDetails(req);
                if (!response[0]) {
                    return res
                        .status(constants_util_1.default.CODE.RECORD_NOT_FOUND)
                        .send(responseHelper_util_1.default.get4xxResponse(response[1]));
                }
                return res.status(constants_util_1.default.CODE.OK).send(responseHelper_util_1.default.get2xxResponse({
                    statusCode: constants_util_1.default.CODE.OK,
                    data: response[1],
                    message: constants_util_1.default.successFoundMessage('GHL Auth Details'),
                }));
            }
            catch (error) {
                console.log(error);
                return res
                    .status(constants_util_1.default.CODE.BAD_REQUEST)
                    .send(responseHelper_util_1.default.get4xxResponse(constants_util_1.default.Messages.EXCEPTION));
            }
        };
        this.oAuthService = new oAuth_service_1.default();
    }
}
exports.default = new OAuthController();
//# sourceMappingURL=oauth.controller.js.map