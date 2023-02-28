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
exports.getProductRepository = exports.schema = exports.Product = void 0;
const redis_om_1 = require("redis-om");
class Product extends redis_om_1.Entity {
}
exports.Product = Product;
exports.schema = new redis_om_1.Schema(Product, {
    name: { type: 'string' },
});
const getProductRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new redis_om_1.Client();
    // TODO: later get this from environment
    yield client.open('redis://localhost:7000');
    // @ts-ignore
    return client.fetchRepository(exports.schema);
});
exports.getProductRepository = getProductRepository;
