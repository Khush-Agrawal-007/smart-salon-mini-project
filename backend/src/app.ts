import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import appointmentRoutes from './routes/appointment.routes';
import dataRoutes from './routes/data.routes';
import dashboardRoutes from './routes/dashboard.routes';
import { globalErrorHandler, AppError } from './middleware/error.middleware';

const app: Application = express();

// --- Middleware ---
app.use(helmet());
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/appointments', appointmentRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running' });
});



// --- Error Handling ---
app.use(globalErrorHandler);

export default app;
