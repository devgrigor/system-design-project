"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config = dotenv_1.default.config().parsed;
console.log(config);
const app = (0, express_1.default)();
const port = config.PORT;
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    console.log('Request get to main route');
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
