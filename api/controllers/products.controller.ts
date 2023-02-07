import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

export const productsInit = (app: Express) => {
    app.route('/products/list').post((req: Request, res: Response) => {
        console.log('getting list of products');
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.json([
            { id: 1, name: 'something' },
            { id: 2, name: 'something' },
            { id: 3, name: 'another thing' },
            { id: 4, name: 'something else' },
        ]);
    });

    app.route('/products/purchase').post((req: Request, res: Response) => {
        console.log('purchase of the product', req.body);

        res.json({ success: true });
    });
};
