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
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils/utils");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const images = express_1.default.Router();
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
          There is a middleware function handling validation
          for the request. The first stage of the endpoint is
          to make sure if the file with the parameters passed
          already exists then to load that file.
      */
    const fileExists = (0, utils_1.thumbExists)(req);
    if (!fileExists[0]) {
        /*
                Since the file queried doesn't exist, we need to check the original file,
                read it, resize it, save it and then load it.
            */
        const originalPath = `./assets/full/${req.query.fileName}.jpg`;
        const width = parseInt(req.query.width);
        const height = parseInt(req.query.height);
        /*
                We surely need to handle the case where the original fileName
                doesn't exist in the first place.
            */
        if (!(0, fs_1.existsSync)(originalPath)) {
            const files = (0, fs_1.readdirSync)('./assets/full/');
            console.log(files);
            res
                .status(400)
                .end(`File doesn't exist. Available files are: [${files.toString()}]`);
        }
        else {
            yield (0, sharp_1.default)(originalPath)
                .resize(width, height)
                .toFile(fileExists[1])
                .then(() => {
                res.sendFile(path_1.default.resolve(fileExists[1]), (err) => {
                    if (err) {
                        console.log(err);
                        res.send(err.message);
                    }
                    else {
                        console.log('File converted and sent');
                    }
                });
            });
        }
    }
    else {
        res.sendFile(path_1.default.resolve(fileExists[1]), (err) => {
            if (err) {
                console.log(err);
                res.send(err.message);
            }
            else {
                console.log('File loaded from cache');
            }
        });
    }
}));
exports.default = images;
