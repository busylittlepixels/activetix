'use client';

export function CodeBlock({ code, lang, lineNumbers, title }) {
  return (
    <div className="code-block-wrapper">
      {title && <div className="code-block-title">{title}</div>}
      <pre className={`language-${lang || 'text'}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}