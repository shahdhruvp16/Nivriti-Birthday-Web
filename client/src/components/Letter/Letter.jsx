import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Particles } from '../UI/Atmosphere.jsx';
import './Letter.css';

export default function Letter({ letter, reduced, onContinue, onExit }) {
  const [open, setOpen] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div className="letter-scene">
      <Particles count={8} reduced={reduced} />
      <button className="btn btn--ghost letter-scene__back" onClick={onExit}>
        ← Back to the room
      </button>

      {!open ? (
        <button className="letter-env" onClick={() => setOpen(true)} aria-label="Open the letter">
          <div className="letter-env__flap" />
          <div className="letter-env__body" />
          <div className="letter-env__seal">N</div>
          <span className="letter-env__hint">Tap to open</span>
        </button>
      ) : (
        <motion.article
          className="paper"
          initial={reduced ? false : { opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-label="A letter for Nivriti"
        >
          <div className="paper__grain" aria-hidden="true" />
          <p className="paper__salutation">{letter.salutation}</p>
          {letter.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="paper__para"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.5 + i * 0.18, duration: 0.6 }}
            >
              {p}
            </motion.p>
          ))}
          <p className="paper__closing">{letter.closing}</p>
          <p className="paper__signoff">{letter.signoff}</p>
          <p className="paper__from">{letter.from}</p>

          <button className="btn paper__continue" onClick={onContinue}>
            {letter.continueLabel || 'Continue exploring'} <span aria-hidden="true">→</span>
          </button>
        </motion.article>
      )}
    </div>
  );
}
