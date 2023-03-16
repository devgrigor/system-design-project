"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userInit = void 0;
const db_configs_1 = require("../../db-configs");
const User_1 = require("../entity/User");
const crypto = __importStar(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
const userInit = (app) => {
    app.route('/user').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // TODO: add user record
        const repository = db_configs_1.dataSource.getRepository(User_1.User);
        const user = new User_1.User();
        user.email = req.body.email;
        user.password = crypto
            .createHash('md5')
            .update(req.body.password)
            .digest('hex');
        return repository.save(user);
    }));
    app.route('/user/login').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // TODO: login user and return token
        const repository = db_configs_1.dataSource.getRepository(User_1.User);
        const user = yield repository.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            // return 404
            return;
        }
        if (user.password !=
            crypto.createHash('md5').update(req.body.password).digest('hex')) {
            // return 401 forbidden
            res.send({
                status: 401,
            });
            return;
        }
        const token = jwt.sign({
            email: user.email,
        }, 'test');
        user.token = token;
        res.json(user);
    }));
};
exports.userInit = userInit;
