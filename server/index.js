import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { connectDb } from './db.js';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import { errorHandler } from './middleware/error.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, service: 'devboard-metrics' }));
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  await connectDb();
  app.listen(config.port, () => console.log('DevBoard Metrics API on', config.port));
}

export default app;
