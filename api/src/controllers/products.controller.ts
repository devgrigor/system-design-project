import express, { Express, Request, Response } from 'express';
import { getProductRepository } from '../redis-entity/product';
import { getOrderRepository } from '../redis-entity/order';
import { getUserData } from '../helpers/user.helper';

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

    app.route('/product/purchase').post(async (req: Request, res: Response) => {
        console.log('purchase of the product', req.body);

        const repo = await getOrderRepository();
        const orderEntity = repo.createEntity();

        orderEntity.product = req.body.productId;
        orderEntity.user = getUserData(req).id;

        repo.save(orderEntity);

        res.json({ success: true });
    });

    app.route('/orders/list').get(async (req: Request, res: Response) => {
        console.log('purchase of the product', req.body);

        // const repo = await getOrderRepository();
        // const result = await repo.search().returnAll();

        res.json({ test: Date.now() });
    });

    app.route('/product/add').post(async (req: Request, res: Response) => {
        const repo = await getProductRepository();
        const productEntity = repo.createEntity();

        productEntity.name = req.body.name;
        repo.save(productEntity);
        const result = await repo.search().returnAll();

        res.json(result);
    });
};
