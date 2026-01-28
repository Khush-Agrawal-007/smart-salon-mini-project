import { Router } from 'express';
import { createAppointment } from '../controllers/appointment.controller';

const router = Router();

// POST /api/appointments
router.post('/', createAppointment);

export default router;
