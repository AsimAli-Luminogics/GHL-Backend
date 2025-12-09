import {Request, Response} from 'express';
import OAuthService from '../../services/oAuth.service';
import responseHelper from '../../../utils/responseHelper.util';
import constants from '../../../utils/constants.util';

class OAuthController {
  protected oAuthService: OAuthService;

  constructor() {
    this.oAuthService = new OAuthService();
  }

  generateToken = async (req: Request | any, res: Response) => {
    try {
      const response = await this.oAuthService.generateToken(req);
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
      console.log(error.response?.data);
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  refreshToken = async (req: Request | any, res: Response) => {
    try {
      const response = await this.oAuthService.refreshToken(req);
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

  authUri = async (req: Request | any, res: Response) => {
    try {
      const response = await this.oAuthService.authUri(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.RECORD_NOT_FOUND)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successFoundMessage('Auth URI'),
        }),
      );
    } catch (error) {
      console.log(error);
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(responseHelper.get4xxResponse(constants.Messages.EXCEPTION));
    }
  };

  ghlCallback = async (req: Request | any, res: Response) => {
    try {
      const response = await this.oAuthService.ghlCallback(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.RECORD_NOT_FOUND)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successFoundMessage('GHL Callback'),
        }),
      );
    } catch (error) {
      return res
        .status(constants.CODE.BAD_REQUEST)
        .send(
          responseHelper.get4xxResponse(
            error.response?.data?.error_description,
          ),
        );
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

  getGHLAuthDetails = async (req: Request | any, res: Response) => {
    try {
      const response = await this.oAuthService.getGHLAuthDetails(req);
      if (!response[0]) {
        return res
          .status(constants.CODE.RECORD_NOT_FOUND)
          .send(responseHelper.get4xxResponse(response[1]));
      }
      return res.status(constants.CODE.OK).send(
        responseHelper.get2xxResponse({
          statusCode: constants.CODE.OK,
          data: response[1],
          message: constants.successFoundMessage('GHL Auth Details'),
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

export default new OAuthController();
