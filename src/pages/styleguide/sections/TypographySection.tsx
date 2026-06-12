// pages/styleguide/sections/TypographySection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle } from '../StyleGuideSection';

const LEVELS = [
  { name: 'H1 / 3XL', token: '--font-size-3xl', size: '32px', weight: 700, sample: 'Dashboard Gerencial' },
  { name: 'H2 / 2XL', token: '--font-size-2xl', size: '24px', weight: 700, sample: 'Seção Principal' },
  { name: 'H3 / XL', token: '--font-size-xl', size: '18px', weight: 600, sample: 'Subtítulo de Seção' },
  { name: 'H4 / LG', token: '--font-size-lg', size: '16px', weight: 600, sample: 'Título de Card' },
  { name: 'Body / MD', token: '--font-size-md', size: '14px', weight: 400, sample: 'Texto padrão de parágrafos e formulários' },
  { name: 'Small / SM', token: '--font-size-sm', size: '13px', weight: 400, sample: 'Labels e texto auxiliar' },
  { name: 'Caption / XS', token: '--font-size-xs', size: '12px', weight: 400, sample: 'Metadados, hints e timestamps' },
];

const WEIGHTS = [
  { name: 'Regular', token: '--font-weight-regular', value: 400 },
  { name: 'Medium', token: '--font-weight-medium', value: 500 },
  { name: 'Semibold', token: '--font-weight-semibold', value: 600 },
  { name: 'Bold', token: '--font-weight-bold', value: 700 },
];

export function TypographySection() {
  return (
    <StyleGuideSection id="tipografia" title="Tipografia" description="Família tipográfica Inter com escala de 12px a 32px. Sempre usar tokens, nunca valores fixos.">
      <SubsectionTitle>Escala de Tamanhos</SubsectionTitle>
      <div>
        {LEVELS.map(l => (
          <div className="sg-typo-row" key={l.token}>
            <span
              className="sg-typo-sample"
              style={{ fontSize: l.size, fontWeight: l.weight }}
            >
              {l.sample}
            </span>
            <span className="sg-typo-meta">
              {l.name} — {l.size} / {l.weight}
            </span>
          </div>
        ))}
      </div>

      <SubsectionTitle>Pesos Tipográficos</SubsectionTitle>
      <div className="sg-flex" style={{ gap: 'var(--spacing-32)' }}>
        {WEIGHTS.map(w => (
          <div key={w.token} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: w.value, margin: '0 0 4px', color: 'var(--color-text)' }}>
              Aa
            </p>
            <p style={{ fontSize: '13px', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>
              {w.name}
            </p>
            <p style={{ fontSize: '11px', margin: '2px 0 0', color: 'var(--color-grey-400)', fontFamily: "'SF Mono', monospace" }}>
              {w.value}
            </p>
          </div>
        ))}
      </div>

      <SubsectionTitle>Família Tipográfica</SubsectionTitle>
      <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-grey-600)', margin: 0 }}>
        <code style={{ background: 'var(--color-grey-50)', padding: '2px 6px', borderRadius: '4px' }}>
          --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
        </code>
      </p>
    </StyleGuideSection>
  );
}
