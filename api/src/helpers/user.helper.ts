import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

/**
 * Getting user data from token in headers
 * @param req express request object
 * @returns object of user or throws error if token is invalid
 */
export const getUserData: any = (req: Request) => {
    return jwt.verify(req.headers.authorization as string, 'test');
};
