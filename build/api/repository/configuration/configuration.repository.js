"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationRepository = void 0;
const configuration_model_1 = require("../../../database/models/configuration.model");
const base_repository_1 = require("../base.repository");
class ConfigurationRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(configuration_model_1.Configuration);
    }
}
exports.ConfigurationRepository = ConfigurationRepository;
//# sourceMappingURL=configuration.repository.js.map