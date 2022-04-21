# FSND JS Image Processing API
This repository is created in fulfillment of Udacity's FSND JS track.

This project is briefly an Express server with an exposed API that takes on an image file name and using `sharp` package, resizes the image to a desired width and height.

To install dependencies, run the following command:
```
npm install
```

To build the project from the TypeScript code written, run the following command:
```
npm run build
```

To have the server up and running, run the following command:
```
node build/index.js
```

A sample request to try out.
```
http://localhost:3000/api?fileName=doggo&width=200&height=100
```

The sample image available is `doggo.jpg` found in the directory `assets/full`.

The resized output will be found under `/assets/thumb` with the following name convention:

```
fileName_width_height.jpg
```