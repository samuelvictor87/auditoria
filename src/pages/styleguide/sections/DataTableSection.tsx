// pages/styleguide/sections/DataTableSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { DataTable } from '../../../components/ui/DataTable';
import type { Column } from '../../../components/ui/DataTable';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { Eye, PencilSimple, Trash, Buildings, MapPin, Phone, Users } from '@phosphor-icons/react';

interface DemoRow {
  nome: string;
  email: string;
  filial: string;
  status: string;
}

const DEMO_COLUMNS: Column<DemoRow>[] = [
  {
    key: 'usuario', label: 'Usuário', render: (_, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)' }}>
        <Avatar name={row.nome} size={40} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{row.nome}</span>
          <span style={{ fontSize: '12px', color: 'var(--color-grey-500)' }}>{row.email}</span>
        </div>
      </div>
    )
  },
  { key: 'filial', label: 'Filial' },
  {
    key: 'status', label: 'Status', render: (val) => (
      <Badge variant={val === 'Ativo' ? 'success' : 'error'}>{val}</Badge>
    )
  },
];

const DEMO_DATA: DemoRow[] = [
  { nome: 'João Silva', email: 'joao@dibracam.com', filial: 'São Paulo', status: 'Ativo' },
  { nome: 'Maria Santos', email: 'maria@dibracam.com', filial: 'Curitiba', status: 'Ativo' },
  { nome: 'Carlos Souza', email: 'carlos@dibracam.com', filial: 'Rio de Janeiro', status: 'Inativo' },
  { nome: 'Ana Ferreira', email: 'ana@dibracam.com', filial: 'São Paulo', status: 'Ativo' },
];

export function DataTableSection() {
  return (
    <StyleGuideSection id="data-table" title="DataTable" description="Tabela de dados com colunas configuráveis, paginação, ações e estados.">
      <SubsectionTitle>Tabela Completa</SubsectionTitle>
      <Preview label="Com Avatar, Badge e ações">
        <DataTable
          columns={DEMO_COLUMNS}
          data={DEMO_DATA}
          actions={[
            { icon: <Eye size={16} />, label: 'Ver detalhes', onClick: () => {} },
            { icon: <PencilSimple size={16} />, label: 'Editar', onClick: () => {} },
          ]}
          onRowClick={() => {}}
        />
      </Preview>
      <CodeBlock>{`<DataTable
  columns={columns}
  data={data}
  loading={isLoading}
  emptyMessage="Nenhum registro"
  actions={[{ icon: <Eye />, label: 'Ver', onClick: fn }]}
  onRowClick={handleClick}
  pagination={{ page, pageSize, total, onPageChange }}
/>`}</CodeBlock>

      <SubsectionTitle>Visualização em Cards (Grid)</SubsectionTitle>
      <Preview label="Alternativa para listas responsivas (ex: Filiais)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--spacing-16)' }}>
          {/* Card 1 */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-grey-200)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-24)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-50)', color: 'var(--color-brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Buildings size={24} weight="fill" />
                </div>
                <span style={{ fontWeight: 600, fontSize: 'var(--font-size-md)', color: 'var(--color-text)' }}>PAT (Butantã)</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-8)', color: 'var(--color-grey-400)' }}>
                <PencilSimple size={18} cursor="pointer" />
                <Trash size={18} cursor="pointer" />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', fontSize: 'var(--font-size-sm)', color: 'var(--color-grey-600)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
                <MapPin size={16} /> Avenida Corifeu de Azevedo Marques, 345
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
                <Phone size={16} /> (11) 3724-8888
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
                <Users size={16} /> Vendedores ativos: <strong style={{ color: 'var(--color-text)', marginLeft: 4 }}>4</strong>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-grey-200)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-24)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-50)', color: 'var(--color-brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Buildings size={24} weight="fill" />
                </div>
                <span style={{ fontWeight: 600, fontSize: 'var(--font-size-md)', color: 'var(--color-text)' }}>Santo André</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-8)', color: 'var(--color-grey-400)' }}>
                <PencilSimple size={18} cursor="pointer" />
                <Trash size={18} cursor="pointer" />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', fontSize: 'var(--font-size-sm)', color: 'var(--color-grey-600)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
                <MapPin size={16} /> Avenida dos Estados, 1900
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
                <Phone size={16} /> (11) 4993-7000
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
                <Users size={16} /> Vendedores ativos: <strong style={{ color: 'var(--color-text)', marginLeft: 4 }}>32</strong>
              </div>
            </div>
          </div>
        </div>
      </Preview>

      <SubsectionTitle>Estado Vazio</SubsectionTitle>
      <Preview>
        <DataTable columns={DEMO_COLUMNS} data={[]} emptyMessage="Nenhum usuário encontrado" />
      </Preview>
    </StyleGuideSection>
  );
}
