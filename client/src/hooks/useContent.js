import { useEffect, useState } from 'react';
import { birthday as fbBirthday, worldObjects as fbObjects, fragrances as fbFragrances } from '../data/content.js';

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function getJSON(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

/**
 * Loads all birthday content from the API with a graceful local fallback.
 * Returns { status, source, birthday, worldObjects, fragrances }.
 * status: 'loading' | 'ready' | 'fallback'
 */
export function useContent() {
  const [state, setState] = useState({
    status: 'loading',
    source: null,
    birthday: fbBirthday,
    worldObjects: fbObjects,
    fragrances: fbFragrances
  });

  useEffect(() => {
    let alive = true;
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 4500)
    );

    (async () => {
      try {
        const [b, w, f] = await Promise.race([
          Promise.all([
            getJSON('/api/birthday'),
            getJSON('/api/world-objects'),
            getJSON('/api/fragrances')
          ]),
          timeout
        ]);
        if (!alive) return;
        setState({
          status: 'ready',
          source: b.source,
          birthday: b.data,
          worldObjects: w.data,
          fragrances: f.data
        });
      } catch (err) {
        // API unreachable — use bundled content so the experience still works.
        if (!alive) return;
        console.warn('[content] Using local fallback content:', err.message);
        setState((s) => ({ ...s, status: 'fallback', source: 'local-fallback' }));
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return state;
}

export default useContent;
