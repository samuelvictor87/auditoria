// pages/styleguide/sections/ColorsSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle } from '../StyleGuideSection';

interface ColorSwatch {
  name: string;
  token: string;
  textColor?: string;
}

const CORE: ColorSwatch[] = [
  { name: 'Primary', token: '--color-primary', textColor: '#fff' },
  { name: 'Primary Contrast', token: '--color-primary-contrast', textColor: '#182230' },
  { name: 'Text', token: '--color-text', textColor: '#fff' },
  { name: 'Surface', token: '--color-surface', textColor: '#182230' },
  { name: 'Background', token: '--color-background', textColor: '#182230' },
];

const BRAND: ColorSwatch[] = [
  { name: 'Brand 50', token: '--color-brand-50', textColor: '#182230' },
  { name: 'Brand 200', token: '--color-brand-200', textColor: '#182230' },
  { name: 'Brand 400', token: '--color-brand-400', textColor: '#fff' },
  { name: 'Brand 500', token: '--color-brand-500', textColor: '#fff' },
  { name: 'Brand 550', token: '--color-brand-550', textColor: '#fff' },
  { name: 'Brand 600', token: '--color-brand-600', textColor: '#fff' },
  { name: 'Brand 800', token: '--color-brand-800', textColor: '#fff' },
  { name: 'Brand 900', token: '--color-brand-900', textColor: '#fff' },
];

const GREY: ColorSwatch[] = [
  { name: 'Grey 50', token: '--color-grey-50', textColor: '#182230' },
  { name: 'Grey 100', token: '--color-grey-100', textColor: '#182230' },
  { name: 'Grey 200', token: '--color-grey-200', textColor: '#182230' },
  { name: 'Grey 300', token: '--color-grey-300', textColor: '#182230' },
  { name: 'Grey 400', token: '--color-grey-400', textColor: '#fff' },
  { name: 'Grey 500', token: '--color-grey-500', textColor: '#fff' },
  { name: 'Grey 600', token: '--color-grey-600', textColor: '#fff' },
  { name: 'Grey 700', token: '--color-grey-700', textColor: '#fff' },
  { name: 'Grey 800', token: '--color-grey-800', textColor: '#fff' },
  { name: 'Grey 900', token: '--color-grey-900', textColor: '#fff' },
];

const SEMANTIC: ColorSwatch[] = [
  { name: 'Destructive', token: '--color-destructive', textColor: '#fff' },
  { name: 'Success', token: '--color-success', textColor: '#fff' },
  { name: 'Alert', token: '--color-alert', textColor: '#fff' },
];

const SUCCESS_SCALE: ColorSwatch[] = [
  { name: 'Success 25', token: '--color-success-25', textColor: '#182230' },
  { name: 'Success 50', token: '--color-success-50', textColor: '#182230' },
  { name: 'Success 100', token: '--color-success-100', textColor: '#182230' },
  { name: 'Success 200', token: '--color-success-200', textColor: '#182230' },
  { name: 'Success 300', token: '--color-success-300', textColor: '#182230' },
  { name: 'Success 400', token: '--color-success-400', textColor: '#182230' },
  { name: 'Success 500', token: '--color-success-500', textColor: '#fff' },
  { name: 'Success 600', token: '--color-success-600', textColor: '#fff' },
  { name: 'Success 700', token: '--color-success-700', textColor: '#fff' },
  { name: 'Success 800', token: '--color-success-800', textColor: '#fff' },
  { name: 'Success 900', token: '--color-success-900', textColor: '#fff' },
];

const WARNING_SCALE: ColorSwatch[] = [
  { name: 'Warning 25', token: '--color-warning-25', textColor: '#182230' },
  { name: 'Warning 50', token: '--color-warning-50', textColor: '#182230' },
  { name: 'Warning 100', token: '--color-warning-100', textColor: '#182230' },
  { name: 'Warning 200', token: '--color-warning-200', textColor: '#182230' },
  { name: 'Warning 300', token: '--color-warning-300', textColor: '#182230' },
  { name: 'Warning 400', token: '--color-warning-400', textColor: '#182230' },
  { name: 'Warning 500', token: '--color-warning-500', textColor: '#fff' },
  { name: 'Warning 600', token: '--color-warning-600', textColor: '#fff' },
  { name: 'Warning 700', token: '--color-warning-700', textColor: '#fff' },
  { name: 'Warning 800', token: '--color-warning-800', textColor: '#fff' },
  { name: 'Warning 900', token: '--color-warning-900', textColor: '#fff' },
];

const ERROR_SCALE: ColorSwatch[] = [
  { name: 'Error 25', token: '--color-error-25', textColor: '#182230' },
  { name: 'Error 50', token: '--color-error-50', textColor: '#182230' },
  { name: 'Error 100', token: '--color-error-100', textColor: '#182230' },
  { name: 'Error 200', token: '--color-error-200', textColor: '#182230' },
  { name: 'Error 300', token: '--color-error-300', textColor: '#182230' },
  { name: 'Error 400', token: '--color-error-400', textColor: '#fff' },
  { name: 'Error 500', token: '--color-error-500', textColor: '#fff' },
  { name: 'Error 600', token: '--color-error-600', textColor: '#fff' },
  { name: 'Error 700', token: '--color-error-700', textColor: '#fff' },
  { name: 'Error 800', token: '--color-error-800', textColor: '#fff' },
  { name: 'Error 900', token: '--color-error-900', textColor: '#fff' },
];

function ColorGrid({ swatches }: { swatches: ColorSwatch[] }) {
  return (
    <div className="sg-grid">
      {swatches.map(s => (
        <div key={s.token} className="sg-color-card">
          <div
            className="sg-color-swatch"
            style={{ background: `var(${s.token})`, color: s.textColor }}
          >
            Aa
          </div>
          <div className="sg-color-info">
            <p className="sg-color-name">{s.name}</p>
            <p className="sg-color-token">{s.token}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ColorsSection() {
  return (
    <StyleGuideSection id="cores" title="Cores" description="Paleta completa de cores do Design System, organizadas por função.">
      <SubsectionTitle>Cores Core</SubsectionTitle>
      <ColorGrid swatches={CORE} />

      <SubsectionTitle>Escala Brand</SubsectionTitle>
      <ColorGrid swatches={BRAND} />

      <SubsectionTitle>Escala Grey</SubsectionTitle>
      <ColorGrid swatches={GREY} />

      <SubsectionTitle>Estados Semânticos</SubsectionTitle>
      <ColorGrid swatches={SEMANTIC} />

      <SubsectionTitle>Escala Success</SubsectionTitle>
      <ColorGrid swatches={SUCCESS_SCALE} />

      <SubsectionTitle>Escala Warning</SubsectionTitle>
      <ColorGrid swatches={WARNING_SCALE} />

      <SubsectionTitle>Escala Error</SubsectionTitle>
      <ColorGrid swatches={ERROR_SCALE} />
    </StyleGuideSection>
  );
}
