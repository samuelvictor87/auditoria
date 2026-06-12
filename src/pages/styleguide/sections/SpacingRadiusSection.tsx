// pages/styleguide/sections/SpacingRadiusSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle } from '../StyleGuideSection';

const SPACING = [
  { token: '--spacing-4', value: 4 },
  { token: '--spacing-8', value: 8 },
  { token: '--spacing-12', value: 12 },
  { token: '--spacing-16', value: 16 },
  { token: '--spacing-24', value: 24 },
  { token: '--spacing-32', value: 32 },
  { token: '--spacing-40', value: 40 },
  { token: '--spacing-48', value: 48 },
];

const RADIUS = [
  { name: 'None', token: '--radius-none', value: '0px' },
  { name: 'SM', token: '--radius-sm', value: '4px' },
  { name: 'MD', token: '--radius-md', value: '8px' },
  { name: 'LG', token: '--radius-lg', value: '12px' },
  { name: 'XL', token: '--radius-xl', value: '16px' },
  { name: 'Full', token: '--radius-full', value: '9999px' },
];

export function SpacingRadiusSection() {
  return (
    <StyleGuideSection id="espacamento" title="Espaçamento e Radius" description="Escala de espaçamento baseada em múltiplos de 4px. Regra: sempre 4px para manter a estética arquitetônica de aresta viva.">
      <SubsectionTitle>Escala de Espaçamento</SubsectionTitle>
      <div className="sg-flex" style={{ alignItems: 'flex-end', gap: 'var(--spacing-16)' }}>
        {SPACING.map(s => (
          <div key={s.token} className="sg-spacing-item">
            <div
              className="sg-spacing-block"
              style={{ width: s.value, height: s.value }}
            />
            <span className="sg-spacing-label">{s.value}</span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 'var(--spacing-12)', fontSize: 'var(--font-size-sm)', color: 'var(--color-grey-500)' }}>
        Regra: sempre 4px para manter a estética arquitetônica de aresta viva.
      </p>

      <SubsectionTitle>Border Radius</SubsectionTitle>
      <div className="sg-flex" style={{ gap: 'var(--spacing-16)' }}>
        {RADIUS.map(r => (
          <div key={r.token}>
            <div
              className="sg-radius-card"
              style={{ borderRadius: `var(${r.token})` }}
            >
              <span className="sg-radius-label">{r.name}</span>
              <span className="sg-radius-value">{r.value}</span>
            </div>
          </div>
        ))}
      </div>
    </StyleGuideSection>
  );
}
