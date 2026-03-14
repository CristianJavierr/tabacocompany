import React, { useState } from 'react';

const presets = [
  {
    name: 'Verde & Dorado',
    bg: '#122613',
    accent: '#c8a84e',
    text: '#f5f0e8',
    inputBg: '#1a3319',
    inputBorder: '#c8a84e',
    dark: true,
  },
  {
    name: 'Crema & Dorado',
    bg: '#f4ece1',
    accent: '#b08d3e',
    text: '#3a2e28',
    inputBg: '#efe5d8',
    inputBorder: '#b08d3e',
    dark: false,
  },
  {
    name: 'Rosa & Oliva',
    bg: '#f5e8e4',
    accent: '#5e6b4a',
    text: '#2d2926',
    inputBg: '#f0ddd7',
    inputBorder: '#5e6b4a',
    dark: false,
  },
  {
    name: 'Lavanda & Morado',
    bg: '#eee8f0',
    accent: '#6b3fa0',
    text: '#2e2838',
    inputBg: '#e6dde9',
    inputBorder: '#6b3fa0',
    dark: false,
  },
  {
    name: 'Celeste & Azul',
    bg: '#e6f0f8',
    accent: '#2a6cb6',
    text: '#1c2a3a',
    inputBg: '#dce9f3',
    inputBorder: '#2a6cb6',
    dark: false,
  },
  {
    name: 'Original',
    bg: '',
    accent: '',
    text: '',
    inputBg: '',
    inputBorder: '',
    dark: false,
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
      root.classList.remove('theme-active', 'theme-dark');
      root.style.removeProperty('--beige');
      root.style.removeProperty('--dark');
      root.style.removeProperty('--theme-accent');
      root.style.removeProperty('--theme-text');
      root.style.removeProperty('--theme-bg');
      root.style.removeProperty('--theme-input-bg');
      root.style.removeProperty('--theme-input-border');
      return;
    }

    root.style.setProperty('--beige', preset.bg);
    root.style.setProperty('--dark', preset.text);
    root.style.setProperty('--theme-accent', preset.accent);
    root.style.setProperty('--theme-text', preset.text);
    root.style.setProperty('--theme-bg', preset.bg);
    root.style.setProperty('--theme-input-bg', preset.inputBg);
    root.style.setProperty('--theme-input-border', preset.inputBorder);
    root.classList.add('theme-active');
    if (preset.dark) {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
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
