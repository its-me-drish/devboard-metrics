import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function EventList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/events').then((data) => setItems(data.items ?? data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events…</p>;
  if (!items.length) return <p>No events yet.</p>;

  return (
    <ul className="event-list">
      {items.map((item) => (
        <li key={item._id}>
          <strong>{item.name}</strong>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </li>
      ))}
    </ul>
  );
}
