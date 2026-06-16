import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { 
  Lightning, 
  Target, 
  CaretLeft, 
  CaretRight, 
  CheckCircle,
  Play
} from '@phosphor-icons/react';
import '../../styles/components/dashboard.css';

export function DashboardPage() {
  const navigate = useNavigate();
  
  // Obter data de hoje no fuso local
  const obterDataHojeLocal = () => {
    return new Date().toLocaleDateString('en-CA');
  };

  const hojeStr = obterDataHojeLocal();
  const [dataAtual, setDataAtual] = useState(new Date()); // Controla o mês exibido no Heatmap
  const [entradasDoMes, setEntradasDoMes] = useState<any[]>([]);
  const [modelosAtivos, setModelosAtivos] = useState<any[]>([]);
  const [stats, setStats] = useState({
    streakAtual: 0,
    melhorStreak: 0,
    consistenciaMensal: 0, // % de dias preenchidos no mês
    totalRespondidoMes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEstatisticas();
  }, [dataAtual]);

  const carregarEstatisticas = async () => {
    setLoading(true);
    try {
      // 1. Buscar modelos ativos do usuário
      const { data: modelos, error: modelosError } = await supabase
        .from('modelos_auditoria')
        .select('*')
        .eq('ativo', true);

      if (modelosError) throw modelosError;
      setModelosAtivos(modelos || []);

      // 2. Buscar entradas concluídas dos últimos 60 dias para cálculo de streaks
      const dataLimite = new Date();
      dataLimite.setDate(dataLimite.getDate() - 60);
      const dataLimiteStr = dataLimite.toLocaleDateString('en-CA');

      const { data: entradasTotal, error: entradasError } = await supabase
        .from('entradas_auditoria')
        .select('data_entrada, status, modelo_id')
        .eq('status', 'concluido')
        .gte('data_entrada', dataLimiteStr)
        .order('data_entrada', { ascending: false });

      if (entradasError) throw entradasError;
      
      const entradasValidas = entradasTotal || [];
      setEntradasDoMes(entradasValidas);

      // 3. Calcular métricas
      calcularMetricas(entradasValidas);
    } catch (err) {
      console.error('Erro ao carregar estatísticas do dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const calcularMetricas = (entradas: any[]) => {
    // Obter datas únicas com pelo menos 1 auditoria concluída
    const datasComPreenchimento = new Set<string>();
    entradas.forEach(e => datasComPreenchimento.add(e.data_entrada));

    // --- STREAK ATUAL ---
    let streakAtual = 0;
    let diaAnalise = new Date(); // Começa hoje
    let continuar = true;
    
    // Se o usuário não preencheu hoje e também não preencheu ontem, o streak atual é 0.
    // Se ele preencheu ontem mas ainda não hoje, a contagem de streak ativo se inicia a partir de ontem.
    const hojeTemPreenchimento = datasComPreenchimento.has(hojeStr);
    
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    const ontemStr = ontem.toLocaleDateString('en-CA');
    const ontemTemPreenchimento = datasComPreenchimento.has(ontemStr);

    if (!hojeTemPreenchimento && !ontemTemPreenchimento) {
      streakAtual = 0;
    } else {
      // Se não preencheu hoje mas preencheu ontem, começa a contar de ontem
      if (!hojeTemPreenchimento) {
        diaAnalise.setDate(diaAnalise.getDate() - 1);
      }
      
      while (continuar) {
        const diaStr = diaAnalise.toLocaleDateString('en-CA');
        if (datasComPreenchimento.has(diaStr)) {
          streakAtual++;
          diaAnalise.setDate(diaAnalise.getDate() - 1); // Volta 1 dia
        } else {
          continuar = false;
        }
      }
    }

    // --- MELHOR STREAK ---
    // Converter o set de datas em array ordenado decrescente
    const datasOrdenadas = Array.from(datasComPreenchimento)
      .map(d => new Date(d + 'T00:00:00'))
      .sort((a, b) => b.getTime() - a.getTime());

    let melhorStreak = 0;
    let streakTemp = 0;

    if (datasOrdenadas.length > 0) {
      melhorStreak = 1;
      streakTemp = 1;
      
      for (let i = 0; i < datasOrdenadas.length - 1; i++) {
        const diffTempo = datasOrdenadas[i].getTime() - datasOrdenadas[i+1].getTime();
        const diffDias = Math.round(diffTempo / (1000 * 60 * 60 * 24));
        
        if (diffDias === 1) {
          streakTemp++;
        } else {
          if (streakTemp > melhorStreak) {
            melhorStreak = streakTemp;
          }
          streakTemp = 1;
        }
      }
      if (streakTemp > melhorStreak) {
        melhorStreak = streakTemp;
      }
    }

    // --- CONSISTÊNCIA MENSAL ---
    // Total de dias no mês atual até hoje
    const mesAnoAtual = { mes: dataAtual.getMonth(), ano: dataAtual.getFullYear() };
    const hojeAux = new Date();
    
    let diasDecorridosNoMes = hojeAux.getDate();
    // Se o mês exibido for anterior ao atual, calcula o total de dias daquele mês
    if (mesAnoAtual.mes !== hojeAux.getMonth() || mesAnoAtual.ano !== hojeAux.getFullYear()) {
      diasDecorridosNoMes = new Date(mesAnoAtual.ano, mesAnoAtual.mes + 1, 0).getDate();
    }

    let diasPreenchidosMes = 0;
    const datasDoMesComPreenchimento = new Set<string>();

    entradas.forEach(e => {
      const eData = new Date(e.data_entrada + 'T00:00:00');
      if (eData.getMonth() === mesAnoAtual.mes && eData.getFullYear() === mesAnoAtual.ano) {
        datasDoMesComPreenchimento.add(e.data_entrada);
      }
    });

    diasPreenchidosMes = datasDoMesComPreenchimento.size;

    const consistencia = diasDecorridosNoMes > 0 
      ? Math.round((diasPreenchidosMes / diasDecorridosNoMes) * 100) 
      : 0;

    setStats({
      streakAtual,
      melhorStreak,
      consistenciaMensal: consistencia,
      totalRespondidoMes: entradas.filter(e => {
        const eData = new Date(e.data_entrada + 'T00:00:00');
        return eData.getMonth() === mesAnoAtual.mes && eData.getFullYear() === mesAnoAtual.ano;
      }).length
    });
  };

  // Mudar de mês no Heatmap
  const alterarMes = (direcao: 'anterior' | 'seguinte') => {
    setDataAtual(prev => {
      const novaData = new Date(prev);
      if (direcao === 'anterior') {
        novaData.setMonth(novaData.getMonth() - 1);
      } else {
        novaData.setMonth(novaData.getMonth() + 1);
      }
      return novaData;
    });
  };

  // Renderizar Heatmap Calendário
  const renderizarCalendario = () => {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    // Primeiro dia do mês (0 = Domingo, 1 = Segunda...)
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    // Total de dias no mês
    const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();

    const cells: React.ReactNode[] = [];

    // Adicionar células vazias antes do dia 1 para alinhar os dias da semana
    for (let i = 0; i < primeiroDiaSemana; i++) {
      cells.push(<div key={`vazia-${i}`} className="heatmap-day-cell cell-vazia" />);
    }

    // Mapeamento de preenchimento por dia
    const preenchimentosPorDia: Record<number, number> = {};
    
    entradasDoMes.forEach(e => {
      const dataEnt = new Date(e.data_entrada + 'T00:00:00');
      if (dataEnt.getMonth() === mes && dataEnt.getFullYear() === ano) {
        const dia = dataEnt.getDate();
        preenchimentosPorDia[dia] = (preenchimentosPorDia[dia] || 0) + 1;
      }
    });

    const hoje = new Date();

    // Adicionar células para cada dia do mês
    for (let dia = 1; dia <= totalDiasNoMes; dia++) {
      const dataDia = new Date(ano, mes, dia);
      const dataDiaStr = dataDia.toLocaleDateString('en-CA');
      const isFuturo = dataDia.getTime() > hoje.getTime() && dataDiaStr !== hojeStr;

      const qtd = preenchimentosPorDia[dia] || 0;
      let classeCell = 'cell-zero';
      
      if (isFuturo) {
        classeCell = 'cell-futura';
      } else if (qtd === 1) {
        classeCell = 'cell-uma';
      } else if (qtd >= 2) {
        classeCell = 'cell-duas';
      }

      cells.push(
        <div 
          key={`dia-${dia}`} 
          className={`heatmap-day-cell ${classeCell}`}
          title={`${dia}/${mes + 1}/${ano}: ${qtd} de ${modelosAtivos.length} respondidas`}
          onClick={() => {
            if (!isFuturo) {
              navigate('/app/responder');
            }
          }}
        >
          {dia}
        </div>
      );
    }

    return cells;
  };

  const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Identificar status de preenchimento de hoje de cada modelo
  const obterStatusHoje = (modeloId: string) => {
    const hojePreenchidos = entradasDoMes.filter(e => e.data_entrada === hojeStr && e.modelo_id === modeloId);
    if (hojePreenchidos.length > 0) {
      return 'concluido';
    }
    return 'pendente';
  };

  return (
    <div className="dashboard-container">
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrapper kpi-icon-primary">
            <Lightning size={24} weight="fill" />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Streak Atual</span>
            <span className="kpi-value">{stats.streakAtual} {stats.streakAtual === 1 ? 'dia' : 'dias'}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper kpi-icon-success">
            <Lightning size={24} weight="bold" />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Melhor Streak</span>
            <span className="kpi-value">{stats.melhorStreak} {stats.melhorStreak === 1 ? 'dia' : 'dias'}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper kpi-icon-alert">
            <Target size={24} weight="fill" />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Consistência do Mês</span>
            <span className="kpi-value">{stats.consistenciaMensal}%</span>
          </div>
        </div>
      </div>

      {/* Grid de dois painéis: Calendário + Acompanhamento Rápido */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-24)' }}>
        
        {/* HEATMAP MENSAL */}
        <div className="heatmap-card">
          <div className="heatmap-header">
            <h3 className="heatmap-title">Frequência Mensal</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => alterarMes('anterior')} style={{ cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                <CaretLeft size={20} />
              </button>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)', minWidth: '110px', textAlign: 'center' }}>
                {nomesMeses[dataAtual.getMonth()]} {dataAtual.getFullYear()}
              </span>
              <button onClick={() => alterarMes('seguinte')} style={{ cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                <CaretRight size={20} />
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-muted)' }}>
              Carregando heatmap...
            </div>
          ) : (
            <>
              <div className="heatmap-calendar">
                <div className="heatmap-day-label">Dom</div>
                <div className="heatmap-day-label">Seg</div>
                <div className="heatmap-day-label">Ter</div>
                <div className="heatmap-day-label">Qua</div>
                <div className="heatmap-day-label">Qui</div>
                <div className="heatmap-day-label">Sex</div>
                <div className="heatmap-day-label">Sáb</div>
                
                {renderizarCalendario()}
              </div>

              <div className="heatmap-legend">
                <span>Menos</span>
                <div className="legend-item">
                  <div className="legend-color cell-zero" />
                  <span>0</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color cell-uma" />
                  <span>1</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color cell-duas" />
                  <span>2+</span>
                </div>
                <span>Mais</span>
              </div>
            </>
          )}
        </div>

        {/* COMPROMISSOS DE HOJE */}
        <div className="hoje-card">
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '8px' }}>
            Acompanhamento de Hoje
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {modelosAtivos.map(modelo => {
              const statusHoje = obterStatusHoje(modelo.id);
              
              return (
                <div key={modelo.id} className="hoje-item">
                  <div className="hoje-item-info">
                    <span className="hoje-item-nome">{modelo.nome}</span>
                    <span className="hoje-item-status">
                      {statusHoje === 'concluido' ? 'Concluída hoje' : 'Não respondida hoje'}
                    </span>
                  </div>

                  {statusHoje === 'concluido' ? (
                    <span style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}>
                      <CheckCircle size={18} weight="fill" /> Concluído
                    </span>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => navigate('/app/responder')}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Play size={14} weight="fill" /> Responder
                    </Button>
                  )}
                </div>
              );
            })}

            {modelosAtivos.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '24px' }}>
                Nenhuma auditoria ativa cadastrada.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
