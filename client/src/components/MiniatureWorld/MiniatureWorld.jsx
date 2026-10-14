import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import RoomShell from './RoomShell.jsx';
import Character from '../Character/Character.jsx';
import Sidebar from './Sidebar.jsx';
import MemoriesModal from './MemoriesModal.jsx';
import { Starfield, Particles } from '../UI/Atmosphere.jsx';
import ObjectPanel from '../InteractiveObjects/ObjectPanel.jsx';
import useWorldImage from '../../hooks/useWorldImage.js';
import {
  Sunflower,
  EvilEye,
  Earphones,
  Charger,
  Chocolates,
  LetterEnvelope,
  Tiramisu,
  PerfumeBottle
} from '../InteractiveObjects/objects.jsx';
import './MiniatureWorld.css';

const SPRITES = {
  sunflower: Sunflower,
  evileye: EvilEye,
  earphones: Earphones,
  charger: Charger,
  chocolates: Chocolates,
  letter: LetterEnvelope,
  tiramisu: Tiramisu,
  perfume: PerfumeBottle
};

// --- Hotspots for the SVG fallback room (center-anchored, % of square) ---
const FALLBACK_HOTSPOTS = {
  sunflower: { x: 15, y: 53, w: 13, labelSide: 'left' },
  evileye: { x: 33, y: 48, w: 10, labelSide: 'up' },
  earphones: { x: 14, y: 72, w: 13, labelSide: 'left' },
  charger: { x: 25, y: 78, w: 10, labelSide: 'down' },
  tiramisu: { x: 39, y: 66, w: 12, labelSide: 'up' },
  chocolates: { x: 46, y: 82, w: 14, labelSide: 'down' },
  letter: { x: 62, y: 69, w: 14, labelSide: 'right' },
  perfume: { x: 82, y: 53, w: 16, labelSide: 'up' }
};

// --- Clickable regions tuned to the reference render (top-left anchored, %) ---
// Menu items sit over the image's baked sidebar; object boxes over each object.
const IMG_MENU = [
  { key: 'home', left: 1.5, top: 11, w: 15, h: 4.6, label: 'Home' },
  { key: 'explore', left: 1.5, top: 15.6, w: 15, h: 4.4, label: 'Explore' },
  { key: 'memories', left: 1.5, top: 19.8, w: 16, h: 4.4, label: 'Memories' },
  { key: 'perfume', left: 1.5, top: 24.1, w: 19, h: 4.4, label: 'Perfume Room' },
  { key: 'letter', left: 1.5, top: 28.4, w: 15, h: 4.4, label: 'Letter' },
  { key: 'finale', left: 1.5, top: 32.7, w: 15, h: 4.4, label: 'Finale' },
  { key: 'settings', left: 1.5, top: 36.8, w: 11, h: 4.6, label: 'Settings' }
];
const IMG_OBJECTS = {
  sunflower: { left: 12.5, top: 45, w: 13, h: 15 },
  evileye: { left: 25, top: 41, w: 10, h: 12 },
  earphones: { left: 8, top: 62, w: 13, h: 12 },
  charger: { left: 20, top: 68, w: 11, h: 12 },
  tiramisu: { left: 30, top: 57, w: 13, h: 15 },
  chocolates: { left: 38, top: 71, w: 15, h: 13 },
  letter: { left: 56, top: 60, w: 15, h: 13 },
  perfume: { left: 75, top: 44, w: 16, h: 20 }
};

