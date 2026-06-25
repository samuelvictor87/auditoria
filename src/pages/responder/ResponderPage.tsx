import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { Modal } from '../../components/ui/Modal';
import { 
  Calendar, 
  CaretDown, 
  CaretUp, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  Question,
  Microphone,
  Sparkle
} from '@phosphor-icons/react';
import '../../styles/components/responder.css';
import '../../styles/components/input.css';

interface ModeloAuditoria {
  id: string;
  nome: string;
  descricao: string;
  identificador: string;
}

interface EntradaAuditoria {
  id: string;
  status: 'nao_iniciado' | 'rascunho' | 'concluido';
  concluido_em: string | null;
}

interface RespostaAuditoria {
  id: string;
  texto_pergunta_snapshot: string;
  texto_ajuda_snapshot: string;
  exemplos_snapshot: string[] | string;
  texto_resposta: string;
  ordem_exibicao: number;
}

export function ResponderPage() {
  const toast = useToast();
  // Obter data de hoje no fuso local no formato YYYY-MM-DD
  const obterDataHojeLocal = () => {
    return new Date().toLocaleDateString('en-CA');
  };

  const obterDataOntemLocal = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toLocaleDateString('en-CA');
  };

  const [dataSelecionada, setDataSelecionada] = useState(obterDataHojeLocal());
  const [modelos, setModelos] = useState<ModeloAuditoria[]>([]);
  const [entradas, setEntradas] = useState<Record<string, EntradaAuditoria>>({});
  const [loading, setLoading] = useState(true);
  
  // Estados para o formulário de auditoria ativa
  const [modeloAtivo, setModeloAtivo] = useState<ModeloAuditoria | null>(null);
  const [entradaAtiva, setEntradaAtiva] = useState<EntradaAuditoria | null>(null);
  const [respostas, setRespostas] = useState<RespostaAuditoria[]>([]);
  const [loadingForm, setLoadingForm] = useState(false);
  const [exibirExemplos, setExibirExemplos] = useState<Record<string, boolean>>({});

  // Estados para gravação de áudio e IA
  const [gravandoId, setGravandoId] = useState<string | null>(null);
  const [tempoGravacao, setTempoGravacao] = useState(0);
  const [loadingIA, setLoadingIA] = useState<Record<string, 'transcrevendo' | 'resumindo' | null>>({});
  const [revisaoIA, setRevisaoIA] = useState<{ respostaId: string; textoOriginal: string; textoMelhorado: string } | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervaloTempoRef = useRef<any>(null);

  // Status de salvamento: 'salvo' | 'digitando' | 'salvando' | 'erro'
  const [saveStatus, setSaveStatus] = useState<'salvo' | 'digitando' | 'salvando' | 'erro'>('salvo');
  const timeoutsRef = useRef<Record<string, any>>({});
  const respostasPendentesRef = useRef<Record<string, string>>({});

  // Carregar dados dos modelos e entradas para a data selecionada
  useEffect(() => {
    if (!modeloAtivo) {
      carregarModelosEEntradas();
    }
  }, [dataSelecionada, modeloAtivo]);

  // Limpar timeouts ao desmontar
  useEffect(() => {
    return () => {
      // Salvar qualquer coisa pendente imediatamente
      Object.keys(timeoutsRef.current).forEach(id => {
        clearTimeout(timeoutsRef.current[id]);
        salvarRespostaImediata(id, respostasPendentesRef.current[id]);
      });
      // Limpar timer de gravação e parar media recorder se estiver gravando
      if (intervaloTempoRef.current) {
        clearInterval(intervaloTempoRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const carregarModelosEEntradas = async () => {
    setLoading(true);
    try {
      // 1. Carregar modelos ativos
      const { data: modelosData, error: modelosError } = await supabase
        .from('modelos_auditoria')
        .select('*')
        .eq('ativo', true)
        .order('ordem_exibicao', { ascending: true });

      if (modelosError) throw modelosError;
      setModelos(modelosData || []);

      // 2. Carregar entradas da data
      const { data: entradasData, error: entradasError } = await supabase
        .from('entradas_auditoria')
        .select('id, modelo_id, status, concluido_em')
        .eq('data_entrada', dataSelecionada);

      if (entradasError) throw entradasError;

      const mapaEntradas: Record<string, EntradaAuditoria> = {};
      if (entradasData) {
        entradasData.forEach((ent: any) => {
          if (ent.modelo_id) {
            mapaEntradas[ent.modelo_id] = {
              id: ent.id,
              status: ent.status,
              concluido_em: ent.concluido_em
            };
          }
        });
      }
      setEntradas(mapaEntradas);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  // Iniciar ou abrir o formulário de auditoria
  const abrirAuditoria = async (modelo: ModeloAuditoria) => {
    setModeloAtivo(modelo);
    setLoadingForm(true);
    setSaveStatus('salvo');
    
    try {
      let entrada = entradas[modelo.id];
      let entradaId = entrada?.id;

      // Se não houver entrada para esta data, criar usando RPC
      if (!entradaId) {
        const { data, error } = await supabase.rpc('criar_auditoria_diaria', {
          p_modelo_id: modelo.id,
          p_data_entrada: dataSelecionada
        });

        if (error) throw error;
        entradaId = data;
        
        // Atualizar lista local
        entrada = { id: entradaId, status: 'rascunho', concluido_em: null };
      }

      setEntradaAtiva(entrada);

      // Carregar as respostas/perguntas copiadas do snapshot
      const { data: respostasData, error: respostasError } = await supabase
        .from('respostas_auditoria')
        .select('*')
        .eq('entrada_id', entradaId)
        .order('ordem_exibicao', { ascending: true });

      if (respostasError) throw respostasError;

      setRespostas(respostasData || []);
    } catch (err) {
      console.error('Erro ao carregar formulário de auditoria:', err);
    } finally {
      setLoadingForm(false);
    }
  };

  // Salvar resposta com debounce
  const handleTextareaChange = (respostaId: string, novoTexto: string) => {
    setSaveStatus('digitando');

    // Atualizar estado na tela
    setRespostas(prev => prev.map(resp => 
      resp.id === respostaId ? { ...resp, texto_resposta: novoTexto } : resp
    ));

    // Salvar na referência temporária de pendências
    respostasPendentesRef.current[respostaId] = novoTexto;

    // Limpar timeout antigo
    if (timeoutsRef.current[respostaId]) {
      clearTimeout(timeoutsRef.current[respostaId]);
    }

    // Agendar novo salvamento
    timeoutsRef.current[respostaId] = setTimeout(() => {
      salvarRespostaImediata(respostaId, novoTexto);
    }, 1500);
  };

  const salvarRespostaImediata = async (respostaId: string, texto: string) => {
    setSaveStatus('salvando');
    try {
      const { error } = await supabase
        .from('respostas_auditoria')
        .update({ texto_resposta: texto })
        .eq('id', respostaId);

      if (error) throw error;
      
      // Se não houver mais nenhum timeout agendado rodando, marca como salvo
      delete timeoutsRef.current[respostaId];
      delete respostasPendentesRef.current[respostaId];
      
      if (Object.keys(timeoutsRef.current).length === 0) {
        setSaveStatus('salvo');
      }
    } catch (err) {
      console.error('Erro ao salvar resposta:', err);
      setSaveStatus('erro');
    }
  };

  // Clicar em um exemplo para adicionar à resposta
  const handleAdicionarExemplo = (respostaId: string, textoExemplo: string, respostaAtual: string) => {
    const delimitador = respostaAtual.trim() === '' ? '' : '\n';
    const novoTexto = `${respostaAtual}${delimitador}• ${textoExemplo}`;
    handleTextareaChange(respostaId, novoTexto);
  };

  // Concluir auditoria
  const handleConcluir = async () => {
    if (!entradaAtiva) return;
    
    setLoadingForm(true);
    
    // Executar qualquer salvamento pendente imediatamente
    const pendencias = { ...respostasPendentesRef.current };
    for (const id of Object.keys(pendencias)) {
      if (timeoutsRef.current[id]) {
        clearTimeout(timeoutsRef.current[id]);
      }
      await salvarRespostaImediata(id, pendencias[id]);
    }

    try {
      const { error } = await supabase
        .from('entradas_auditoria')
        .update({ 
          status: 'concluido',
          concluido_em: new Date().toISOString()
        })
        .eq('id', entradaAtiva.id);

      if (error) throw error;

      // Voltar para listagem
      fecharFormulario();
      toast.success('Sucesso', 'Auditoria diária concluída com sucesso!');
    } catch (err: any) {
      console.error('Erro ao concluir auditoria:', err);
      toast.error('Erro ao concluir', err.message || 'Erro ao concluir auditoria. Tente novamente.');
      setLoadingForm(false);
    }
  };

  const fecharFormulario = () => {
    // Executar qualquer salvamento pendente
    const pendencias = { ...respostasPendentesRef.current };
    Object.keys(pendencias).forEach(id => {
      if (timeoutsRef.current[id]) {
        clearTimeout(timeoutsRef.current[id]);
      }
      salvarRespostaImediata(id, pendencias[id]);
    });

    setModeloAtivo(null);
    setEntradaAtiva(null);
    setRespostas([]);
    setExibirExemplos({});
  };

  // Toggle do colapsável de exemplos
  const toggleExemplos = (respostaId: string) => {
    setExibirExemplos(prev => ({
      ...prev,
      [respostaId]: !prev[respostaId]
    }));
  };

  // Iniciar gravação de áudio
  const iniciarGravacao = async (respostaId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          await processarTranscricao(respostaId, base64Audio);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setGravandoId(respostaId);
      setTempoGravacao(0);
      
      if (intervaloTempoRef.current) clearInterval(intervaloTempoRef.current);
      intervaloTempoRef.current = setInterval(() => {
        setTempoGravacao(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Erro ao acessar microfone:', err);
      toast.error('Erro de acesso', 'Não foi possível acessar o microfone. Verifique as permissões.');
    }
  };

  // Parar gravação de áudio
  const pararGravacao = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setGravandoId(null);
    if (intervaloTempoRef.current) {
      clearInterval(intervaloTempoRef.current);
      intervaloTempoRef.current = null;
    }
  };

  // Enviar áudio para a Edge Function
  const processarTranscricao = async (respostaId: string, base64Audio: string) => {
    setLoadingIA(prev => ({ ...prev, [respostaId]: 'transcrevendo' }));
    try {
      const { data, error } = await supabase.functions.invoke('ia-auditoria', {
        body: { action: 'transcribe', audio: base64Audio, format: 'webm' }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.text) {
        // Substituir totalmente o texto atual e disparar autosave
        handleTextareaChange(respostaId, data.text);
        toast.success('Áudio transcrito', 'O áudio foi transcrito com sucesso!');
      } else {
        toast.warning('Transcrição vazia', 'Não foi possível detectar falas no áudio.');
      }
    } catch (err: any) {
      console.error('Erro ao transcrever áudio:', err);
      let msg = err.message || 'Falha ao processar o áudio com IA.';
      if (err.context) {
        try {
          const body = await err.context.json();
          if (body?.error?.message) msg = body.error.message;
          else if (body?.error) msg = body.error;
        } catch (_) {}
      }
      toast.error('Erro na transcrição', msg);
    } finally {
      setLoadingIA(prev => ({ ...prev, [respostaId]: null }));
    }
  };

  // Solicitar resumo/refinamento com Gemini no Open Router
  const processarResumo = async (respostaId: string, textoAtual: string) => {
    if (!textoAtual.trim()) return;
    
    setLoadingIA(prev => ({ ...prev, [respostaId]: 'resumindo' }));
    try {
      const { data, error } = await supabase.functions.invoke('ia-auditoria', {
        body: { action: 'summarize', text: textoAtual }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.text) {
        // Abrir modal de revisão
        setRevisaoIA({
          respostaId,
          textoOriginal: textoAtual,
          textoMelhorado: data.text
        });
      } else {
        toast.warning('Melhoria vazia', 'A IA não retornou alterações para este texto.');
      }
    } catch (err: any) {
      console.error('Erro ao aprimorar texto:', err);
      let msg = err.message || 'Falha ao processar a melhoria do texto.';
      if (err.context) {
        try {
          const body = await err.context.json();
          if (body?.error?.message) msg = body.error.message;
          else if (body?.error) msg = body.error;
        } catch (_) {}
      }
      toast.error('Erro com IA', msg);
    } finally {
      setLoadingIA(prev => ({ ...prev, [respostaId]: null }));
    }
  };

  const aceitarRevisao = () => {
    if (!revisaoIA) return;
    handleTextareaChange(revisaoIA.respostaId, revisaoIA.textoMelhorado);
    setRevisaoIA(null);
    toast.success('Texto aprimorado', 'A resposta foi atualizada com a versão da IA!');
  };

  const refazerRevisao = async () => {
    if (!revisaoIA) return;
    const { respostaId, textoOriginal } = revisaoIA;
    setRevisaoIA(null);
    await processarResumo(respostaId, textoOriginal);
  };

  const cancelarRevisao = () => {
    setRevisaoIA(null);
  };

  // Formatar tempo (segundos) para mm:ss
  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Formatar data para exibição amigável
  const formatarDataAmigavel = (dataStr: string) => {
    const partes = dataStr.split('-');
    if (partes.length !== 3) return dataStr;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  // Normalizar array de exemplos que pode vir como string ou JSONB
  const normalizarExemplos = (exemplosRaw: any): string[] => {
    if (!exemplosRaw) return [];
    if (Array.isArray(exemplosRaw)) return exemplosRaw;
    try {
      const parsed = JSON.parse(exemplosRaw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  // Impedir datas futuras no input date
  const hojeString = obterDataHojeLocal();

  return (
    <div style={{ width: '100%' }}>
      {/* ─── TELA INICIAL: SELEÇÃO DE AUDITORIA ─── */}
      {!modeloAtivo && (
        <>
          {/* Seletor de data */}
          <div className="date-selector-container">
            <span className="date-label">Data da Auditoria:</span>
            
            <button 
              className={`quick-date-btn ${dataSelecionada === hojeString ? 'quick-date-btn-active' : ''}`}
              onClick={() => setDataSelecionada(hojeString)}
            >
              Hoje
            </button>
            
            <button 
              className={`quick-date-btn ${dataSelecionada === obterDataOntemLocal() ? 'quick-date-btn-active' : ''}`}
              onClick={() => setDataSelecionada(obterDataOntemLocal())}
            >
              Ontem
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="date"
                className="custom-date-input"
                value={dataSelecionada}
                max={hojeString}
                onChange={(e) => {
                  if (e.target.value) {
                    setDataSelecionada(e.target.value);
                  }
                }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
              Carregando auditorias diárias...
            </div>
          ) : (
            <div className="modelos-grid">
              {modelos.map((modelo) => {
                const entrada = entradas[modelo.id];
                const status = entrada?.status || 'nao_iniciado';

                return (
                  <div key={modelo.id} className="modelo-card">
                    <div className="modelo-card-header">
                      {status === 'concluido' && (
                        <span className="modelo-badge badge-concluido">Concluído</span>
                      )}
                      {status === 'rascunho' && (
                        <span className="modelo-badge badge-rascunho">Em Rascunho</span>
                      )}
                      {status === 'nao_iniciado' && (
                        <span className="modelo-badge badge-nao-iniciado">Não Iniciado</span>
                      )}

                      <h3 className="modelo-titulo">{modelo.nome}</h3>
                      <p className="modelo-desc">{modelo.descricao}</p>
                    </div>

                    <div className="modelo-footer">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        <Clock size={14} />
                        {status === 'concluido' && entrada.concluido_em ? (
                          <span>Concluído às {new Date(entrada.concluido_em).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        ) : (
                          <span>Diário</span>
                        )}
                      </div>

                      <Button 
                        variant={status === 'concluido' ? 'secondary' : 'primary'}
                        onClick={() => abrirAuditoria(modelo)}
                      >
                        {status === 'concluido' && 'Revisar'}
                        {status === 'rascunho' && 'Continuar'}
                        {status === 'nao_iniciado' && 'Começar'}
                      </Button>
                    </div>
                  </div>
                );
              })}

              {modelos.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                  <p>Nenhum modelo de auditoria ativo configurado.</p>
                  <p style={{ fontSize: '13px', marginTop: '8px' }}>Vá em "Configurações" no menu para criar ou ativar modelos.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ─── TELA DO FORMULÁRIO DE AUDITORIA ATIVA ─── */}
      {modeloAtivo && (
        <div className="auditoria-form-container">
          <div className="form-header">
            <div>
              <button onClick={fecharFormulario} style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
                <ArrowLeft size={16} /> Voltar para o menu
              </button>
              <h2 className="form-header-title">{modeloAtivo.nome}</h2>
            </div>
            
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <span className="form-header-date">Data: {formatarDataAmigavel(dataSelecionada)}</span>
              
              {/* Barra de Status do Autosave */}
              <div className="autosave-indicator">
                <span className={`autosave-dot autosave-dot-${saveStatus}`} />
                <span>
                  {saveStatus === 'salvo' && 'Todas as alterações salvas'}
                  {saveStatus === 'digitando' && 'Digitando...'}
                  {saveStatus === 'salvando' && 'Salvando no Supabase...'}
                  {saveStatus === 'erro' && 'Erro ao salvar!'}
                </span>
              </div>
            </div>
          </div>

          {loadingForm ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-muted)' }}>
              Carregando formulário e respostas...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {respostas.map((resposta) => {
                const exemplos = normalizarExemplos(resposta.exemplos_snapshot);
                const aberto = exibirExemplos[resposta.id] || false;

                return (
                  <div key={resposta.id} className="pergunta-field-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                      <span className="pergunta-texto">{resposta.texto_pergunta_snapshot}</span>
                      
                      <div className="pergunta-actions-group">
                        {/* Botão de Gravação de Áudio */}
                        {entradaAtiva?.status !== 'concluido' && (
                          <button
                            type="button"
                            className={`ia-action-btn record-btn ${gravandoId === resposta.id ? 'recording-active' : ''}`}
                            onClick={() => gravandoId === resposta.id ? pararGravacao() : iniciarGravacao(resposta.id)}
                            disabled={loadingIA[resposta.id] !== undefined && loadingIA[resposta.id] !== null}
                            title={gravandoId === resposta.id ? 'Parar gravação' : 'Gravar resposta por áudio'}
                          >
                            <Microphone size={16} weight={gravandoId === resposta.id ? 'fill' : 'regular'} />
                            {gravandoId === resposta.id ? (
                              <span className="record-timer">{formatarTempo(tempoGravacao)}</span>
                            ) : (
                              <span>Falar</span>
                            )}
                          </button>
                        )}

                        {/* Botão de Melhorar/Resumir com IA */}
                        {entradaAtiva?.status !== 'concluido' && resposta.texto_resposta.trim().length > 0 && (
                          <button
                            type="button"
                            className="ia-action-btn ai-enhance-btn"
                            onClick={() => processarResumo(resposta.id, resposta.texto_resposta)}
                            disabled={(loadingIA[resposta.id] !== undefined && loadingIA[resposta.id] !== null) || gravandoId !== null}
                            title="Aprimorar e estruturar resposta com IA"
                          >
                            <Sparkle size={16} weight="fill" />
                            <span>Melhorar</span>
                          </button>
                        )}

                        {/* Indicador de processamento da IA */}
                        {loadingIA[resposta.id] && (
                          <span className="ia-loading-indicator">
                            <span className="ia-loading-spinner" />
                            {loadingIA[resposta.id] === 'transcrevendo' ? 'Transcrevendo...' : 'Aprimorando...'}
                          </span>
                        )}

                        {exemplos.length > 0 && (
                          <button 
                            type="button"
                            className="exemplos-toggle-btn" 
                            onClick={() => toggleExemplos(resposta.id)}
                          >
                            <Question size={14} />
                            {aberto ? 'Fechar exemplos' : 'Ver exemplos'}
                            {aberto ? <CaretUp size={12} /> : <CaretDown size={12} />}
                          </button>
                        )}
                      </div>
                    </div>

                    {resposta.texto_ajuda_snapshot && (
                      <span className="pergunta-ajuda">{resposta.texto_ajuda_snapshot}</span>
                    )}

                    {aberto && exemplos.length > 0 && (
                      <div className="exemplos-container">
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', width: '100%', marginBottom: '4px', fontWeight: 600 }}>
                          Sugestões (clique para incluir na resposta):
                        </span>
                        {exemplos.map((ex, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="exemplo-badge"
                            onClick={() => handleAdicionarExemplo(resposta.id, ex, resposta.texto_resposta)}
                          >
                            {ex}
                          </button>
                        ))}
                      </div>
                    )}

                    <textarea
                      className="textarea-autosize"
                      placeholder="Comece a escrever aqui... Pressione Enter para novas linhas."
                      value={resposta.texto_resposta}
                      onChange={(e) => handleTextareaChange(resposta.id, e.target.value)}
                      disabled={entradaAtiva?.status === 'concluido' || (loadingIA[resposta.id] !== undefined && loadingIA[resposta.id] !== null) || gravandoId === resposta.id}
                    />
                  </div>
                );
              })}

              <div className="form-footer">
                <Button variant="secondary" onClick={fecharFormulario}>
                  Voltar
                </Button>

                {entradaAtiva?.status !== 'concluido' ? (
                  <Button variant="primary" onClick={handleConcluir}>
                    <CheckCircle size={18} weight="bold" /> Concluir Auditoria
                  </Button>
                ) : (
                  <span style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                    <CheckCircle size={20} weight="fill" /> Esta auditoria está concluída
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal de Revisão da IA */}
      <Modal
        open={revisaoIA !== null}
        onClose={cancelarRevisao}
        title="Revisar Melhoria com IA"
        size="lg"
        footer={
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="secondary" onClick={cancelarRevisao}>
              Descartar
            </Button>
            <Button variant="secondary" onClick={refazerRevisao} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={16} /> Tentar Novamente
            </Button>
            <Button variant="primary" onClick={aceitarRevisao} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} weight="bold" /> Aceitar e Substituir
            </Button>
          </div>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', minWidth: '280px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>
              Texto Original
            </span>
            <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-secondary)', border: '1px solid var(--color-border)', minHeight: '150px', maxHeight: '300px', overflowY: 'auto', whiteSpace: 'pre-wrap', fontSize: 'var(--font-size-md)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              {revisaoIA?.textoOriginal}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
              Versão Melhorada (IA em 1ª Pessoa)
            </span>
            <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(139, 92, 246, 0.05)', border: '1px solid var(--color-primary)', minHeight: '150px', maxHeight: '300px', overflowY: 'auto', whiteSpace: 'pre-wrap', fontSize: 'var(--font-size-md)', color: 'var(--color-text)', lineHeight: 1.6 }}>
              {revisaoIA?.textoMelhorado}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
