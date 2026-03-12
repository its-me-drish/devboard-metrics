import { Router } from 'express';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const items = await Event.find({ owner: req.user.sub }).sort('-createdAt');
  res.json(items);
});

router.post('/', async (req, res) => {
  const item = await Event.create({ ...req.body, owner: req.user.sub });
  res.status(201).json(item);
});

router.patch('/:id', async (req, res) => {
  const item = await Event.findOneAndUpdate({ _id: req.params.id, owner: req.user.sub }, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'not found' });
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await Event.deleteOne({ _id: req.params.id, owner: req.user.sub });
  res.status(204).end();
});

export default router;
