import { Router } from 'express';
import {
  getHealth,
  getBirthday,
  getWorldObjects,
  getFragrances,
  getLetter
} from '../controllers/contentController.js';

const router = Router();

router.get('/health', getHealth);
router.get('/birthday', getBirthday);
router.get('/world-objects', getWorldObjects);
router.get('/fragrances', getFragrances);
router.get('/letter', getLetter);

export default router;
