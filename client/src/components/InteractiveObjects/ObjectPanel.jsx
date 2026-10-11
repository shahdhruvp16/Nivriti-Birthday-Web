import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sunflower, EvilEye, Earphones, Charger, Chocolates } from './objects.jsx';
import './ObjectPanel.css';

const ICONS = {
  sunflower: Sunflower,
  evileye: EvilEye,
  earphones: Earphones,
  charger: Charger,
  chocolates: Chocolates
};

export default function ObjectPanel({
  open,
  onClose,
  title,
  subtitle,
  message,
  badge,
  connection,
  objectKey,
  variant = 'default',
  reduced = false
}) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const Icon = objectKey ? ICONS[objectKey] : null;
  const isGift = variant === 'default' && !!objectKey;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const f = panelRef.current?.querySelectorAll(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (!f || !f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
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
          className="panel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={panelRef}
            className={`panel panel--${variant} ${isGift ? 'panel--gift' : ''} ${
              objectKey ? `panel--${objectKey}` : ''
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <button ref={closeRef} className="panel__x" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {isGift ? (
              <>
                <header className="panel__head">
                  {Icon && (
                    <div className="panel__icon" aria-hidden="true">
                      <Icon />
                    </div>
                  )}
                  <div className="panel__headtext">
                    {badge && <span className="panel__chip">{badge}</span>}
                    <h2 className="panel__title">{title}</h2>
                    {subtitle && <p className="panel__subtitle">{subtitle}</p>}
                  </div>
                </header>

                <div className="panel__rule" aria-hidden="true" />

                <blockquote className="panel__quote">{message}</blockquote>

                {connection && (
                  <div className="panel__connection">
                    <div className="panel__connection-head">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2.5 6.5L22 12l-6.5 2.5L13 21l-2.5-6.5L4 12l6.5-2.5z" />
                      </svg>
                      <span>Real-World Gift Connection</span>
                    </div>
                    <p>{connection}</p>
                  </div>
                )}

                <button className="panel__return" onClick={onClose}>
                  Return to World
                </button>
              </>
            ) : (
              <>
                <div className="panel__accent" aria-hidden="true" />
                <h2 className="panel__title panel__title--center">{title}</h2>
                {badge && <span className="panel__badge">{badge}</span>}
                <p className="panel__message">{message}</p>
                <button className="btn btn--ghost panel__close" onClick={onClose}>
                  Close
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
