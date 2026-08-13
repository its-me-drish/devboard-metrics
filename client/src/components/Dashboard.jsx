import { useEffect, useState } from 'react';
import { api } from '../api.js';

const Stat = ({ label, value }) => (
  <div className="stat"><span>{label}</span><strong>{value}</strong></div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => { api.get('/metrics/summary?days=30').then(setData); }, []);

  if (!data) return <p>Crunching metrics…</p>;

  return (
    <section className="dashboard">
      <Stat label="Deploys / week" value={data.deployFrequencyPerWeek} />
      <Stat label="Change failure rate" value={`${(data.changeFailureRate * 100).toFixed(1)}%`} />
      <Stat label="Mean lead time" value={`${(data.meanLeadTimeMs / 3_600_000).toFixed(1)}h`} />
    </section>
  );
}
