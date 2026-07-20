import { connectDb } from '../server/db.js';
import User from '../server/models/User.js';
import Event from '../server/models/Event.js';

await connectDb();
await Event.deleteMany({});
await User.deleteMany({});

const user = await User.create({ email: 'demo@devboard-metrics.dev', name: 'Demo', passwordHash: await User.hash('demo1234') });
await Event.insertMany(["api deploy 1.4.0","checkout latency incident","feat: metrics rollup"].map((name) => ({ name, owner: user._id })));

console.log('seeded');
process.exit(0);
