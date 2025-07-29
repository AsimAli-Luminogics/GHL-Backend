import { Request } from "express";
import { UserRepository } from "../repository/user/user.repository";
import { IUser } from "../../database/interfaces/user.interface";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
}

export default UserService;
