import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RoomShell from '../MiniatureWorld/RoomShell.jsx';
import Character from '../Character/Character.jsx';
import { Starfield, Particles } from '../UI/Atmosphere.jsx';
import useWorldImage from '../../hooks/useWorldImage.js';
import './FinalUniverse.css';

export default function FinalUniverse({ final, reduced, onReplay }) {
  const lines = final?.lines ?? [];
  const [step, setStep] = useState(reduced ? lines.length + 1 : 0);
  const world = useWorldImage();

  useEffect(() => {
    if (reduced) return;
    const timers = [];
    // reveal each line, then the title block
    for (let i = 0; i <= lines.length; i++) {
      timers.push(setTimeout(() => setStep(i + 1), 1600 + i * 2000));
    }
    return () => timers.forEach(clearTimeout);
  }, [reduced, lines.length]);

  return (
    <div className="final">
      <Starfield count={90} reduced={reduced} />
      <Particles count={16} reduced={reduced} />
      <div className="final__vignette" aria-hidden="true" />

      <motion.div
        className="final__globe-wrap"
        initial={reduced ? false : { scale: 1.8, y: 60 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`final__globe${reduced ? '' : ' final__globe--float'}`}>
          <div className="final__world">
            {world.status === 'ready' ? (
              <img className="final__worldimg" src={world.src} alt="Nivriti's little world" draggable="false" />
            ) : (
              <>
                <RoomShell />
                <div className="final__char">
                  <Character reduced={reduced} celebrate={!reduced} />
                </div>
              </>
            )}
          </div>
          <div className="final__glass" aria-hidden="true" />
          <div className="final__glow" aria-hidden="true" />
          {!reduced && (
            <div className="final__globe-sparkles" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} style={{ '--i': i }} />
              ))}
            </div>
          )}
        </div>
        <div className="final__base" aria-hidden="true" />
      </motion.div>

      <div className="final__text">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="final__line"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={step > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.9 }}
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          className="final__hero"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={step > lines.length ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1 }}
        >
          <h1 className="final__title">{final?.title}</h1>
          <p className="final__sub">{final?.subheading}</p>
          <div className="final__decor" aria-hidden="true">
            <span>🌻</span>
            <span className="final__star">✦</span>
            <span>🌻</span>
          </div>
          <button className="btn final__replay" onClick={onReplay}>
            {final?.replayLabel || 'Explore your world again'}
          </button>
          <p className="final__sig">{final?.signature}</p>
        </motion.div>
      </div>
    </div>
  );
}
