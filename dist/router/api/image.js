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
          We need to verify that the passed parameters are in fact numbers.
      */
        if (isNaN(width) || isNaN(height)) {
            if (isNaN(width)) {
                res
                    .status(400)
                    .write('Width parameter is missing or not a number.\n');
            }
            if (isNaN(height)) {
                res
                    .status(400)
                    .write('Height parameter is missing or not a number.\n');
            }
            res.end();
            return;
        }
        /*
              We surely need to handle the case where the original fileName
              doesn't exist in the first place.
          */
        if (!(0, fs_1.existsSync)(originalPath)) {
            const files = (0, fs_1.readdirSync)('./assets/full/');
            res
                .status(400)
                .end(`File parameter missing or doesn't exist. Available files are: [${files.toString()}]`);
            return;
        }
        else {
            /*
              Since the file exists, now we proceed to resizing the image.
          */
            const resizeSuccess = yield (0, utils_1.imageResize)(originalPath, width, height, fileExists[1]);
            if (resizeSuccess) {
                res.sendFile(path_1.default.resolve(fileExists[1]), (err) => {
                    if (err) {
                        console.log(err);
                        res.send(err.message);
                    }
                    else {
                        console.log('Sent file to client.');
                    }
                });
            }
            else {
                res.status(422).send('An error occurred while processing the image.');
                return;
            }
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
