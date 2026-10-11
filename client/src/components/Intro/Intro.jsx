import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Starfield, Particles } from '../UI/Atmosphere.jsx';
import './Intro.css';

export default function Intro({ intro, onEnter, reduced }) {
  const bootLines = intro?.bootLines ?? [];
  const [typed, setTyped] = useState([]); // array of fully/partially typed lines
  const [done, setDone] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    // Reduced motion (or skip): show everything immediately.
    if (reduced) {
      setTyped(bootLines);
      setDone(true);
      return;
    }

    let cancelled = false;
    const run = async () => {
      const wait = (ms) =>
        new Promise((r) => {
          const t = setTimeout(r, ms);
          timers.current.push(t);
        });

      for (let i = 0; i < bootLines.length; i++) {
        const line = bootLines[i];
        for (let c = 0; c <= line.length; c++) {
          if (cancelled) return;
          setTyped((prev) => {
            const next = [...prev];
            next[i] = line.slice(0, c);
            return next;
          });
          await wait(26);
        }
        await wait(360);
      }
      if (!cancelled) {
        await wait(300);
        setDone(true);
      }
    };
    run();

    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyped(bootLines);
    setDone(true);
  };

  return (
    <div className="intro">
      <Starfield count={70} reduced={reduced} />
      <Particles count={14} reduced={reduced} />
      <div className="intro__vignette" aria-hidden="true" />

      <div className="intro__inner">
        <div className="intro__terminal" role="status" aria-live="polite">
          {bootLines.map((line, i) => (
            <p className="intro__line" key={i}>
              <span className="intro__prompt">›</span>
              <span>{typed[i] ?? ''}</span>
              {!done && typed[i] !== undefined && typed[i].length < line.length && (
                <span className="intro__cursor" aria-hidden="true" />
              )}
            </p>
          ))}
        </div>

        {done && (
          <motion.div
            className="intro__reveal"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="intro__name" aria-label={intro.name}>
              {intro.name.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="intro__name-char"
                  initial={reduced ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: reduced ? 0 : 0.15 + i * 0.08, duration: 0.6 }}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="intro__meta"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.9, duration: 0.7 }}
            >
              <span className="intro__status">{intro.status}</span>
              <p className="intro__tagline">{intro.tagline}</p>
              <button className="btn intro__enter" onClick={onEnter}>
                {intro.enterLabel} <span aria-hidden="true">→</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {!done && (
        <button className="intro__skip" onClick={skip}>
          Skip intro →
        </button>
      )}
    </div>
  );
}
