// pages/styleguide/sections/DrawerSection.tsx — CRM Dibracam
import { useState } from 'react';
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Drawer } from '../../../components/ui/Drawer';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';

export function DrawerSection() {
  const [open, setOpen] = useState(false);

  return (
    <StyleGuideSection id="drawer" title="Drawer" description="Painel lateral deslizante para formulários e detalhes sem sair do contexto.">
      <SubsectionTitle>Drawer com Formulário</SubsectionTitle>
      <Preview>
        <Button variant="secondary" onClick={() => setOpen(true)}>Abrir Drawer</Button>
        <Drawer
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Nova Oportunidade"
          subtitle="Preencha os dados da oportunidade"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
            <Input label="Cliente" placeholder="Buscar cliente..." required />
            <Input label="Valor estimado" placeholder="R$ 0,00" />
            <Textarea label="Observações" placeholder="Observações sobre a oportunidade..." rows={4} />
            <div style={{ display: 'flex', gap: 'var(--spacing-8)', justifyContent: 'flex-end', marginTop: 'var(--spacing-8)' }}>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Salvar</Button>
            </div>
          </div>
        </Drawer>
      </Preview>
      <CodeBlock>{`<Drawer
  isOpen={isOpen}
  onClose={close}
  title="Nova Oportunidade"
  subtitle="Preencha os dados"
  position="right"
  width="480px"
>
  <form>...</form>
</Drawer>`}</CodeBlock>
    </StyleGuideSection>
  );
}
