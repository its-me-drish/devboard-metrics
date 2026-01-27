import express from 'express';
import { config } from './config.js';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, service: 'devboard-metrics' }));

app.listen(config.port, () => console.log('DevBoard Metrics API on', config.port));

export default app;
