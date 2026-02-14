import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    kind: { type: String, enum: ['deploy', 'incident', 'pull_request'], required: true },
    durationMs: Number,
    occurredAt: { type: Date, default: Date.now, index: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
