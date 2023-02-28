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
exports.visitsInit = void 0;
const visit_1 = require("../redis-entity/visit");
const visitsInit = (app) => {
    app.route('/analytics/visit').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const repo = yield (0, visit_1.getVisitRepository)();
        const visitEntity = repo.createEntity();
        visitEntity.fingerprint = req.body.fingerprint;
        console.log('getting here');
        repo.save(visitEntity);
        res.json(visitEntity);
    }));
    app.route('/analytics/visit/list').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const repo = yield (0, visit_1.getVisitRepository)();
        // TODO: add filters
        const result = yield repo.search().returnAll();
        res.json(result);
    }));
};
exports.visitsInit = visitsInit;
