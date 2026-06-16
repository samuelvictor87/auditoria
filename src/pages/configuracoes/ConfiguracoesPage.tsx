import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { 
  Plus, 
  Pencil, 
  Eye, 
  EyeSlash
} from '@phosphor-icons/react';
import '../../styles/components/configuracoes.css';
import '../../styles/components/input.css';
import '../../styles/components/textarea.css';

interface Modelo {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  ordem_exibicao: number;
}

interface Pergunta {
  id: string;
  modelo_id: string;
  texto_pergunta: string;
  texto_ajuda: string;
  exemplos: any;
  ordem_exibicao: number;
  ativo: boolean;
}

export function ConfiguracoesPage() {
  const toast = useToast();
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [modeloAtivo, setModeloAtivo] = useState<Modelo | null>(null);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPerguntas, setLoadingPerguntas] = useState(false);

  // Modais
  const [showModeloModal, setShowModeloModal] = useState(false);
  const [editingModelo, setEditingModelo] = useState<Modelo | null>(null);
  
  const [showPerguntaModal, setShowPerguntaModal] = useState(false);
  const [editingPergunta, setEditingPergunta] = useState<Pergunta | null>(null);

  // Formulário do Modelo
  const [modeloNome, setModeloNome] = useState('');
  const [modeloDesc, setModeloDesc] = useState('');
  const [modeloAtivoVal, setModeloAtivoVal] = useState(true);

  // Formulário da Pergunta
  const [perguntaTexto, setPerguntaTexto] = useState('');
  const [perguntaAjuda, setPerguntaAjuda] = useState('');
  const [perguntaExemplosRaw, setPerguntaExemplosRaw] = useState(''); // Textarea separado por quebras de linha
  const [perguntaOrdem, setPerguntaOrdem] = useState(0);
  const [perguntaAtivoVal, setPerguntaAtivoVal] = useState(true);

  useEffect(() => {
    carregarModelos();
  }, []);

  useEffect(() => {
    if (modeloAtivo) {
      carregarPerguntas(modeloAtivo.id);
    } else {
      setPerguntas([]);
    }
  }, [modeloAtivo]);

  const carregarModelos = async (selecionarId?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('modelos_auditoria')
        .select('*')
        .order('ordem_exibicao', { ascending: true });

      if (error) throw error;
      
      const modelosCarregados = data || [];
      setModelos(modelosCarregados);

      // Definir modelo ativo na tela
      if (modelosCarregados.length > 0) {
        if (selecionarId) {
          const mod = modelosCarregados.find(m => m.id === selecionarId);
          setModeloAtivo(mod || modelosCarregados[0]);
        } else if (!modeloAtivo) {
          setModeloAtivo(modelosCarregados[0]);
        } else {
          // Manter o que já estava selecionado se ele ainda existir
          const mod = modelosCarregados.find(m => m.id === modeloAtivo.id);
          setModeloAtivo(mod || modelosCarregados[0]);
        }
      } else {
        setModeloAtivo(null);
      }
    } catch (err) {
      console.error('Erro ao carregar modelos:', err);
    } finally {
      setLoading(false);
    }
  };

  const carregarPerguntas = async (modeloId: string) => {
    setLoadingPerguntas(true);
    try {
      const { data, error } = await supabase
        .from('perguntas_auditoria')
        .select('*')
        .eq('modelo_id', modeloId)
        .order('ordem_exibicao', { ascending: true });

      if (error) throw error;
      setPerguntas(data || []);
    } catch (err) {
      console.error('Erro ao carregar perguntas:', err);
    } finally {
      setLoadingPerguntas(false);
    }
  };

  // Salvar / Criar Modelo
  const handleSaveModelo = async (e: FormEvent) => {
    e.preventDefault();
    if (!modeloNome.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Não autenticado');

      if (editingModelo) {
        // Atualizar
        const { error } = await supabase
          .from('modelos_auditoria')
          .update({
            nome: modeloNome,
            descricao: modeloDesc,
            ativo: modeloAtivoVal
          })
          .eq('id', editingModelo.id);

        if (error) throw error;
        await carregarModelos(editingModelo.id);
      } else {
        // Criar
        const { data, error } = await supabase
          .from('modelos_auditoria')
          .insert({
            usuario_id: user.id,
            nome: modeloNome,
            descricao: modeloDesc,
            ativo: modeloAtivoVal,
            ordem_exibicao: modelos.length
          })
          .select()
          .single();

        if (error) throw error;
        await carregarModelos(data.id);
      }
      setShowModeloModal(false);
      toast.success('Sucesso', 'Modelo de auditoria salvo com sucesso.');
    } catch (err: any) {
      console.error('Erro ao salvar modelo:', err);
      toast.error('Erro ao salvar', err.message || 'Erro ao salvar modelo.');
    }
  };

  // Salvar / Criar Pergunta
  const handleSavePergunta = async (e: FormEvent) => {
    e.preventDefault();
    if (!modeloAtivo || !perguntaTexto.trim()) return;

    // Converter quebras de linha em array JSONB para os exemplos
    const exemplosArr = perguntaExemplosRaw
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    try {
      if (editingPergunta) {
        // Editar
        const { error } = await supabase
          .from('perguntas_auditoria')
          .update({
            texto_pergunta: perguntaTexto,
            texto_ajuda: perguntaAjuda,
            exemplos: exemplosArr,
            ordem_exibicao: perguntaOrdem,
            ativo: perguntaAtivoVal
          })
          .eq('id', editingPergunta.id);

        if (error) throw error;
      } else {
        // Criar nova
        const { error } = await supabase
          .from('perguntas_auditoria')
          .insert({
            modelo_id: modeloAtivo.id,
            texto_pergunta: perguntaTexto,
            texto_ajuda: perguntaAjuda,
            exemplos: exemplosArr,
            ordem_exibicao: perguntas.length,
            ativo: perguntaAtivoVal
          });

        if (error) throw error;
      }
      
      setShowPerguntaModal(false);
      carregarPerguntas(modeloAtivo.id);
      toast.success('Sucesso', 'Pergunta salva com sucesso.');
    } catch (err: any) {
      console.error('Erro ao salvar pergunta:', err);
      toast.error('Erro ao salvar', err.message || 'Erro ao salvar pergunta.');
    }
  };

  // Soft delete / Toggle status ativo do Modelo
  const toggleAtivoModelo = async (modelo: Modelo) => {
    try {
      const { error } = await supabase
        .from('modelos_auditoria')
        .update({ ativo: !modelo.ativo })
        .eq('id', modelo.id);
      if (error) throw error;
      carregarModelos(modelo.id);
    } catch (err) {
      console.error(err);
    }
  };

  // Soft delete / Toggle status ativo de Pergunta
  const toggleAtivoPergunta = async (pergunta: Pergunta) => {
    try {
      const { error } = await supabase
        .from('perguntas_auditoria')
        .update({ ativo: !pergunta.ativo })
        .eq('id', pergunta.id);
      if (error) throw error;
      if (modeloAtivo) carregarPerguntas(modeloAtivo.id);
    } catch (err) {
      console.error(err);
    }
  };

  const openNewModeloModal = () => {
    setEditingModelo(null);
    setModeloNome('');
    setModeloDesc('');
    setModeloAtivoVal(true);
    setShowModeloModal(true);
  };

  const openEditModeloModal = (modelo: Modelo) => {
    setEditingModelo(modelo);
    setModeloNome(modelo.nome);
    setModeloDesc(modelo.descricao);
    setModeloAtivoVal(modelo.ativo);
    setShowModeloModal(true);
  };

  const openNewPerguntaModal = () => {
    setEditingPergunta(null);
    setPerguntaTexto('');
    setPerguntaAjuda('');
    setPerguntaExemplosRaw('');
    setPerguntaOrdem(perguntas.length);
    setPerguntaAtivoVal(true);
    setShowPerguntaModal(true);
  };

  const openEditPerguntaModal = (pergunta: Pergunta) => {
    setEditingPergunta(pergunta);
    setPerguntaTexto(pergunta.texto_pergunta);
    setPerguntaAjuda(pergunta.texto_ajuda || '');
    
    // Normalizar exemplos
    let exemplosArray: string[] = [];
    if (Array.isArray(pergunta.exemplos)) {
      exemplosArray = pergunta.exemplos;
    } else if (pergunta.exemplos) {
      try {
        const parsed = JSON.parse(pergunta.exemplos);
        if (Array.isArray(parsed)) exemplosArray = parsed;
      } catch (e) {}
    }
    setPerguntaExemplosRaw(exemplosArray.join('\n'));
    setPerguntaOrdem(pergunta.ordem_exibicao);
    setPerguntaAtivoVal(pergunta.ativo);
    setShowPerguntaModal(true);
  };

  return (
    <div style={{ width: '100%' }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-muted)' }}>
          Carregando configurações...
        </div>
      ) : (
        <div className="config-container">
          {/* BARRA LATERAL: MODELOS */}
          <div className="config-sidebar">
            <div className="config-sidebar-title">
              <span>Modelos</span>
              <Button variant="primary" size="sm" onClick={openNewModeloModal} style={{ padding: '0 8px', height: '28px' }}>
                <Plus size={16} /> Novo
              </Button>
            </div>

            <div className="config-modelos-list">
              {modelos.map(m => (
                <button
                  key={m.id}
                  className={`config-modelo-item ${modeloAtivo?.id === m.id ? 'config-modelo-item-active' : ''}`}
                  onClick={() => setModeloAtivo(m)}
                >
                  <span className="config-modelo-item-name">{m.nome}</span>
                  <span className="config-modelo-item-status">
                    {m.ativo ? 'Ativo' : 'Inativo'} • {m.ordem_exibicao + 1}ª posição
                  </span>
                </button>
              ))}

              {modelos.length === 0 && (
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'center', padding: '16px' }}>
                  Nenhum modelo cadastrado.
                </div>
              )}
            </div>
          </div>

          {/* PAINEL CENTRAL: PERGUNTAS DO MODELO SELECIONADO */}
          <div className="config-main-panel">
            {modeloAtivo ? (
              <>
                <div className="config-panel-header">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <h2 className="config-panel-title">{modeloAtivo.nome}</h2>
                      <span className={`modelo-badge ${modeloAtivo.ativo ? 'badge-concluido' : 'badge-nao-iniciado'}`} style={{ marginBottom: 0 }}>
                        {modeloAtivo.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <p className="config-panel-desc">{modeloAtivo.descricao}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant="secondary" size="sm" onClick={() => openEditModeloModal(modeloAtivo)}>
                      <Pencil size={14} /> Editar Modelo
                    </Button>
                    
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => toggleAtivoModelo(modeloAtivo)}
                      style={{ color: modeloAtivo.ativo ? 'var(--color-destructive)' : 'var(--color-success)' }}
                    >
                      {modeloAtivo.ativo ? <EyeSlash size={14} /> : <Eye size={14} />}
                      {modeloAtivo.ativo ? 'Desativar' : 'Ativar'}
                    </Button>
                  </div>
                </div>

                {/* Lista de perguntas do modelo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--color-text)' }}>Perguntas do Modelo</h3>
                    <Button variant="primary" size="sm" onClick={openNewPerguntaModal}>
                      <Plus size={16} /> Adicionar Pergunta
                    </Button>
                  </div>

                  {loadingPerguntas ? (
                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--color-text-muted)' }}>
                      Carregando perguntas...
                    </div>
                  ) : (
                    <div className="config-perguntas-list">
                      {perguntas.map(p => (
                        <div key={p.id} className="config-pergunta-card" style={{ opacity: p.ativo ? 1 : 0.6 }}>
                          <div className="config-pergunta-info">
                            <span className="config-pergunta-texto">
                              {p.ordem_exibicao + 1}. {p.texto_pergunta}
                            </span>
                            
                            {p.texto_ajuda && (
                              <span className="config-pergunta-ajuda">{p.texto_ajuda}</span>
                            )}

                            {Array.isArray(p.exemplos) && p.exemplos.length > 0 && (
                              <span className="config-pergunta-exemplos">
                                <strong>Sugestões:</strong> {p.exemplos.join(', ')}
                              </span>
                            )}
                          </div>

                          <div className="config-pergunta-actions">
                            <button 
                              onClick={() => openEditPerguntaModal(p)} 
                              style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}
                              title="Editar Pergunta"
                            >
                              <Pencil size={18} />
                            </button>

                            <button 
                              onClick={() => toggleAtivoPergunta(p)} 
                              style={{ color: p.ativo ? 'var(--color-text-muted)' : 'var(--color-success)', cursor: 'pointer' }}
                              title={p.ativo ? 'Inativar Pergunta' : 'Ativar Pergunta'}
                            >
                              {p.ativo ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      ))}

                      {perguntas.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '32px', backgroundColor: 'var(--color-surface-secondary)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)' }}>
                          Nenhuma pergunta cadastrada para este modelo de auditoria.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-muted)' }}>
                Selecione ou crie um modelo de auditoria à esquerda para ver suas perguntas.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MODAL: CRIAR / EDITAR MODELO ─── */}
      {showModeloModal && (
        <div className="modal-form-overlay">
          <form className="modal-form-card" onSubmit={handleSaveModelo}>
            <h3 className="modal-form-title">
              {editingModelo ? 'Editar Modelo' : 'Criar Novo Modelo'}
            </h3>

            <div className="input-wrapper">
              <label className="input-label input-label-required" htmlFor="modeloNome">Nome do Modelo</label>
              <input
                id="modeloNome"
                type="text"
                className="input-field"
                placeholder="Ex: Auditoria Diante de Deus"
                value={modeloNome}
                onChange={e => setModeloNome(e.target.value)}
                required
              />
            </div>

            <div className="textarea-wrapper">
              <label className="textarea-label" htmlFor="modeloDesc">Descrição / Objetivo</label>
              <textarea
                id="modeloDesc"
                className="textarea-field"
                placeholder="Para que serve este modelo de auditoria diária?"
                value={modeloDesc}
                onChange={e => setModeloDesc(e.target.value)}
                rows={3}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                id="modeloAtivoVal"
                type="checkbox"
                checked={modeloAtivoVal}
                onChange={e => setModeloAtivoVal(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
              />
              <label htmlFor="modeloAtivoVal" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                Modelo Ativo
              </label>
            </div>

            <div className="modal-form-footer">
              <Button type="button" variant="secondary" onClick={() => setShowModeloModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ─── MODAL: CRIAR / EDITAR PERGUNTA ─── */}
      {showPerguntaModal && (
        <div className="modal-form-overlay">
          <form className="modal-form-card" onSubmit={handleSavePergunta} style={{ maxWidth: '600px' }}>
            <h3 className="modal-form-title">
              {editingPergunta ? 'Editar Pergunta' : 'Nova Pergunta'}
            </h3>

            <div className="input-wrapper">
              <label className="input-label input-label-required" htmlFor="perguntaTexto">Texto da Pergunta</label>
              <input
                id="perguntaTexto"
                type="text"
                className="input-field"
                placeholder="Ex: Onde eu não me pareci com Cristo hoje?"
                value={perguntaTexto}
                onChange={e => setPerguntaTexto(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <label className="input-label" htmlFor="perguntaAjuda">Texto de Ajuda / Orientação</label>
              <input
                id="perguntaAjuda"
                type="text"
                className="input-field"
                placeholder="Ex: Essa pergunta olha para as atitudes e reações..."
                value={perguntaAjuda}
                onChange={e => setPerguntaAjuda(e.target.value)}
              />
            </div>

            <div className="textarea-wrapper">
              <label className="textarea-label" htmlFor="perguntaExemplos">Dicas / Exemplos de Resposta (um por linha)</label>
              <textarea
                id="perguntaExemplos"
                className="textarea-field"
                placeholder="Digite cada sugestão em uma linha nova&#10;Ex: Fui impaciente com alguém.&#10;Ex: Respondi de forma dura."
                value={perguntaExemplosRaw}
                onChange={e => setPerguntaExemplosRaw(e.target.value)}
                rows={4}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="input-wrapper">
                <label className="input-label" htmlFor="perguntaOrdem">Ordem de Exibição</label>
                <input
                  id="perguntaOrdem"
                  type="number"
                  className="input-field"
                  value={perguntaOrdem}
                  onChange={e => setPerguntaOrdem(parseInt(e.target.value, 10) || 0)}
                  min={0}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px' }}>
                <input
                  id="perguntaAtivoVal"
                  type="checkbox"
                  checked={perguntaAtivoVal}
                  onChange={e => setPerguntaAtivoVal(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                />
                <label htmlFor="perguntaAtivoVal" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                  Pergunta Ativa
                </label>
              </div>
            </div>

            <div className="modal-form-footer">
              <Button type="button" variant="secondary" onClick={() => setShowPerguntaModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
