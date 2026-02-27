import React from 'react';

const lines = [
  { content: 'Desde 1987,', hasLogo: false },
  { content: null, hasLogo: true, logo: "D'Tabaco®", after: ' Company' },
  { content: 'define el arte del', hasLogo: false },
  { content: 'cigarro premium', hasLogo: false },
];

function LineContent({ line }: { line: typeof lines[0] }) {
  if (line.hasLogo) {
    return <><span className="historia-logo">{line.logo}</span>{line.after}</>;
  }
  return <>{line.content}</>;
}

export default function Historia() {
  return (
    <section className="historia">
      <div className="historia-text">
        {lines.map((line, i) => (
          <div className="historia-line" key={i}>
            <span className="historia-stroke" aria-hidden="true">
              <LineContent line={line} />
            </span>
            <span className="historia-fill">
              <LineContent line={line} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
