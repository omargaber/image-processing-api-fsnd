import express from 'express';
import { thumbExists, imageResize } from '../../utils/utils';
import path from 'path';
import { existsSync, readdirSync } from 'fs';

const images = express.Router();

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
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
      if (!existsSync(originalPath)) {
        const files = readdirSync('./assets/full/');
        res
          .status(400)
          .end(
            `File parameter missing or doesn't exist. Available files are: [${files.toString()}]`
          );
        return;
      } else {
        /*
          Since the file exists, now we proceed to resizing the image.
      */

        const resizeSuccess = await imageResize(
          originalPath,
          width,
          height,
          fileExists[1]
        );
        if (resizeSuccess) {
          res.sendFile(path.resolve(fileExists[1]), (err) => {
            if (err) {
              console.log(err);
              res.send(err.message);
            } else {
              console.log('Sent file to client.');
            }
          });
        } else {
          res.status(422).send('An error occurred while processing the image.');
          return;
        }
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
  }
);

export default images;
