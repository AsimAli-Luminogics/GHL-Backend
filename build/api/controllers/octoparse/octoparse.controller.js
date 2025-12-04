"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const octoparse_service_1 = __importDefault(require("../../services/octoparse.service"));
const responseHelper_util_1 = __importDefault(require("../../../utils/responseHelper.util"));
const constants_util_1 = __importDefault(require("../../../utils/constants.util"));
class OctoparseController {
    constructor() {
        this.generateToken = async (req, res) => {
            try {
                const response = await this.octoparseService.generateToken(req);
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
                console.log(error);
                return res
                    .status(constants_util_1.default.CODE.BAD_REQUEST)
                    .send(responseHelper_util_1.default.get4xxResponse(constants_util_1.default.Messages.EXCEPTION));
            }
        };
        this.refreshToken = async (req, res) => {
            try {
                const response = await this.octoparseService.refreshToken(req);
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
        this.octoparseService = new octoparse_service_1.default();
    }
}
exports.default = new OctoparseController();
//# sourceMappingURL=octoparse.controller.js.map