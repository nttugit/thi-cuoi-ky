import express from 'express';
const router = express.Router();
import reportController from '../controllers/report.controller.js';

router.get('/surface/:surfaceId', reportController.postReport);

export default router;
