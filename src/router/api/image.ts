import express from 'express';
import { thumbExists } from '../../utils/utils';
import sharp from 'sharp';
import path from 'path';
import { existsSync, readdirSync } from 'fs';

const images = express.Router();

images.get('/', async (req, res) => {
  /*
        There is a middleware function handling validation
        for the request. The first stage of the endpoint is
        to make sure if the file with the parameters passed
        already exists then to load that file.
    */
  const fileExists = thumbExists(req);

  if (!fileExists[0]) {
    /*
            Since the file queried doesn't exist, we need to check the original file,
            read it, resize it, save it and then load it.
        */
    const originalPath = `./assets/full/${req.query.fileName}.jpg`;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    /*
            We surely need to handle the case where the original fileName
            doesn't exist in the first place.
        */
    if (!existsSync(originalPath)) {
      const files = readdirSync('./assets/full/');
      console.log(files);
      res
        .status(400)
        .end(`File doesn't exist. Available files are: [${files.toString()}]`);
    } else {
      await sharp(originalPath)
        .resize(width, height)
        .toFile(fileExists[1])
        .then(() => {
          res.sendFile(path.resolve(fileExists[1]), (err) => {
            if (err) {
              console.log(err);
              res.send(err.message);
            } else {
              console.log('File converted and sent');
            }
          });
        });
    }
  } else {
    res.sendFile(path.resolve(fileExists[1]), (err) => {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        console.log('File loaded from cache');
      }
    });
  }
});

export default images;
