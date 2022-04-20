import express from 'express';
import images from './api/image';
import * as utils from '../utils/utils';

const router = express.Router();

router.use('/', utils.requestValidator, images);

export default router;
