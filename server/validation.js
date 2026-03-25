import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().min(1).max(200),
  kind: z.enum(['deploy', 'incident', 'pull_request']),
  durationMs: z.number().int().nonnegative().optional(),
});

export const validate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: parsed.error.issues });
  req.body = parsed.data;
  next();
};
