import express from 'express';
import router from './router';
import * as utils from './utils/utils';

const app = express();
const port = 3000;

app.use('/api', express.json(), router);

app.listen(port, () => {
  // At app startup, we'll call the utility function
  // that initializes the thumb directory if it doesn't exist

  utils.initializeDir();

  console.log(`Server started at port ${port}`);
});

export default app;
