// pages/styleguide/sections/ExamplesSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview } from '../StyleGuideSection';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { KpiCard } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { EmptyState } from '../../../components/ui/EmptyState';
import { LoadingState } from '../../../components/ui/LoadingState';
import {
  MagnifyingGlass, Plus, CurrencyDollar, Users, ChartLineUp, Funnel,
} from '@phosphor-icons/react';

export function ExamplesSection() {
  return (
    <StyleGuideSection id="exemplos" title="Exemplos Reais" description="Composições de componentes usadas em telas reais do CRM Dibracam.">

      <SubsectionTitle>Barra de Filtros</SubsectionTitle>
      <Preview label="Filtro de listagem — Oportunidades">
        <div style={{ display: 'flex', gap: 'var(--spacing-12)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 280 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)',
              height: 'var(--spacing-40)', padding: '0 var(--spacing-12)',
              border: '1px solid var(--color-grey-300)', borderRadius: 'var(--radius-md)',
              background: 'var(--color-surface)', fontSize: 'var(--font-size-md)',
            }}>
              <MagnifyingGlass size={16} style={{ color: 'var(--color-grey-400)' }} />
              <input
                type="text"
                placeholder="Buscar cliente..."
                style={{ border: 'none', outline: 'none', flex: 1, fontSize: 'var(--font-size-md)', background: 'transparent' }}
              />
            </div>
          </div>
          <Select
            label=""
            value={null as any}
            onChange={() => {}}
            options={[
              { value: 'sp', label: 'São Paulo' },
              { value: 'rj', label: 'Rio de Janeiro' },
            ]}
            placeholder="Filial"
          />
          <Button variant="secondary" size="md"><Funnel size={16} /> Filtrar</Button>
          <Button variant="primary" size="md"><Plus size={16} weight="bold" /> Novo</Button>
        </div>
      </Preview>

      <SubsectionTitle>Grid de KPIs</SubsectionTitle>
      <Preview label="Dashboard — Cards de métrica">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--spacing-16)' }}>
          <KpiCard label="Faturamento" value="R$ 245.000" trend={12.5} icon={<CurrencyDollar size={20} />} iconColor="green" />
          <KpiCard label="Clientes Ativos" value="1.234" trend={-3.2} icon={<Users size={20} />} iconColor="blue" />
          <KpiCard label="Conversão" value="32%" trend={5.8} icon={<ChartLineUp size={20} />} iconColor="yellow" />
        </div>
      </Preview>

      <SubsectionTitle>Linha de Tabela com Avatar e Badge</SubsectionTitle>
      <Preview label="Lista de usuários">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-grey-100)', textAlign: 'left' }}>
              <th style={{ padding: 'var(--spacing-8) var(--spacing-12)', color: 'var(--color-grey-500)', fontWeight: 600 }}>Nome</th>
              <th style={{ padding: 'var(--spacing-8) var(--spacing-12)', color: 'var(--color-grey-500)', fontWeight: 600 }}>Filial</th>
              <th style={{ padding: 'var(--spacing-8) var(--spacing-12)', color: 'var(--color-grey-500)', fontWeight: 600 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { nome: 'João Silva', filial: 'São Paulo', status: 'Ativo' },
              { nome: 'Maria Santos', filial: 'Curitiba', status: 'Ativo' },
              { nome: 'Carlos Souza', filial: 'Rio de Janeiro', status: 'Inativo' },
            ].map(u => (
              <tr key={u.nome} style={{ borderBottom: '1px solid var(--color-grey-50)' }}>
                <td style={{ padding: 'var(--spacing-8) var(--spacing-12)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
                    <Avatar name={u.nome} size={28} />
                    <span>{u.nome}</span>
                  </div>
                </td>
                <td style={{ padding: 'var(--spacing-8) var(--spacing-12)', color: 'var(--color-grey-600)' }}>{u.filial}</td>
                <td style={{ padding: 'var(--spacing-8) var(--spacing-12)' }}>
                  <Badge variant={u.status === 'Ativo' ? 'success' : 'error'}>{u.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Preview>

      <SubsectionTitle>EmptyState com Ação</SubsectionTitle>
      <Preview>
        <EmptyState
          title="Nenhuma tarefa pendente"
          description="Todas as tarefas foram concluídas. Parabéns!"
        />
      </Preview>

      <SubsectionTitle>LoadingState</SubsectionTitle>
      <Preview>
        <div style={{ height: 160 }}>
          <LoadingState variant="inline" message="Carregando oportunidades..." />
        </div>
      </Preview>
    </StyleGuideSection>
  );
}
