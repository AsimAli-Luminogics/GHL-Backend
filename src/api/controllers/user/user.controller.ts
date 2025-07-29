import { Request, Response } from "express";
import UserService from "../../services/user.service";
import responseHelper from "../../../utils/responseHelper.util";

class UserController {
  protected userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
}

export default new UserController();
