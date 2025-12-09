"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_congif_1 = require("./config/database.congif");
const base_route_1 = __importDefault(require("./api/routes/base.route"));
const logs_middleware_1 = __importDefault(require("./middleware/logs.middleware"));
const localStorage_util_1 = __importDefault(require("./utils/localStorage.util"));
const setEnv_1 = require("./utils/setEnv");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: `*`,
            },
        });
        this.config();
        this.database = new database_congif_1.Database();
    }
    config() {
        setEnv_1.EnvSetup.setEnvVariables();
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(logs_middleware_1.default);
        this.app.use((req, res, next) => {
            const traceId = 'X-DMS' + Date.now().toString().substring(4);
            localStorage_util_1.default.run(new Map(), () => {
                const store = localStorage_util_1.default.getStore();
                if (store) {
                    store.set('traceId', traceId);
                }
                res.header('TraceId', traceId);
                next();
            });
        });
        (0, base_route_1.default)(this.app);
    }
    async start() {
        const appPort = process.env.PORT || 3000;
        this.io.on('connection', (socket) => {
            console.log('a Configuration connected');
            this.socketInstance = socket;
        });
        this.httpServer.listen(appPort, () => {
            console.log(`Server running at http://localhost:${appPort}/`);
        });
    }
}
const app = new App();
app.start();
exports.default = app;
//# sourceMappingURL=app.js.map