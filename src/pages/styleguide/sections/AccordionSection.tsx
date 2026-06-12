// pages/styleguide/sections/AccordionSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Accordion } from '../../../components/ui/Accordion';

export function AccordionSection() {
  return (
    <StyleGuideSection id="accordion" title="Accordion" description="Conteúdo colapsável para economizar espaço vertical.">
      <SubsectionTitle>Default</SubsectionTitle>
      <Preview>
        <div style={{ maxWidth: 500 }}>
          <Accordion
            items={[
              { key: 'faq1', header: 'Como criar uma nova oportunidade?', content: 'Acesse o módulo de Oportunidades e clique no botão "Nova Oportunidade" no canto superior direito. Preencha os dados obrigatórios e clique em salvar.' },
              { key: 'faq2', header: 'Como alterar a meta de um vendedor?', content: 'Acesse o módulo de Metas e selecione o vendedor desejado. Clique em "Editar" para ajustar os valores.' },
              { key: 'faq3', header: 'Como inativar um usuário?', content: 'No módulo de Usuários, localize o usuário e clique no ícone de ações. Selecione "Inativar" e confirme no modal destrutivo.' },
            ]}
            defaultOpen={['faq1']}
          />
        </div>
      </Preview>

      <SubsectionTitle>Múltiplos Abertos</SubsectionTitle>
      <Preview>
        <div style={{ maxWidth: 500 }}>
          <Accordion
            items={[
              { key: 'info', header: 'Informações Gerais', content: 'Dados cadastrais do cliente, endereço e contatos.' },
              { key: 'hist', header: 'Histórico de Compras', content: 'Lista de todas as notas fiscais e peças adquiridas.' },
              { key: 'obs', header: 'Observações', content: 'Notas internas do vendedor sobre o cliente.' },
            ]}
            allowMultiple
            defaultOpen={['info', 'hist']}
          />
        </div>
      </Preview>
      <CodeBlock>{`<Accordion
  items={[{ key: 'k', header: 'Título', content: 'Conteúdo' }]}
  allowMultiple
  defaultOpen={['k']}
/>`}</CodeBlock>
    </StyleGuideSection>
  );
}
