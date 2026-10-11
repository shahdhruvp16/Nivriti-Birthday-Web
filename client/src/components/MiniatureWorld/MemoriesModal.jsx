import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './MemoriesModal.css';

export default function MemoriesModal({ open, memories = [], onClose, reduced = false }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mem-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={panelRef}
            className="mem"
            role="dialog"
            aria-modal="true"
            aria-label="Memories and moments"
            onClick={(e) => e.stopPropagation()}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <button ref={closeRef} className="mem__x" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="mem__eyebrow">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span>MEMORIES &amp; MOMENTS</span>
            </div>
            <h3 className="mem__title">Polaroids on the Wall</h3>
            <p className="mem__sub">
              Little moments, inside jokes, and thoughtful memories pinned in your miniature room.
            </p>

            <div className="mem__grid">
              {memories.map((m, i) => (
                <article
                  className="polaroid"
                  key={m.id}
                  style={{ '--tilt': i % 2 === 0 ? '-1.4deg' : '1.4deg' }}
                >
                  <div className="polaroid__photo">
                    <span className="polaroid__emoji">{m.emoji}</span>
                    <span className="polaroid__tag">{m.tag}</span>
                  </div>
                  <div className="polaroid__caption">
                    <div className="polaroid__meta">
                      <span>{m.title}</span>
                      <span>{m.date}</span>
                    </div>
                    <p className="polaroid__quote">&ldquo;{m.caption}&rdquo;</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mem__footer">
              <button className="mem__return" onClick={onClose}>
                Return to Little World
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
