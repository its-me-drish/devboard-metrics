import Event from '../models/Event.js';

export async function summary(ownerId, days = 30) {
  const since = new Date(Date.now() - days * 86_400_000);
  const rows = await Event.aggregate([
    { $match: { owner: ownerId, occurredAt: { $gte: since } } },
    { $group: { _id: '$kind', count: { $sum: 1 }, avgDurationMs: { $avg: '$durationMs' } } },
  ]);
  const byKind = Object.fromEntries(rows.map((r) => [r._id, r]));
  const deploys = byKind.deploy?.count ?? 0;
  return {
    days,
    deployFrequencyPerWeek: Number(((deploys / days) * 7).toFixed(2)),
    changeFailureRate: deploys ? Number(((byKind.incident?.count ?? 0) / deploys).toFixed(3)) : 0,
    meanLeadTimeMs: Math.round(byKind.pull_request?.avgDurationMs ?? 0),
    byKind,
  };
}
