import express from 'express';
const router = express.Router();
import reportController from '../controllers/report.controller.js';

router.post('/', reportController.getReports);
router.post('/surface/:surfaceId', reportController.postReport);

export default router;
