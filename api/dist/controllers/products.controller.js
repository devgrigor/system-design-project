"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsInit = void 0;
const productsInit = (app) => {
    app.route('/products/list').post((req, res) => {
        console.log('getting list of products');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json([
            { id: 1, name: 'something' },
            { id: 2, name: 'something' },
            { id: 3, name: 'another thing' },
            { id: 4, name: 'something else' },
        ]);
    });
    app.route('/products/purchase').post((req, res) => {
        console.log('purchase of the product', req.body);
        res.json({ success: true });
    });
};
exports.productsInit = productsInit;
