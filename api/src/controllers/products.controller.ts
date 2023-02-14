import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const products = [
    { id: 1, name: 'something' },
    { id: 2, name: 'something' },
    { id: 3, name: 'another thing' },
    { id: 4, name: 'something else' },
];

export const productsInit = (app: Express) => {
    app.route('/product/list').post((req: Request, res: Response) => {
        console.log('getting list of products');

        res.json(products);
    });

    app.route('/product/purchase').post((req: Request, res: Response) => {
        console.log('purchase of the product', req.body);

        res.json({ success: true });
    });

    app.route('/product/add').post((req: Request, res: Response) => {
        products.push({
            id: products[products.length - 1].id + 1,
            name: req.body.name,
        });

        res.json(products[products.length - 1]);
    });
};
