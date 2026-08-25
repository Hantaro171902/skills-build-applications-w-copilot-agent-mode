import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

function getItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('Loading activities...');

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        setActivities(getItems(payload));
        setStatus('');
      })
      .catch((error) => setStatus(error.message));
  }, []);

  return <ResourceList title="Activities" items={activities} status={status} />;
}

function ResourceList({ title, items, status }) {
  return (
    <section>
      <h2 className="h4">{title}</h2>
      {status && <p className="text-secondary">{status}</p>}
      {!status && !items.length && <p className="text-secondary">No records found.</p>}
      {!!items.length && (
        <div className="list-group">
          {items.map((item, index) => <pre className="list-group-item mb-0" key={item._id || index}>{JSON.stringify(item, null, 2)}</pre>)}
        </div>
      )}
    </section>
  );
}
