// pages/styleguide/sections/ShadowsSection.tsx — CRM Dibracam
import { StyleGuideSection } from '../StyleGuideSection';

const SHADOWS = [
  { name: 'XS', token: '--shadow-xs' },
  { name: 'SM', token: '--shadow-sm' },
  { name: 'MD', token: '--shadow-md' },
  { name: 'LG', token: '--shadow-lg' },
  { name: 'XL', token: '--shadow-xl' },
];

export function ShadowsSection() {
  return (
    <StyleGuideSection id="sombras" title="Elevação" description="Profundidade é construída por deslocamentos sutis de luminosidade acima do preto absoluto; sombras ficam quase imperceptíveis.">
      <div className="sg-flex" style={{ gap: 'var(--spacing-24)', marginTop: 'var(--spacing-16)' }}>
        {SHADOWS.map(s => (
          <div key={s.token}>
            <div
              className="sg-shadow-card"
              style={{ boxShadow: `var(${s.token})` }}
            >
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-grey-500)', textTransform: 'uppercase' }}>
                {s.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </StyleGuideSection>
  );
}
