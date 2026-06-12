// pages/styleguide/StyleGuideSection.tsx — CRM Dibracam
import React from 'react';

interface StyleGuideSectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function StyleGuideSection({ id, title, description, children }: StyleGuideSectionProps) {
  return (
    <section className="sg-section" id={id}>
      <h2 className="sg-section-title">{title}</h2>
      {description && <p className="sg-section-desc">{description}</p>}
      {children}
    </section>
  );
}

export function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="sg-subsection-title">{children}</h3>;
}

export function Preview({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="sg-preview">
      {label && <div className="sg-preview-label">{label}</div>}
      {children}
    </div>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return <pre className="sg-code-block"><code>{children}</code></pre>;
}
