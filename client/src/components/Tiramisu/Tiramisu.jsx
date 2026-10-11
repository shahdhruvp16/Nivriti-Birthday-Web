import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tiramisu as TiramisuSprite } from '../InteractiveObjects/objects.jsx';
import { Particles } from '../UI/Atmosphere.jsx';
import './Tiramisu.css';

export default function TiramisuScene({ tiramisu, reduced, onExit }) {
  const recipe = tiramisu?.recipe ?? [];
  const [revealed, setRevealed] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setRevealed(true), 400 + recipe.length * 500 + 400);
    return () => clearTimeout(t);
  }, [reduced, recipe.length]);

  return (
    <div className="tira">
      <Particles count={10} reduced={reduced} />
      <div className="tira__spot" aria-hidden="true" />

      <button className="btn btn--ghost tira__back" onClick={onExit}>
        ← Back to the room
      </button>

      <div className="tira__inner">
        <motion.div
          className="tira__dessert"
          initial={reduced ? false : { scale: 0.6, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiramisuSprite />
          {revealed && !reduced && (
            <div className="tira__sparkles" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} style={{ '--i': i }} />
              ))}
            </div>
          )}
        </motion.div>

        <h1 className="tira__title">The Birthday Dessert</h1>

        <ul className="tira__recipe">
          {recipe.map((line, i) => (
            <motion.li
              key={i}
              initial={reduced ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reduced ? 0 : 0.4 + i * 0.5, duration: 0.5 }}
            >
              {line}
            </motion.li>
          ))}
        </ul>

        {revealed && (
          <motion.div
            className="tira__reveal"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p>{tiramisu?.reveal}</p>
            <button className="btn" onClick={onExit}>
              Back to the room
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
