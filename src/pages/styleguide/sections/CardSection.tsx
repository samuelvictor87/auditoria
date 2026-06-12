// pages/styleguide/sections/CardSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Card, KpiCard } from '../../../components/ui/Card';
import { CurrencyDollar, Users, ChartLineUp, ShoppingCart, Briefcase, CheckSquare, Target, ArrowRight, TrendUp, TrendDown, ArrowUpRight, ChartBar } from '@phosphor-icons/react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import '../../../styles/components/inicio.css';
import '../../../styles/components/dashboard-comparativo.css';
import '../../../styles/components/dashboard-hub.css';

export function CardSection() {
  return (
    <StyleGuideSection id="card" title="Card" description="Container com elevação e padding. Base para agrupamento visual.">
      <SubsectionTitle>Paddings</SubsectionTitle>
      <Preview>
        <div className="sg-flex">
          <Card padding="sm"><p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Padding SM</p></Card>
          <Card padding="md"><p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Padding MD (padrão)</p></Card>
          <Card padding="lg"><p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Padding LG</p></Card>
        </div>
      </Preview>
      <CodeBlock>{`<Card padding="md">Conteúdo do card</Card>`}</CodeBlock>

      <SubsectionTitle>Com Formulário</SubsectionTitle>
      <Preview>
        <Card padding="lg" style={{ maxWidth: 400 }}>
          <h3 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>Criar projeto</h3>
          <p style={{ margin: '0 0 var(--spacing-16)', fontSize: 'var(--font-size-sm)', color: 'var(--color-grey-500)' }}>
            Preencha os dados do novo projeto.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
            <Input label="Nome" placeholder="Nome do projeto" />
            <Input label="Descrição" placeholder="Descrição breve" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-8)' }}>
              <Button variant="secondary">Cancelar</Button>
              <Button variant="primary">Criar</Button>
            </div>
          </div>
        </Card>
      </Preview>
      <CodeBlock>{`<Card>
  <CardHeader>...</CardHeader>
  <CardContent>
    <form>...</form>
  </CardContent>
</Card>`}</CodeBlock>

      <SubsectionTitle>KPI Card</SubsectionTitle>
      <Preview>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--spacing-16)' }}>
          <KpiCard label="Faturamento" value="R$ 245.000" trend={12.5} icon={<CurrencyDollar size={20} />} iconColor="green" />
          <KpiCard label="Clientes Ativos" value="1.234" trend={-3.2} icon={<Users size={20} />} iconColor="blue" />
          <KpiCard label="Conversão" value="32%" trend={5.8} icon={<ChartLineUp size={20} />} iconColor="yellow" />
          <KpiCard label="Vendas" value="89" icon={<ShoppingCart size={20} />} iconColor="red" />
        </div>
      </Preview>
      <SubsectionTitle>Acesso Rápido (Navegação)</SubsectionTitle>
      <Preview>
        <div className="inicio-quick-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <button className="inicio-quick-card" style={{ '--item-color': 'var(--color-primary)' } as React.CSSProperties}>
            <div className="inicio-quick-icon"><Briefcase size={24} weight="fill" /></div>
            <div className="inicio-quick-info">
              <span className="inicio-quick-label">Oportunidades</span>
              <span className="inicio-quick-desc">Gerencie seu pipeline de vendas</span>
            </div>
            <ArrowRight size={16} className="inicio-quick-arrow" />
          </button>
          
          <button className="inicio-quick-card" style={{ '--item-color': 'var(--color-brand-400)' } as React.CSSProperties}>
            <div className="inicio-quick-icon"><Users size={24} weight="fill" /></div>
            <div className="inicio-quick-info">
              <span className="inicio-quick-label">Clientes</span>
              <span className="inicio-quick-desc">Base de clientes e prospectos</span>
            </div>
            <ArrowRight size={16} className="inicio-quick-arrow" />
          </button>
        </div>
      </Preview>

      <SubsectionTitle>Indicadores Financeiros Simples</SubsectionTitle>
      <Preview>
        <div className="inicio-meta-kpis-grid" style={{ maxWidth: '100%', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="inicio-meta-kpi-card-box">
            <span className="inicio-meta-kpi-label-box">Objetivo Diário</span>
            <span className="inicio-meta-kpi-value-box">R$ 581.486,92</span>
          </div>
          <div className="inicio-meta-kpi-card-box">
            <span className="inicio-meta-kpi-label-box">Objetivo Anterior</span>
            <span className="inicio-meta-kpi-value-box">R$ 12.292.843,56</span>
          </div>
          <div className="inicio-meta-kpi-card-box">
            <span className="inicio-meta-kpi-label-box">Ajustado</span>
            <span className="inicio-meta-kpi-value-box">R$ 11.629.738,46</span>
          </div>
          <div className="inicio-meta-kpi-card-box">
            <span className="inicio-meta-kpi-label-box">Faltante</span>
            <span className="inicio-meta-kpi-value-box text-error">R$ 2.035.955,19</span>
          </div>
        </div>
      </Preview>

      <SubsectionTitle>Indicadores Comparativos</SubsectionTitle>
      <Preview>
        <div className="cmp-kpis-grid" style={{ maxWidth: '100%', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <div className="cmp-kpi-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p className="cmp-kpi-title">Faturamento Líquido</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, padding: '2px 6px', borderRadius: 12, fontSize: 11, fontWeight: 600, backgroundColor: 'var(--color-error-50)', color: 'var(--color-error-700)' }}>
                <TrendDown size={10} weight="bold" /> -5,0%
              </div>
            </div>
            
            <div className="cmp-kpi-row" style={{ marginTop: '4px' }}>
              <div className="cmp-kpi-period-label">
                <span className="cmp-filter-period-dot p2" style={{ backgroundColor: '#0052cc' }} />&nbsp;
                Abril/2026 (Atual)
              </div>
              <p className="cmp-kpi-val-p2">R$ 17.364.680,38</p>
            </div>

            <div className="cmp-kpi-row" style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--color-grey-100)' }}>
              <div className="cmp-kpi-period-label">
                <span className="cmp-filter-period-dot p1" style={{ backgroundColor: '#94a3b8' }} />&nbsp;
                Abril/2025 (Anterior)
              </div>
              <p className="cmp-kpi-val-p1">R$ 18.282.381,20</p>
            </div>
          </div>

          <div className="cmp-kpi-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p className="cmp-kpi-title">Itens Vendidos</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, padding: '2px 6px', borderRadius: 12, fontSize: 11, fontWeight: 600, backgroundColor: 'var(--color-success-50)', color: 'var(--color-success-700)' }}>
                <TrendUp size={10} weight="bold" /> +18,4%
              </div>
            </div>
            
            <div className="cmp-kpi-row" style={{ marginTop: '4px' }}>
              <div className="cmp-kpi-period-label">
                <span className="cmp-filter-period-dot p2" style={{ backgroundColor: '#0052cc' }} />&nbsp;
                Abril/2026 (Atual)
              </div>
              <p className="cmp-kpi-val-p2">116.767</p>
            </div>

            <div className="cmp-kpi-row" style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--color-grey-100)' }}>
              <div className="cmp-kpi-period-label">
                <span className="cmp-filter-period-dot p1" style={{ backgroundColor: '#94a3b8' }} />&nbsp;
                Abril/2025 (Anterior)
              </div>
              <p className="cmp-kpi-val-p1">98.602</p>
            </div>
          </div>
        </div>
      </Preview>
      <SubsectionTitle>Painéis de Dashboard (Navegação)</SubsectionTitle>
      <Preview>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)', width: '100%' }}>
          
          {/* Featured */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-grey-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--spacing-16)' }}>Painéis em destaque</h4>
            <div className="dhub-featured-grid">
              <button className="dhub-card dhub-card-featured" style={{ textAlign: 'left' }}>
                <div className="dhub-card-inner">
                  <div className="dhub-card-top">
                    <div className="dhub-card-tag">Financeiro</div>
                    <div className="dhub-card-arrow-btn">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                  <div className="dhub-card-icon-wrap">
                    <CurrencyDollar size={32} weight="duotone" />
                  </div>
                  <div className="dhub-card-body">
                    <h3 className="dhub-card-title">Rentabilidade</h3>
                    <p className="dhub-card-desc">Analise a margem de contribuição, lucro operacional e rentabilidade por segmento, produto e período.</p>
                  </div>
                  <div className="dhub-card-footer">
                    <span className="dhub-card-cta">Acessar painel</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </button>
              
              <button className="dhub-card dhub-card-featured" style={{ textAlign: 'left' }}>
                <div className="dhub-card-inner">
                  <div className="dhub-card-top">
                    <div className="dhub-card-tag">Equipe</div>
                    <div className="dhub-card-arrow-btn">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                  <div className="dhub-card-icon-wrap">
                    <Users size={32} weight="duotone" />
                  </div>
                  <div className="dhub-card-body">
                    <h3 className="dhub-card-title">Representantes e Filiais</h3>
                    <p className="dhub-card-desc">Monitore o desempenho individual de representantes comerciais e resultados consolidados por filial.</p>
                  </div>
                  <div className="dhub-card-footer">
                    <span className="dhub-card-cta">Acessar painel</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Secondary */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-grey-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--spacing-16)' }}>Mais análises</h4>
            <div className="dhub-secondary-grid">
              <button className="dhub-card dhub-card-secondary" style={{ textAlign: 'left' }}>
                <div className="dhub-card-inner">
                  <div className="dhub-card-top">
                    <div className="dhub-card-tag">Vendas</div>
                    <div className="dhub-card-arrow-btn">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                  <div className="dhub-secondary-row">
                    <div className="dhub-card-icon-wrap dhub-card-icon-sm">
                      <ChartBar size={32} weight="duotone" />
                    </div>
                    <div className="dhub-card-body">
                      <h3 className="dhub-card-title">Vendas por Grupo</h3>
                      <p className="dhub-card-desc">Visualize o desempenho de vendas segmentado por grupo de produto, família e categoria comercial.</p>
                    </div>
                  </div>
                  <div className="dhub-card-footer">
                    <span className="dhub-card-cta">Acessar painel</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </Preview>
    </StyleGuideSection>
  );
}
