// pages/styleguide/sections/SelectSection.tsx — CRM Dibracam
import { useState } from 'react';
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Select } from '../../../components/ui/Select';
import { MultiSelect } from '../../../components/ui/MultiSelect';

const OPTIONS = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
  { value: 'pr', label: 'Paraná' },
  { value: 'sc', label: 'Santa Catarina' },
];

export function SelectSection() {
  const [single, setSingle] = useState<any>(null);
  const [multi, setMulti] = useState<string[]>([]);

  return (
    <StyleGuideSection id="select" title="Select" description="Seletores de opção única e múltipla.">
      <SubsectionTitle>Select — Opção Única (react-select)</SubsectionTitle>
      <Preview>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-16)', maxWidth: 500 }}>
          <Select
            label="Filial"
            value={single}
            onChange={(val) => setSingle(val)}
            options={OPTIONS}
            placeholder="Selecione a filial"
          />
          <Select
            label="Desabilitado"
            value={null}
            onChange={() => {}}
            options={OPTIONS}
            isDisabled
          />
        </div>
      </Preview>
      <CodeBlock>{`<Select
  label="Filial"
  value={selected}
  onChange={setSelected}
  options={[{ value: 'sp', label: 'São Paulo' }]}
  placeholder="Selecione..."
/>`}</CodeBlock>

      <div id="multi-select" style={{ scrollMarginTop: 'var(--spacing-24)' }}>
        <SubsectionTitle>MultiSelect — Opção Múltipla</SubsectionTitle>
        <Preview label="Com chips e dropdown">
          <div style={{ maxWidth: 400 }}>
            <MultiSelect
              label="Filiais"
              options={OPTIONS}
              value={multi}
              onChange={setMulti}
              placeholder="Selecione filiais..."
            />
          </div>
        </Preview>
        <CodeBlock>{`<MultiSelect
  label="Filiais"
  options={filiais}
  value={selectedFiliais}
  onChange={setSelectedFiliais}
  maxItems={5}
/>`}</CodeBlock>
      </div>
    </StyleGuideSection>
  );
}
