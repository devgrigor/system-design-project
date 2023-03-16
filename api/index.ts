import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { productsInit } from './src/controllers/products.controller';
import { userInit } from './src/controllers/user.controller';
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

const config: any = dotenv.config().parsed;
console.log(config);
const app: Express = express();
let portArg = process.argv.find((flag) => {
    return flag.indexOf('port') > -1;
});
portArg = portArg && portArg.split('=')[1];
const port = portArg || config.PORT;

export const allowAllMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
};

app.use(allowAllMiddleware);
app.use(jsonParser);

productsInit(app);
userInit(app);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
