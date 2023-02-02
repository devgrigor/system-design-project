import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const config: any = dotenv.config().parsed;
console.log(config);
const app: Express = express();
const port = config.PORT;

app.get('/', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  console.log('Request get to main route');
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});