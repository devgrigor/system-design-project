"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowAllMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_controller_1 = require("./src/controllers/products.controller");
const user_controller_1 = require("./src/controllers/user.controller");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const config = dotenv_1.default.config().parsed;
console.log(config);
const app = (0, express_1.default)();
let portArg = process.argv.find((flag) => {
    return flag.indexOf('port') > -1;
});
portArg = portArg && portArg.split('=')[1];
const port = portArg || config.PORT;
const allowAllMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
};
exports.allowAllMiddleware = allowAllMiddleware;
app.use(exports.allowAllMiddleware);
app.use(jsonParser);
(0, products_controller_1.productsInit)(app);
(0, user_controller_1.userInit)(app);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
