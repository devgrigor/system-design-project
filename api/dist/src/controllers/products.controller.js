"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsInit = void 0;
const product_1 = require("../redis-entity/product");
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
    app.route('/product/add').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const repo = yield (0, product_1.getProductRepository)();
        const productEntity = repo.createEntity();
        productEntity.name = req.body.name;
        console.log('getting here');
        repo.save(productEntity);
        const result = yield repo.search().returnAll();
        res.json(result);
    }));
};
exports.productsInit = productsInit;
