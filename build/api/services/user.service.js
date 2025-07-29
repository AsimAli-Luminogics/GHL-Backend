"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../repository/user/user.repository");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map