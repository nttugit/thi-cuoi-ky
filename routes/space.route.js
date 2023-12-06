import express from 'express';
const router = express.Router();
import spaceController from '../controllers/space.controller.js';

router.get('/', spaceController.getSpaces);

export default router;
