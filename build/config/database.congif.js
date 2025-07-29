"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const setEnv_1 = require("../utils/setEnv");
class Database {
    constructor() {
        this.dbUri = setEnv_1.EnvSetup.dbURI;
        this.connectDb();
    }
    connectDb() {
        console.log(this.dbUri);
        const options = {
            retryWrites: true,
            autoIndex: true,
        };
        mongoose_1.default
            .connect(this.dbUri, options)
            .then(async (res) => {
            console.log('connection established at ', this.dbUri);
        })
            .catch(err => {
            console.log(err);
            process.exit(1);
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.congif.js.map