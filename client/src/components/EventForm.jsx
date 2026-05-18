import { useState } from 'react';
import { api } from '../api.js';

export default function EventForm({ onCreated }) {
  const [name, setEventTitle] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const created = await api.post('/events', { name });
      onCreated?.(created);
      setEventTitle('');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="event-form">
      <input value={name} onChange={(e) => setEventTitle(e.target.value)} placeholder="New event" />
      <button disabled={busy || !name.trim()}>Add</button>
    </form>
  );
}
