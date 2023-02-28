import express, { Express, Request, Response } from 'express';
import { getVisitRepository } from '../redis-entity/visit';

export const visitsInit = (app: Express) => {
    app.route('/analytics/visit').post(async (req: Request, res: Response) => {
        const repo = await getVisitRepository();
        const visitEntity = repo.createEntity();

        visitEntity.fingerprint = req.body.fingerprint;
        console.log('getting here');
        repo.save(visitEntity);

        res.json(visitEntity);
    });

    app.route('/analytics/visit/list').post(
        async (req: Request, res: Response) => {
            const repo = await getVisitRepository();

            // TODO: add filters
            const result = await repo.search().returnAll();

            res.json(result);
        }
    );
};
