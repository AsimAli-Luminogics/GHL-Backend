import {Request, Response} from 'express';
import OctoparseService from '../../services/octoparse.service';
import responseHelper from '../../../utils/responseHelper.util';
import constants from '../../../utils/constants.util';

class OctoparseController {
  protected octoparseService: OctoparseService;

  constructor() {
    this.octoparseService = new OctoparseService();
  }

  generateToken = async (req: Request | any, res: Response) => {
    try {
      const response = await this.octoparseService.generateToken(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.RECORD_NOT_FOUND)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successFoundMessage('Token'),
        }),
      );
    } catch (error) {
      console.log(error);
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  refreshToken = async (req: Request | any, res: Response) => {
    try {
      const response = await this.octoparseService.refreshToken(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.RECORD_NOT_FOUND)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successUpdateMessage('Token'),
        }),
      );
    } catch (error) {
      console.log(error);
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };
}

export default new OctoparseController();
