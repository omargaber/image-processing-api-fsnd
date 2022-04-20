import express from 'express';
import { existsSync, mkdirSync } from 'fs';

// Function to validate if the thumb directory exists or not.
const initializeDir = (): void => {
  // First step is to make sure the directory /assets/thumb exists or not
  const thumbDirPath = './assets/thumb';
  if (!existsSync(thumbDirPath)) {
    mkdirSync(thumbDirPath);
    console.log('Directory Created.');
  } else {
    console.log('Directory Exists.');
  }
};

/*
Function to exist if thumb image already exists then return it
The function will return a tuple with a boolean field and a string
The boolean would be true if it exists and the second element of the tuple
would always be the string of the file path whether it exists or not.
*/
const thumbExists = (req: express.Request): [boolean, string] => {
  const thumbDir = './assets/thumb';
  const fileName = req.query.fileName;
  const width = req.query.width;
  const height = req.query.height;

  const filePath = `${thumbDir}/${fileName}_${width}_${height}.jpg`;

  if (!existsSync(filePath)) {
    return [false, filePath];
  } else {
    return [true, filePath];
  }
};

/*
Middleware function to make sure that the passed request 
contains all required parameters
*/
const requestValidator = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  var flag: boolean = true;
  var missingParams: string[] = [];

  if (!req.query.fileName && !req.query.width && !req.query.height) {
    res.send(
      "Index Route Reached. Please send in the parameters 'fileName', 'width' and 'height'"
    );
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
    res.write(
      `Bad Request. You are missing [${missingParams}] query parameters.\n`
    );
  }

  next();
};

export { initializeDir, requestValidator, thumbExists };
