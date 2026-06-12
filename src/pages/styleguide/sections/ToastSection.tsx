// pages/styleguide/sections/ToastSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Button } from '../../../components/ui/Button';
import { useToast } from '../../../components/ui/Toast';

export function ToastSection() {
  const toast = useToast();

  return (
    <StyleGuideSection id="toast" title="Toast" description="Notificação flutuante temporária para feedback de ações.">
      <SubsectionTitle>Variantes</SubsectionTitle>
      <Preview>
        <div className="sg-flex sg-flex-center">
          <Button variant="primary" size="sm" onClick={() => toast.success('Registro salvo com sucesso!')}>
            Toast Success
          </Button>
          <Button variant="secondary" size="sm" onClick={() => toast.error('Erro ao salvar registro.')}>
            Toast Error
          </Button>
          <Button variant="secondary" size="sm" onClick={() => toast.info('Nova atualização disponível.')}>
            Toast Info
          </Button>
        </div>
      </Preview>
      <CodeBlock>{`const toast = useToast();
toast.success('Registro salvo!');
toast.error('Erro ao salvar.');
toast.info('Informação.');`}</CodeBlock>
    </StyleGuideSection>
  );
}
