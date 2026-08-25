import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

function getItems(payload) { return Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : Array.isArray(payload?.results) ? payload.results : []; }

export default function Workouts() {
  const [items, setItems] = useState([]); const [status, setStatus] = useState('Loading workouts...');
  useEffect(() => { fetch(API_URL).then((response) => { if (!response.ok) throw new Error(`Request failed: ${response.status}`); return response.json(); }).then((payload) => { setItems(getItems(payload)); setStatus(''); }).catch((error) => setStatus(error.message)); }, []);
  return <section><h2 className="h4">Workouts</h2>{status && <p className="text-secondary">{status}</p>}{!status && !items.length && <p className="text-secondary">No records found.</p>}{!!items.length && <div className="list-group">{items.map((item, index) => <pre className="list-group-item mb-0" key={item._id || index}>{JSON.stringify(item, null, 2)}</pre>)}</div>}</section>;
}
