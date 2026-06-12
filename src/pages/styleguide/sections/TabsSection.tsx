// pages/styleguide/sections/TabsSection.tsx — CRM Dibracam
import { useState } from 'react';
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Tabs } from '../../../components/ui/Tabs';
import { ChartBar, Users, Gear } from '@phosphor-icons/react';

export function TabsSection() {
  const [tab1, setTab1] = useState('geral');
  const [tab2, setTab2] = useState('overview');

  return (
    <StyleGuideSection id="tabs" title="Tabs" description="Navegação por abas com variantes underline e pill.">
      <SubsectionTitle>Variante Underline (padrão)</SubsectionTitle>
      <Preview>
        <Tabs
          tabs={[
            { key: 'geral', label: 'Geral' },
            { key: 'detalhes', label: 'Detalhes' },
            { key: 'historico', label: 'Histórico', badge: 12 },
          ]}
          activeTab={tab1}
          onChange={setTab1}
        />
      </Preview>

      <SubsectionTitle>Variante Pill</SubsectionTitle>
      <Preview>
        <Tabs
          variant="pill"
          tabs={[
            { key: 'overview', label: 'Overview', icon: <ChartBar size={16} /> },
            { key: 'equipe', label: 'Equipe', icon: <Users size={16} /> },
            { key: 'config', label: 'Config', icon: <Gear size={16} /> },
          ]}
          activeTab={tab2}
          onChange={setTab2}
        />
      </Preview>
      <CodeBlock>{`<Tabs
  tabs={[{ key: 'geral', label: 'Geral' }]}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="underline"
/>`}</CodeBlock>
    </StyleGuideSection>
  );
}
