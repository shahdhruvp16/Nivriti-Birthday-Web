import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PerfumeBottle } from '../InteractiveObjects/objects.jsx';
import { Starfield, Particles } from '../UI/Atmosphere.jsx';
import './PerfumeBoutique.css';

export default function PerfumeBoutique({ fragrances, reduced, onExit }) {
  const [selected, setSelected] = useState(null);
  const list = [...fragrances].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const sel = selected ? list.find((f) => f.key === selected) : null;

  return (
    <div className="boutique">
      <Starfield count={40} reduced={reduced} />
      <Particles count={10} reduced={reduced} />
      <div className="boutique__room" aria-hidden="true" />

      <header className="boutique__header">
        <button className="btn btn--ghost boutique__back" onClick={onExit}>
          ← Back to the room
        </button>
        <div className="boutique__title">
          <span className="boutique__eyebrow">The Little Boutique</span>
          <h1>Parfums de Nivriti</h1>
          <p>A tiny fragrance atelier. Pick up a bottle.</p>
        </div>
      </header>

      <div className="boutique__shelf" role="list">
        {list.map((f) => (
          <motion.button
            key={f.key}
            role="listitem"
            className={`frag ${f.signature ? 'frag--signature' : ''} ${
              selected === f.key ? 'frag--active' : ''
            }`}
            onClick={() => setSelected(f.key)}
            aria-label={`${f.name}, ${f.number}. View details.`}
            whileHover={reduced ? undefined : { y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {f.signature && !reduced && <span className="frag__sparkle" aria-hidden="true" />}
            <span className="frag__bottle">
              <PerfumeBottle signature={f.signature} label={f.number} />
            </span>
            <span className="frag__plate">
              <span className="frag__num">{f.number}</span>
              <span className="frag__name">{f.name}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div
            className="frag-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={`frag-detail ${sel.signature ? 'frag-detail--signature' : ''}`}
              onClick={(e) => e.stopPropagation()}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={`${sel.name} fragrance`}
            >
              <div className="frag-detail__visual">
                {sel.signature && !reduced && (
                  <div className="frag-detail__sparkles" aria-hidden="true">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span key={i} style={{ '--i': i }} />
                    ))}
                  </div>
                )}
                <PerfumeBottle signature={sel.signature} label={sel.number} />
              </div>
              <div className="frag-detail__info">
                <span className="frag-detail__num">{sel.number}</span>
                <h2>{sel.name}</h2>
                {sel.layeredNotes ? (
                  <dl className="frag-detail__layers">
                    <div>
                      <dt>Top</dt>
                      <dd>{sel.layeredNotes.top}</dd>
                    </div>
                    <div>
                      <dt>Heart</dt>
                      <dd>{sel.layeredNotes.heart}</dd>
                    </div>
                    <div>
                      <dt>Base</dt>
                      <dd>{sel.layeredNotes.base}</dd>
                    </div>
                  </dl>
                ) : (
                  <ul className="frag-detail__notes">
                    {sel.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                )}
                <p className="frag-detail__desc">{sel.description}</p>
                <button className="btn btn--ghost" onClick={() => setSelected(null)}>
                  ← Back to the boutique
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
