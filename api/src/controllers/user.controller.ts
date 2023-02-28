import { Express, Request, Response } from 'express';
import { dataSource } from '../../db-configs';
import { User } from '../entity/User';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export const userInit = (app: Express) => {
    app.route('/user').post(async (req: Request, res: Response) => {
        // TODO: add user record
        const repository = dataSource.getRepository(User);
        const user = new User();
        user.email = req.body.email;
        user.password = crypto
            .createHash('md5')
            .update(req.body.password)
            .digest('hex');

        return repository.save(user);
    });

    app.route('/user/login').post(async (req: Request, res: Response) => {
        // TODO: login user and return token
        const repository = dataSource.getRepository(User);

        const user = await repository.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            // return 404
            return;
        }

        if (
            user.password !=
            crypto.createHash('md5').update(req.body.password).digest('hex')
        ) {
            // return 401 forbidden
            res.send({
                status: 401,
            });
            return;
        }

        const token = jwt.sign(
            {
                email: user.email,
            },
            'test'
        );

        user.token = token;

        res.json(user);
    });
};
