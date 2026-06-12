// pages/styleguide/sections/InputSection.tsx — CRM Dibracam
import { useState } from 'react';
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Input } from '../../../components/ui/Input';
import { InputNumber } from '../../../components/ui/InputNumber';
import { InputSearch } from '../../../components/ui/InputSearch';
import { InputDate } from '../../../components/ui/InputDate';

export function InputSection() {
  const [dateValue, setDateValue] = useState('');

  return (
    <StyleGuideSection id="input" title="Input" description="Campo de texto padrão e suas variações especializadas.">
      <SubsectionTitle>Input — Padrão</SubsectionTitle>
      <Preview label="Default / Com label / Com erro / Disabled">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-16)', maxWidth: 500 }}>
          <Input placeholder="Placeholder" />
          <Input label="Nome completo" placeholder="Digite o nome" required />
          <Input label="E-mail" placeholder="email@exemplo.com" error="E-mail inválido" />
          <Input label="Desabilitado" placeholder="Campo bloqueado" disabled />
        </div>
      </Preview>
      <CodeBlock>{`<Input label="Nome" placeholder="Digite o nome" required />
<Input label="E-mail" error="E-mail inválido" />
<Input disabled />`}</CodeBlock>

      <div id="input-search" style={{ scrollMarginTop: 'var(--spacing-24)' }}>
        <SubsectionTitle>InputSearch</SubsectionTitle>
        <Preview label="Busca com debounce e dropdown">
          <div style={{ maxWidth: 400 }}>
            <InputSearch
              label="Buscar cliente"
              placeholder="Digite para buscar..."
              onSearch={async (term) => [
                { value: '1', label: `Resultado para "${term}" — Cliente A` },
                { value: '2', label: `Resultado para "${term}" — Cliente B` },
              ]}
              onSelect={(item) => console.log('Selecionado:', item)}
            />
          </div>
        </Preview>
        <CodeBlock>{`<InputSearch
  label="Buscar cliente"
  onSearch={async (term) => fetchResults(term)}
  onSelect={(item) => handleSelect(item)}
  debounceMs={300}
  minChars={2}
/>`}</CodeBlock>
      </div>

      <div id="input-number" style={{ scrollMarginTop: 'var(--spacing-24)' }}>
        <SubsectionTitle>InputNumber</SubsectionTitle>
        <Preview label="Valor numérico com máscara">
          <div style={{ maxWidth: 300 }}>
            <InputNumber label="Valor da proposta" placeholder="R$ 0,00" />
          </div>
        </Preview>
      </div>

      <div id="input-date" style={{ scrollMarginTop: 'var(--spacing-24)' }}>
        <SubsectionTitle>InputDate</SubsectionTitle>
        <Preview label="Seletor de data com calendar picker">
          <div style={{ maxWidth: 300 }}>
            <InputDate
              label="Data de vencimento"
              value={dateValue}
              onChange={(v) => setDateValue(v as string)}
            />
          </div>
        </Preview>
        <CodeBlock>{`<InputDate
  label="Data de vencimento"
  mode="single"
  value={date}
  onChange={setDate}
/>`}</CodeBlock>
      </div>
    </StyleGuideSection>
  );
}
