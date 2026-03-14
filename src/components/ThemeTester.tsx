import React, { useState } from 'react';

const presets = [
  {
    name: 'Verde & Dorado',
    bg: '#122613',
    accent: '#c8a84e',
    text: '#f5f0e8',
    inputBg: '#1a3319',
    inputBorder: '#c8a84e',
  },
  {
    name: 'Negro & Oro',
    bg: '#111111',
    accent: '#d4a843',
    text: '#f5f0e8',
    inputBg: '#1a1a1a',
    inputBorder: '#d4a843',
  },
  {
    name: 'Borgoña & Crema',
    bg: '#2e1118',
    accent: '#d4a25c',
    text: '#f5ece3',
    inputBg: '#3a1a22',
    inputBorder: '#d4a25c',
  },
  {
    name: 'Azul Noche & Plata',
    bg: '#0f1a2e',
    accent: '#c0c0c0',
    text: '#e8edf5',
    inputBg: '#162240',
    inputBorder: '#c0c0c0',
  },
  {
    name: 'Original',
    bg: '',
    accent: '',
    text: '',
    inputBg: '',
    inputBorder: '',
  },
];

export default function ThemeTester() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('Original');

  function applyTheme(preset: typeof presets[0]) {
    setActive(preset.name);
    const root = document.documentElement;

    if (preset.name === 'Original') {
      document.body.classList.remove('theme-active');
      root.style.removeProperty('--theme-bg');
      root.style.removeProperty('--theme-accent');
      root.style.removeProperty('--theme-text');
      root.style.removeProperty('--theme-input-bg');
      root.style.removeProperty('--theme-input-border');
      document.body.style.backgroundColor = '';
      document.body.offsetHeight; // force layout recalc
      return;
    }

    root.style.setProperty('--theme-bg', preset.bg);
    root.style.setProperty('--theme-accent', preset.accent);
    root.style.setProperty('--theme-text', preset.text);
    root.style.setProperty('--theme-input-bg', preset.inputBg);
    root.style.setProperty('--theme-input-border', preset.inputBorder);
    document.body.classList.add('theme-active');
  }

  function handleHide() {
    applyTheme(presets.find(p => p.name === 'Original')!);
    setOpen(false);
    setHidden(true);
  }

  if (hidden) return null;

  return (
    <div className={`theme-tester ${open ? 'theme-tester--open' : ''}`}>
      <button className="theme-tester__toggle" onClick={() => setOpen(!open)}>
        🎨
      </button>
      {open && (
        <div className="theme-tester__panel">
          <div className="theme-tester__header">
            <p className="theme-tester__title">Probar Colores</p>
            <button className="theme-tester__close" onClick={handleHide}>✕</button>
          </div>
          {presets.map((p) => (
            <button
              key={p.name}
              className={`theme-tester__btn ${active === p.name ? 'theme-tester__btn--active' : ''}`}
              onClick={() => applyTheme(p)}
            >
              {p.name !== 'Original' && (
                <span className="theme-tester__swatch" style={{ background: p.bg, borderColor: p.accent }} />
              )}
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
