// pages/styleguide/sections/StatesSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview } from '../StyleGuideSection';
import { Button } from '../../../components/ui/Button';

export function StatesSection() {
  return (
    <StyleGuideSection id="estados" title="Estados" description="Todos os componentes interativos seguem os mesmos estados visuais.">
      <SubsectionTitle>Estados de Interação</SubsectionTitle>
      <Preview label="Default → Hover → Active → Focus → Disabled">
        <div className="sg-flex sg-flex-center">
          <Button variant="primary">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </Preview>

      <SubsectionTitle>Transições</SubsectionTitle>
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-grey-600)' }}>
        <p style={{ margin: '0 0 var(--spacing-8)' }}>
          <strong>Fast:</strong> <code style={{ background: 'var(--color-grey-50)', padding: '2px 6px', borderRadius: '4px' }}>150ms ease</code> — hover de ícones e bordas
        </p>
        <p style={{ margin: '0 0 var(--spacing-8)' }}>
          <strong>Base:</strong> <code style={{ background: 'var(--color-grey-50)', padding: '2px 6px', borderRadius: '4px' }}>200ms ease-out</code> — transição padrão
        </p>
        <p style={{ margin: 0 }}>
          <strong>Slow:</strong> <code style={{ background: 'var(--color-grey-50)', padding: '2px 6px', borderRadius: '4px' }}>300ms ease</code> — animações de abertura e entrada
        </p>
      </div>
    </StyleGuideSection>
  );
}
