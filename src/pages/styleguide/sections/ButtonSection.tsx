// pages/styleguide/sections/ButtonSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Button } from '../../../components/ui/Button';
import { Plus, Eye, Trash } from '@phosphor-icons/react';

export function ButtonSection() {
  return (
    <StyleGuideSection id="button" title="Button" description="Componente de ação principal. Três variantes, três tamanhos e suporte a loading.">
      <SubsectionTitle>Variantes</SubsectionTitle>
      <Preview label="Primary / Secondary / Destructive">
        <div className="sg-flex sg-flex-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </Preview>
      <CodeBlock>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>`}</CodeBlock>

      <SubsectionTitle>Tamanhos</SubsectionTitle>
      <Preview label="SM / MD / LG">
        <div className="sg-flex sg-flex-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Preview>

      <SubsectionTitle>Com Ícone</SubsectionTitle>
      <Preview>
        <div className="sg-flex sg-flex-center">
          <Button variant="primary"><Plus size={16} weight="bold" /> Novo</Button>
          <Button variant="secondary"><Eye size={16} /> Ver detalhes</Button>
          <Button variant="destructive"><Trash size={16} /> Excluir</Button>
        </div>
      </Preview>

      <SubsectionTitle>Estados</SubsectionTitle>
      <Preview label="Disabled / Loading / Full Width">
        <div className="sg-flex sg-flex-center" style={{ flexDirection: 'column', gap: 'var(--spacing-12)' }}>
          <div className="sg-flex sg-flex-center">
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
          <Button full>Full Width</Button>
        </div>
      </Preview>

      <div className="sg-component-info">
        <div className="sg-do-list">
          <h4>✅ Quando usar</h4>
          <ul>
            <li>Ações primárias e secundárias de formulários</li>
            <li>Confirmações de modais</li>
            <li>Ações de toolbar</li>
          </ul>
        </div>
        <div className="sg-dont-list">
          <h4>❌ Quando não usar</h4>
          <ul>
            <li>Navegação simples (use links)</li>
            <li>Ações de tabela inline (use icon buttons)</li>
          </ul>
        </div>
      </div>
    </StyleGuideSection>
  );
}
