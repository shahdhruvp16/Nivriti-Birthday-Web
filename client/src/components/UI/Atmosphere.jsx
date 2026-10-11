import { useMemo } from 'react';
import './Atmosphere.css';

// Deterministic pseudo-random so re-renders don't reshuffle the sky.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function Starfield({ count = 60, reduced = false }) {
  const stars = useMemo(() => {
    const rand = seeded(7);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 70,
      size: 1 + rand() * 2,
      delay: rand() * 6,
      dur: 3 + rand() * 4,
      bright: 0.4 + rand() * 0.6
    }));
  }, [count]);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className={reduced ? 'star star--static' : 'star'}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--bright': s.bright,
            '--delay': `${s.delay}s`,
            '--dur': `${s.dur}s`
          }}
        />
      ))}
    </div>
  );
}

export function Particles({ count = 18, reduced = false }) {
  const motes = useMemo(() => {
    const rand = seeded(23);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 100,
      size: 2 + rand() * 4,
      delay: rand() * 12,
      dur: 12 + rand() * 14,
      drift: (rand() - 0.5) * 60
    }));
  }, [count]);

  if (reduced) return null;

  return (
    <div className="particles" aria-hidden="true">
      {motes.map((m) => (
        <span
          key={m.id}
          className="mote"
          style={{
            left: `${m.x}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            '--delay': `${m.delay}s`,
            '--dur': `${m.dur}s`,
            '--drift': `${m.drift}px`
          }}
        />
      ))}
    </div>
  );
}
