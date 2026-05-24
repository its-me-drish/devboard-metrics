import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import LoginForm from './components/LoginForm.jsx';
import EventList from './components/EventList.jsx';
import EventForm from './components/EventForm.jsx';

function Shell() {
  const { token, logout } = useAuth();
  const [version, setVersion] = useState(0);

  if (!token) return <LoginForm />;

  return (
    <main className="shell">
      <header>
        <h1>DevBoard Metrics</h1>
        <button onClick={logout}>Sign out</button>
      </header>
      <EventForm onCreated={() => setVersion((v) => v + 1)} />
      <EventList key={version} />
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
