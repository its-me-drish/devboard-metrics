import { Router } from 'express';
import { summary } from '../services/metrics.js';
import { requireAuth } from '../middleware/auth.js';

const cache = new Map();
const TTL_MS = 60_000;
const router = Router();

router.get('/summary', requireAuth, async (req, res) => {
  const days = Math.min(Number(req.query.days) || 30, 365);
  const key = `${req.user.sub}:${days}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return res.json(hit.value);
  const value = await summary(req.user.sub, days);
  cache.set(key, { at: Date.now(), value });
  res.json(value);
});

export default router;
