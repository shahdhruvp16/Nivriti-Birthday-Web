import { useEffect, useState } from 'react';

// Probes for a user-supplied diorama backdrop image. Drop the reference render
// into client/public as world.png / world.webp / world.jpg (or set
// VITE_WORLD_IMAGE) and the world scene uses it automatically; otherwise it
// falls back to the built-in SVG room.
const CANDIDATES = [
  import.meta.env.VITE_WORLD_IMAGE,
  'world.png',
  'world.webp',
  'world.jpg',
  'world.jpeg'
].filter(Boolean);

export function useWorldImage() {
  const [state, setState] = useState({ status: 'probing', src: null });

  useEffect(() => {
    let alive = true;
    const base = import.meta.env.BASE_URL || '/';

    const tryNext = (i) => {
      if (!alive) return;
      if (i >= CANDIDATES.length) {
        setState({ status: 'none', src: null });
        return;
      }
      const candidate = CANDIDATES[i];
      const src = /^https?:\/\//.test(candidate) ? candidate : `${base}${candidate}`;
      const img = new Image();
      img.onload = () => alive && setState({ status: 'ready', src });
      img.onerror = () => tryNext(i + 1);
      img.src = src;
    };

    tryNext(0);
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

export default useWorldImage;
