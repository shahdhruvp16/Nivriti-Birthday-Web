import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from './components/Intro/Intro.jsx';
import MiniatureWorld from './components/MiniatureWorld/MiniatureWorld.jsx';
import PerfumeBoutique from './components/PerfumeBoutique/PerfumeBoutique.jsx';
import TiramisuScene from './components/Tiramisu/Tiramisu.jsx';
import Letter from './components/Letter/Letter.jsx';
import FinalUniverse from './components/FinalUniverse/FinalUniverse.jsx';
import useContent from './hooks/useContent.js';
import useReducedMotion from './hooks/useReducedMotion.js';
import useAmbient from './hooks/useAmbient.js';
import './styles/global.css';

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function App() {
  const { status, birthday, worldObjects, fragrances } = useContent();
  const reduced = useReducedMotion();
  const [scene, setScene] = useState('intro');

  const { enabled: soundOn, toggle: toggleSound } = useAmbient();

  const go = useCallback((next) => setScene(next), []);

  const enterWorld = useCallback(() => {
    setScene('world');
  }, []);

  const letter = useMemo(() => birthday?.letter, [birthday]);
  const tiramisu = useMemo(() => birthday?.tiramisu, [birthday]);

  // Loading state (brief): a quiet, on-brand loader until content is ready.
  if (status === 'loading' && !birthday) {
    return (
      <div className="app-shell app-loader" aria-busy="true">
        <div className="app-loader__mark">
          <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
            <g fill="#e8b85a" className="app-loader__petals">
              <ellipse cx="32" cy="14" rx="5" ry="10" />
              <ellipse cx="32" cy="50" rx="5" ry="10" />
              <ellipse cx="14" cy="32" rx="10" ry="5" />
              <ellipse cx="50" cy="32" rx="10" ry="5" />
              <ellipse cx="19" cy="19" rx="5" ry="10" transform="rotate(45 19 19)" />
              <ellipse cx="45" cy="19" rx="5" ry="10" transform="rotate(-45 45 19)" />
              <ellipse cx="19" cy="45" rx="5" ry="10" transform="rotate(-45 19 45)" />
              <ellipse cx="45" cy="45" rx="5" ry="10" transform="rotate(45 45 45)" />
            </g>
            <circle cx="32" cy="32" r="11" fill="#5b3a1e" />
          </svg>
        </div>
        <p className="app-loader__text">Preparing a little world…</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {/* Persistent, unobtrusive controls (hidden on intro) */}
      {scene !== 'intro' && (
        <div className="topbar">
          <button
            className="iconbtn"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Mute ambient sound' : 'Play ambient sound'}
            title={soundOn ? 'Sound on' : 'Sound off'}
          >
            {soundOn ? '♪' : '♪̶'}
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <motion.div key="intro" className="scene" {...fade} transition={{ duration: 0.5 }}>
            <Intro intro={birthday.intro} onEnter={enterWorld} reduced={reduced} />
          </motion.div>
        )}

        {scene === 'world' && (
          <motion.div key="world" className="scene" {...fade} transition={{ duration: 0.6 }}>
            <MiniatureWorld
              birthday={birthday}
              worldObjects={worldObjects}
              reduced={reduced}
              onOpenScene={go}
            />
          </motion.div>
        )}

        {scene === 'boutique' && (
          <motion.div key="boutique" className="scene" {...fade} transition={{ duration: 0.5 }}>
            <PerfumeBoutique fragrances={fragrances} reduced={reduced} onExit={() => go('world')} />
          </motion.div>
        )}

        {scene === 'tiramisu' && (
          <motion.div key="tiramisu" className="scene" {...fade} transition={{ duration: 0.5 }}>
            <TiramisuScene tiramisu={tiramisu} reduced={reduced} onExit={() => go('world')} />
          </motion.div>
        )}

        {scene === 'letter' && (
          <motion.div key="letter" className="scene" {...fade} transition={{ duration: 0.5 }}>
            <Letter
              letter={letter}
              reduced={reduced}
              onExit={() => go('world')}
              onContinue={() => go('world')}
            />
          </motion.div>
        )}

        {scene === 'final' && (
          <motion.div key="final" className="scene" {...fade} transition={{ duration: 0.8 }}>
            <FinalUniverse final={birthday.final} reduced={reduced} onReplay={() => go('world')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
