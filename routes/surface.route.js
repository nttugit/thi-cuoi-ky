import express from 'express';
const router = express.Router();
import surfaceController from '../controllers/surface.controller.js';

router.get('/space/:spaceId', surfaceController.getSurfaces);

export default router;
