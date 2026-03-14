import React, { useState } from 'react';

const presets = [
  {
    name: 'Verde & Dorado',
    bg: '#090e09',
    accent: '#c8a84e',
    text: '#f5f0e8',
    inputBg: '#1a3319',
    inputBorder: '#c8a84e',
    dark: true,
  },
  {
    name: 'Negro & Dorado',
    bg: '#111111',
    accent: '#c8a84e',
    text: '#f5f0e8',
    inputBg: '#1a1a1a',
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
    name: 'Beige & Naranja',
    bg: '#f5ede3',
    accent: '#d4722a',
    text: '#3a2e24',
    inputBg: '#efe5d8',
    inputBorder: '#d4722a',
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

function getSavedTheme(): string {
  try {
    const saved = localStorage.getItem('theme');
    if (saved) return JSON.parse(saved).name || 'Original';
  } catch {}
  return 'Original';
}

export default function ThemeTester() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(getSavedTheme);

  function applyTheme(preset: typeof presets[0]) {
    if (preset.name === 'Original') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', JSON.stringify(preset));
    }
    window.location.reload();
  }

  function handleHide() {
    localStorage.removeItem('theme');
    window.location.reload();
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
