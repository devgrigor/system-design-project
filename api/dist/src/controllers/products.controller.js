"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsInit = void 0;
const products = [
    { id: 1, name: 'something' },
    { id: 2, name: 'something' },
    { id: 3, name: 'another thing' },
    { id: 4, name: 'something else' },
];
const productsInit = (app) => {
    app.route('/product/list').post((req, res) => {
        console.log('getting list of products');
        res.json(products);
    });
    app.route('/product/purchase').post((req, res) => {
        console.log('purchase of the product', req.body);
        res.json({ success: true });
    });
    app.route('/product/add').post((req, res) => {
        products.push({
            id: products[products.length - 1].id + 1,
            name: req.body.name,
        });
        res.json(products[products.length - 1]);
    });
};
exports.productsInit = productsInit;
