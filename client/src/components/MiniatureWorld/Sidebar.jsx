import './Sidebar.css';

const Icon = ({ name }) => {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home':
      return (
        <svg {...common}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>
      );
    case 'explore':
      return (
        <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M15 9l-2 6-4 2 2-6z" /></svg>
      );
    case 'memories':
      return (
        <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M3 17l5-4 4 3 3-2 6 5" /></svg>
      );
    case 'perfume':
      return (
        <svg {...common}><path d="M9 3h6v3H9z" /><path d="M8 9h8v9a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3z" /><path d="M10 13h4" /></svg>
      );
    case 'letter':
      return (
        <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
      );
    case 'finale':
      return (
        <svg {...common}><path d="M12 3l2.2 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.8-.5z" /></svg>
      );
    case 'settings':
      return (
        <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1L14.5 2h-5l-.3 2.5a7 7 0 0 0-1.7 1l-2.4-1-2 3.5L3.1 11a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.3 2.5h5l.3-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5a7 7 0 0 0 .1-1z" /></svg>
      );
    default:
      return null;
  }
};

const NAV = [
  { key: 'home', label: 'Home' },
  { key: 'explore', label: 'Explore' },
  { key: 'memories', label: 'Memories' },
  { key: 'perfume', label: 'Perfume Room' },
  { key: 'letter', label: 'Letter' },
  { key: 'finale', label: 'Finale' }
];

export default function Sidebar({ active = 'home', onSelect }) {
  return (
    <nav className="sidebar" aria-label="World navigation">
      <div className="sidebar__brand" aria-hidden="true">
        <span className="sidebar__brand-mark">N</span>
      </div>
      <ul className="sidebar__list">
        {NAV.map((item) => (
          <li key={item.key}>
            <button
              className={`sidebar__item ${active === item.key ? 'is-active' : ''}`}
              onClick={() => onSelect(item.key)}
              aria-current={active === item.key ? 'page' : undefined}
            >
              <span className="sidebar__icon">
                <Icon name={item.key} />
              </span>
              <span className="sidebar__label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <button className="sidebar__item sidebar__settings" onClick={() => onSelect('settings')}>
        <span className="sidebar__icon">
          <Icon name="settings" />
        </span>
        <span className="sidebar__label">Settings</span>
      </button>
    </nav>
  );
}
