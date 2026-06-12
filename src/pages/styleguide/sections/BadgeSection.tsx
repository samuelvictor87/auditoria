// pages/styleguide/sections/BadgeSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Badge } from '../../../components/ui/Badge';

export function BadgeSection() {
  return (
    <StyleGuideSection id="badge" title="Badge" description="Indicador visual de status ou contagem.">
      <SubsectionTitle>Variantes</SubsectionTitle>
      <Preview>
        <div className="sg-flex sg-flex-center">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Ativo</Badge>
          <Badge variant="warning">Pendente</Badge>
          <Badge variant="error">Inativo</Badge>
          <Badge variant="neutral">Neutro</Badge>
        </div>
      </Preview>
      <CodeBlock>{`<Badge variant="success">Ativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="error">Inativo</Badge>`}</CodeBlock>

      <div className="sg-component-info">
        <div className="sg-do-list">
          <h4>✅ Quando usar</h4>
          <ul>
            <li>Status de registros (ativo, inativo, pendente)</li>
            <li>Indicadores de contagem em abas</li>
            <li>Tags de categorização</li>
          </ul>
        </div>
        <div className="sg-dont-list">
          <h4>❌ Quando não usar</h4>
          <ul>
            <li>Alertas ou mensagens longas (use Toast)</li>
            <li>Ações clicáveis (use Button)</li>
          </ul>
        </div>
      </div>
    </StyleGuideSection>
  );
}
