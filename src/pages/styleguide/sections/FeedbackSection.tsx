// pages/styleguide/sections/FeedbackSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { EmptyState } from '../../../components/ui/EmptyState';
import { LoadingState } from '../../../components/ui/LoadingState';
import { Button } from '../../../components/ui/Button';
import { MagnifyingGlass, Plus } from '@phosphor-icons/react';

export function FeedbackSection() {
  return (
    <StyleGuideSection id="empty-state" title="EmptyState & LoadingState" description="Estados visuais para ausência de dados e carregamento.">
      <SubsectionTitle>EmptyState — Padrão</SubsectionTitle>
      <Preview>
        <EmptyState
          title="Nenhuma oportunidade encontrada"
          description="Ajuste os filtros ou crie uma nova oportunidade para começar."
          action={<Button variant="primary" size="sm"><Plus size={16} weight="bold" /> Nova Oportunidade</Button>}
        />
      </Preview>

      <SubsectionTitle>EmptyState — Com Ícone Customizado</SubsectionTitle>
      <Preview>
        <EmptyState
          icon={<MagnifyingGlass size={40} weight="light" />}
          title="Nenhum resultado"
          description="Tente buscar por outro termo."
        />
      </Preview>
      <CodeBlock>{`<EmptyState
  title="Nenhum dado"
  description="Ajuste os filtros."
  icon={<MagnifyingGlass size={40} />}
  action={<Button>Ação</Button>}
/>`}</CodeBlock>

      <div id="loading-state" style={{ scrollMarginTop: 'var(--spacing-24)' }}>
        <SubsectionTitle>LoadingState — Inline</SubsectionTitle>
        <Preview>
          <div style={{ height: 200 }}>
            <LoadingState variant="inline" message="Carregando dados..." />
          </div>
        </Preview>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-grey-400)', fontStyle: 'italic', margin: 'var(--spacing-8) 0 0' }}>
          ⚠️ O ícone do caminhão (<code>&lt;Truck&gt;</code> do Phosphor) é provisório. Será substituído pelo asset oficial do caminhão Dibracam quando disponível.
        </p>
        <CodeBlock>{`<LoadingState variant="inline" message="Carregando..." />
<LoadingState variant="fullscreen" />
<LoadingState variant="overlay" />`}</CodeBlock>
      </div>
    </StyleGuideSection>
  );
}