export default function MiniatureWorld({ birthday, worldObjects, reduced, onOpenScene }) {
  const world = useWorldImage();
  const hasImage = world.status === 'ready';

  const [active, setActive] = useState(null); // object key for info panel
  const [modal, setModal] = useState(null); // 'memories' | 'settings' | 'egg'
  const [exploreAll, setExploreAll] = useState(false);

  const byKey = useMemo(
    () => Object.fromEntries(worldObjects.map((o) => [o.key, o])),
    [worldObjects]
  );

  const handleObject = (obj) => {
    if (!obj) return;
    if (obj.opensScene) onOpenScene(obj.opensScene);
    else setActive(obj.key);
  };

  const onNav = (key) => {
    switch (key) {
      case 'home':
        setActive(null);
        setModal(null);
        break;
      case 'explore':
        setExploreAll((v) => !v);
        break;
      case 'memories':
        setModal('memories');
        break;
      case 'perfume':
        onOpenScene('boutique');
        break;
      case 'letter':
        onOpenScene('letter');
        break;
      case 'finale':
        onOpenScene('final');
        break;
      case 'settings':
        setModal('settings');
        break;
      default:
        break;
    }
  };

  const activeObj = active ? byKey[active] : null;
  const intro = birthday?.intro;
  const labelsPersistent = !hasImage || exploreAll;

  return (
    <div className={`world ${hasImage ? 'world--image' : ''}`}>
      <Starfield count={hasImage ? 44 : 60} reduced={reduced} />
      <Particles count={12} reduced={reduced} />
      <div className="world__ambient" aria-hidden="true" />

      {/* The app's own chrome is only shown for the illustrated fallback. When a
          backdrop render is present, the image already contains the menu,
          terminal text, title and labels — so we just make it interactive. On
          phones we still show a big, tappable bottom nav (the baked menu is tiny
          at that size); CSS hides it on desktop where the baked menu is used. */}
      {hasImage && (
        <>
          <Sidebar active={exploreAll ? 'explore' : 'home'} onSelect={onNav} />
          <div className="world__mhint" aria-hidden="true">✨ tap the glowing little things</div>
        </>
      )}

      {!hasImage && (
        <>
          <Sidebar active={exploreAll ? 'explore' : 'home'} onSelect={onNav} />
          <div className="world__terminal" aria-hidden="true">
            <p>&gt; A little world...</p>
            <p>&gt; Just for you.</p>
            <p>&gt; Happy Birthday! <span className="world__heart">♥</span></p>
          </div>
          <div className="world__title">
            <span className="world__title-script">
              {intro?.name ? capitalize(intro.name) : 'Nivriti'}
            </span>
            <span className="world__title-sub">A LITTLE WORLD<br />MADE FOR YOU</span>
          </div>
        </>
      )}

      <div className="world__diorama-wrap">
        <motion.div
          className={`world__diorama ${hasImage ? 'is-image' : ''}`}
          initial={reduced ? false : { opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {hasImage ? (
            <>
              <img className="world__img" src={world.src} alt="Nivriti's little room" draggable="false" />

              {/* clickable menu buttons over the baked sidebar */}
              {IMG_MENU.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  className="menuhit"
                  style={{ left: `${m.left}%`, top: `${m.top}%`, width: `${m.w}%`, height: `${m.h}%` }}
                  onClick={() => onNav(m.key)}
                  aria-label={m.label}
                />
              ))}

              {/* clickable object buttons */}
              {worldObjects
                .filter((o) => IMG_OBJECTS[o.key])
                .map((obj) => {
                  const b = IMG_OBJECTS[obj.key];
                  return (
                    <button
                      key={obj.key}
                      type="button"
                      className="objhit"
                      style={{ left: `${b.left}%`, top: `${b.top}%`, width: `${b.w}%`, height: `${b.h}%` }}
                      onClick={() => handleObject(obj)}
                      aria-label={`${obj.title}. Open.`}
                    >
                      <span className="objhit__glow" aria-hidden="true" />
                    </button>
                  );
                })}

              {/* hidden developer note — tucked on the moon, top-right */}
              <button
                type="button"
                className="objhit objhit--egg"
                style={{ left: '84%', top: '9%', width: '13%', height: '13%' }}
                onClick={() => setModal('egg')}
                aria-label="A tiny hidden note"
              />
            </>
          ) : (
            <>
              <div className="world__svgroom">
                <RoomShell />
                <div className="world__svgchar">
                  <Character reduced={reduced} />
                </div>
              </div>

              {worldObjects
                .filter((o) => FALLBACK_HOTSPOTS[o.key])
                .map((obj) => {
                  const h = FALLBACK_HOTSPOTS[obj.key];
                  const Sprite = SPRITES[obj.key];
                  return (
                    <button
                      key={obj.key}
                      type="button"
                      className={`spot spot--${h.labelSide} ${labelsPersistent ? 'spot--show' : ''}`}
                      style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%` }}
                      onClick={() => handleObject(obj)}
                      aria-label={`${obj.title}. Open.`}
                    >
                      <span className="spot__ring" aria-hidden="true" />
                      {Sprite && (
                        <span className="spot__sprite" aria-hidden="true">
                          <Sprite signature={obj.key === 'perfume'} />
                        </span>
                      )}
                      <span className="spot__label">{obj.title}</span>
                    </button>
                  );
                })}

              <button
                type="button"
                className="spot spot--egg"
                style={{ left: '93%', top: '28%', width: '6%' }}
                onClick={() => setModal('egg')}
                aria-label="A tiny hidden note"
              >
                <span className="spot__ring" aria-hidden="true" />
              </button>
            </>
          )}
        </motion.div>
      </div>

      {!hasImage && (
        <div className="world__hbd" aria-hidden="true">
          Happy Birthday, {birthday?.recipient || 'Nivriti'} <span className="world__sunflower">🌻</span>
        </div>
      )}

      <ObjectPanel
        open={!!activeObj}
        onClose={() => setActive(null)}
        title={activeObj?.title}
        subtitle={activeObj?.subtitle}
        message={activeObj?.message}
        badge={activeObj?.badge}
        connection={activeObj?.connection}
        objectKey={activeObj?.key}
        reduced={reduced}
      />
      <ObjectPanel
        open={modal === 'egg'}
        onClose={() => setModal(null)}
        title={birthday?.easterEgg?.heading || "DEVELOPER'S NOTE"}
        message={birthday?.easterEgg?.body || ''}
        variant="egg"
        reduced={reduced}
      />
      <MemoriesModal
        open={modal === 'memories'}
        memories={birthday?.memories || []}
        onClose={() => setModal(null)}
        reduced={reduced}
      />
      <ObjectPanel
        open={modal === 'settings'}
        onClose={() => setModal(null)}
        title="Settings"
        message={'• Sound: use the ♪ button in the corner.\n• Motion: this world respects your device\'s reduced-motion setting automatically.\n• Best viewed on your phone. ✨'}
        reduced={reduced}
      />
    </div>
  );
}

function capitalize(s) {
  const t = String(s).replace(/\s+/g, '').toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}
