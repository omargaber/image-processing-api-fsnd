"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thumbExists = exports.requestValidator = exports.initializeDir = void 0;
const fs_1 = require("fs");
// Function to validate if the thumb directory exists or not.
const initializeDir = () => {
    // First step is to make sure the directory /assets/thumb exists or not
    const thumbDirPath = './assets/thumb';
    if (!(0, fs_1.existsSync)(thumbDirPath)) {
        (0, fs_1.mkdirSync)(thumbDirPath);
        console.log('Directory Created.');
    }
    else {
        console.log('Directory Exists.');
    }
};
exports.initializeDir = initializeDir;
/*
Function to exist if thumb image already exists then return it
The function will return a tuple with a boolean field and a string
The boolean would be true if it exists and the second element of the tuple
would always be the string of the file path whether it exists or not.
*/
const thumbExists = (req) => {
    const thumbDir = './assets/thumb';
    const fileName = req.query.fileName;
    const width = req.query.width;
    const height = req.query.height;
    const filePath = `${thumbDir}/${fileName}_${width}_${height}.jpg`;
    if (!(0, fs_1.existsSync)(filePath)) {
        return [false, filePath];
    }
    else {
        return [true, filePath];
    }
};
exports.thumbExists = thumbExists;
/*
Middleware function to make sure that the passed request
contains all required parameters
*/
const requestValidator = (req, res, next) => {
    var flag = true;
    var missingParams = [];
    if (!req.query.fileName && !req.query.width && !req.query.height) {
        res.send("Index Route Reached. Please send in the parameters 'fileName', 'width' and 'height'");
    }
    console.log(missingParams);
    if (!req.query.fileName) {
        flag = false;
        missingParams.push('fileName');
    }
    if (!req.query.width) {
        flag = false;
        missingParams.push('width');
    }
    if (!req.query.height) {
        flag = false;
        missingParams.push('height');
    }
    if (!flag) {
        res.write(`Bad Request. You are missing [${missingParams}] query parameters.\n`);
    }
    next();
};
exports.requestValidator = requestValidator;
