import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { 
  MagnifyingGlass, 
  CaretDown, 
  CaretUp, 
  ArrowClockwise,
  Trash
} from '@phosphor-icons/react';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import '../../styles/components/historico.css';

interface RespostaSnapshot {
  id: string;
  texto_pergunta_snapshot: string;
  texto_resposta: string;
}

interface EntradaHistorico {
  id: string;
  data_entrada: string;
  nome_modelo_snapshot: string;
  modelo_id: string;
  respostas: RespostaSnapshot[];
}

export function HistoricoPage() {
  const toast = useToast();
  const [entradas, setEntradas] = useState<EntradaHistorico[]>([]);
  const [modelos, setModelos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [busca, setBusca] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [mesAnoSelecionado, setMesAnoSelecionado] = useState('');
  
  // Controle de cards expandidos
  const [cardsExpandidos, setCardsExpandidos] = useState<Record<string, boolean>>({});

  // Controle de exclusão
  const [entradaParaDeletar, setEntradaParaDeletar] = useState<EntradaHistorico | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    carregarFiltrosEEntradas();
  }, []);

  const handleDeletarEntrada = async () => {
    if (!entradaParaDeletar) return;
    setDeleting(true);
    try {
      // 1. Deletar respostas vinculadas
      const { error: respostasError } = await supabase
        .from('respostas_auditoria')
        .delete()
        .eq('entrada_id', entradaParaDeletar.id);

      if (respostasError) throw respostasError;

      // 2. Deletar a entrada
      const { error: entradaError } = await supabase
        .from('entradas_auditoria')
        .delete()
        .eq('id', entradaParaDeletar.id);

      if (entradaError) throw entradaError;

      toast.success('Sucesso', 'Auditoria excluída com sucesso!');
      setEntradaParaDeletar(null);
      carregarFiltrosEEntradas();
    } catch (err: any) {
      console.error('Erro ao excluir auditoria:', err);
      toast.error('Erro ao excluir', err.message || 'Ocorreu um erro ao excluir a auditoria.');
    } finally {
      setDeleting(false);
    }
  };

  const carregarFiltrosEEntradas = async () => {
    setLoading(true);
    try {
      // 1. Carregar modelos para o filtro
      const { data: modelosData, error: modelosError } = await supabase
        .from('modelos_auditoria')
        .select('id, nome');
      if (modelosError) throw modelosError;
      setModelos(modelosData || []);

      // 2. Carregar entradas com respostas em um único select aninhado
      const { data: entradasData, error: entradasError } = await supabase
        .from('entradas_auditoria')
        .select(`
          id,
          data_entrada,
          nome_modelo_snapshot,
          modelo_id,
          respostas:respostas_auditoria (
            id,
            texto_pergunta_snapshot,
            texto_resposta
          )
        `)
        .eq('status', 'concluido')
        .order('data_entrada', { ascending: false });

      if (entradasError) throw entradasError;
      setEntradas((entradasData as any) || []);
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = (id: string) => {
    setCardsExpandidos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtragem local
  const entradasFiltradas = entradas.filter(entrada => {
    // 1. Filtro de Modelo
    if (modeloSelecionado && entrada.modelo_id !== modeloSelecionado) {
      return false;
    }

    // 2. Filtro de Mês/Ano (YYYY-MM)
    if (mesAnoSelecionado && !entrada.data_entrada.startsWith(mesAnoSelecionado)) {
      return false;
    }

    // 3. Filtro de Busca de Texto
    if (busca.trim()) {
      const termo = busca.toLowerCase();
      const matchTitulo = entrada.nome_modelo_snapshot.toLowerCase().includes(termo);
      const matchData = formatarData(entrada.data_entrada).includes(termo);
      const matchRespostas = entrada.respostas.some(resp => 
        resp.texto_pergunta_snapshot.toLowerCase().includes(termo) || 
        (resp.texto_resposta && resp.texto_resposta.toLowerCase().includes(termo))
      );

      return matchTitulo || matchData || matchRespostas;
    }

    return true;
  });

  function formatarData(dataStr: string) {
    const partes = dataStr.split('-');
    if (partes.length !== 3) return dataStr;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  // Obter meses únicos do histórico para preencher o dropdown de filtro de data
  const obterFiltrosMeses = () => {
    const meses = new Set<string>();
    entradas.forEach(e => {
      const YYYY_MM = e.data_entrada.substring(0, 7); // ex: 2026-06
      meses.add(YYYY_MM);
    });
    
    return Array.from(meses).sort((a, b) => b.localeCompare(a));
  };

  const formatarMesAnoFiltro = (yyyyMm: string) => {
    const [ano, mes] = yyyyMm.split('-');
    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${nomesMeses[parseInt(mes, 10) - 1]} de ${ano}`;
  };

  const limparFiltros = () => {
    setBusca('');
    setModeloSelecionado('');
    setMesAnoSelecionado('');
  };

  return (
    <div className="historico-container">
      {/* Barra de Filtros */}
      <div className="historico-filters">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, position: 'relative' }}>
          <MagnifyingGlass size={18} style={{ position: 'absolute', left: '12px', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            className="filter-input"
            placeholder="Pesquisar em perguntas e respostas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ paddingLeft: '40px' }}
          />
        </div>

        <select
          className="filter-select"
          value={modeloSelecionado}
          onChange={(e) => setModeloSelecionado(e.target.value)}
        >
          <option value="">Todas as Auditorias</option>
          {modelos.map(m => (
            <option key={m.id} value={m.id}>{m.nome}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={mesAnoSelecionado}
          onChange={(e) => setMesAnoSelecionado(e.target.value)}
        >
          <option value="">Todos os Meses</option>
          {obterFiltrosMeses().map(m => (
            <option key={m} value={m}>{formatarMesAnoFiltro(m)}</option>
          ))}
        </select>

        {(busca || modeloSelecionado || mesAnoSelecionado) && (
          <Button variant="secondary" size="sm" onClick={limparFiltros}>
            Limpar
          </Button>
        )}

        <button 
          onClick={carregarFiltrosEEntradas} 
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'var(--color-text-muted)', background: 'none', border: 'none' }}
          title="Recarregar"
        >
          <ArrowClockwise size={20} />
        </button>
      </div>

      {/* Listagem de Cartões */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-muted)' }}>
          Carregando histórico de auditorias...
        </div>
      ) : (
        <div className="historico-list">
          {entradasFiltradas.map(entrada => {
            const expandido = cardsExpandidos[entrada.id] || false;

            return (
              <div key={entrada.id} className="historico-card" onClick={() => toggleCard(entrada.id)}>
                <div className="historico-card-header">
                  <div className="historico-card-info">
                    <span className="historico-card-date">{formatarData(entrada.data_entrada)}</span>
                    <span className="historico-card-title">{entrada.nome_modelo_snapshot}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      className="delete-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEntradaParaDeletar(entrada);
                      }}
                      title="Excluir Auditoria"
                      aria-label="Excluir Auditoria"
                    >
                      <Trash size={18} />
                    </button>
                    <span className="historico-card-badge">Concluída</span>
                    {expandido ? <CaretUp size={18} /> : <CaretDown size={18} />}
                  </div>
                </div>

                {expandido && (
                  <div className="historico-card-details" onClick={(e) => e.stopPropagation()}>
                    {entrada.respostas.map(resp => (
                      <div key={resp.id} className="detalhe-item">
                        <span className="detalhe-pergunta">{resp.texto_pergunta_snapshot}</span>
                        <div className="detalhe-resposta">
                          {resp.texto_resposta && resp.texto_resposta.trim() !== '' 
                            ? resp.texto_resposta 
                            : <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Sem resposta preenchida.</span>
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {entradasFiltradas.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <p>Nenhuma auditoria correspondente aos filtros foi encontrada.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        open={!!entradaParaDeletar}
        onClose={() => setEntradaParaDeletar(null)}
        title="Excluir Auditoria"
        size="sm"
        footer={
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
            <Button
              variant="secondary"
              onClick={() => setEntradaParaDeletar(null)}
              disabled={deleting}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleDeletarEntrada}
              disabled={deleting}
              style={{ backgroundColor: 'var(--color-destructive)', borderColor: 'var(--color-destructive)' }}
            >
              {deleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          </div>
        }
      >
        <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text)', lineHeight: 1.5 }}>
          Tem certeza que deseja excluir permanentemente a auditoria de <strong>{entradaParaDeletar ? formatarData(entradaParaDeletar.data_entrada) : ''}</strong> (<em>{entradaParaDeletar?.nome_modelo_snapshot}</em>)?
        </p>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          Esta ação não poderá ser desfeita e removerá todas as respostas inseridas.
        </p>
      </Modal>
    </div>
  );
}
