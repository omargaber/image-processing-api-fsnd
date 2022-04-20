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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.default);
describe('Image Processing API Test Suite', () => {
    const fileName = 'doggo';
    const width = 200;
    const height = 100;
    it('Perform GET / without query parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
    it('Perform image resize successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api?fileName=${fileName}&width=${width}&height=${height}`);
        expect(response.status).toBe(200);
    }));
    it('Perform GET / with missing query parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api?fileName=${fileName}&width=${width}`);
        expect(response.status).toBe(400);
    }));
});
