import { Router } from 'express';
import { getServices, getStylists, getCustomers } from '../controllers/data.controller';

const router = Router();

router.get('/services', getServices);
router.get('/stylists', getStylists);
router.get('/customers', getCustomers);

export default router;
