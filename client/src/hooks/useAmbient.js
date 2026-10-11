import { useEffect, useRef, useState } from 'react';

// Optional, very soft ambient pad synthesized with the Web Audio API — no asset
// files, silent by default, and fails gracefully if audio is unavailable.
export function useAmbient() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  const start = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      const ctx = ctxRef.current || new AC();
      ctxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const master = ctx.createGain();
      master.gain.value = 0.0;
      master.connect(ctx.destination);

      // two detuned sine voices for a warm pad
      const freqs = [146.83, 220, 293.66];
      const oscs = freqs.map((f, i) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = i === 0 ? 0.5 : 0.25;
        o.connect(g).connect(master);
        o.start();
        return o;
      });

      // gentle fade-in to a low volume
      master.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2.5);
      nodesRef.current = { master, oscs };
      return true;
    } catch {
      return false;
    }
  };

  const stop = () => {
    const n = nodesRef.current;
    const ctx = ctxRef.current;
    if (!n || !ctx) return;
    try {
      n.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      setTimeout(() => {
        n.oscs.forEach((o) => {
          try {
            o.stop();
          } catch {
            /* already stopped */
          }
        });
      }, 700);
    } catch {
      /* noop */
    }
    nodesRef.current = null;
  };

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        const ok = start();
        return ok ? true : false;
      }
      stop();
      return false;
    });
  };

  useEffect(() => () => stop(), []);

  return { enabled, toggle };
}

export default useAmbient;
