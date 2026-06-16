-- =========================================================================
-- SCRIPT DE CONFIGURAÇÃO DO BANCO DE DADOS (SCHEMA, PERMISSÕES E MODELOS)
-- =========================================================================
-- Instruções: Copie todo o conteúdo deste arquivo e execute-o no
-- painel do Supabase -> SQL Editor do seu projeto (Assistente Pessoal).
-- =========================================================================

-- 1. ESTRUTURA DO SCHEMA E TABELAS (Caso ainda não existam ou precisem de ajuste)
CREATE SCHEMA IF NOT EXISTS auditoria;

-- Tabela de Perfis de Usuário
CREATE TABLE IF NOT EXISTS auditoria.perfis (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  nome_completo text,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

-- Modelos de Auditoria
CREATE TABLE IF NOT EXISTS auditoria.modelos_auditoria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES auditoria.perfis(id) ON DELETE CASCADE,
  nome text NOT NULL,
  identificador text,
  descricao text,
  ordem_exibicao integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  arquivado_em timestamptz,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

-- Perguntas dos Modelos
CREATE TABLE IF NOT EXISTS auditoria.perguntas_auditoria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  modelo_id uuid NOT NULL REFERENCES auditoria.modelos_auditoria(id) ON DELETE CASCADE,
  texto_pergunta text NOT NULL,
  texto_ajuda text,
  exemplos jsonb NOT NULL DEFAULT '[]'::jsonb,
  ordem_exibicao integer NOT NULL DEFAULT 0,
  obrigatorio boolean NOT NULL DEFAULT true,
  ativo boolean NOT NULL DEFAULT true,
  arquivado_em timestamptz,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

-- Entradas Diárias de Auditoria
CREATE TABLE IF NOT EXISTS auditoria.entradas_auditoria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES auditoria.perfis(id) ON DELETE CASCADE,
  modelo_id uuid REFERENCES auditoria.modelos_auditoria(id) ON DELETE SET NULL,
  data_entrada date NOT NULL,
  status text NOT NULL DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'concluido')),
  nome_modelo_snapshot text NOT NULL,
  descricao_modelo_snapshot text,
  concluido_em timestamptz,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

-- Unicidade de Auditoria por dia/tipo por usuário
CREATE UNIQUE INDEX IF NOT EXISTS entradas_auditoria_unicidade_dia_modelo
ON auditoria.entradas_auditoria(usuario_id, modelo_id, data_entrada)
WHERE modelo_id IS NOT NULL;

-- Respostas das Perguntas (Snapshot das Perguntas)
CREATE TABLE IF NOT EXISTS auditoria.respostas_auditoria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entrada_id uuid NOT NULL REFERENCES auditoria.entradas_auditoria(id) ON DELETE CASCADE,
  pergunta_modelo_id uuid REFERENCES auditoria.perguntas_auditoria(id) ON DELETE SET NULL,
  texto_pergunta_snapshot text NOT NULL,
  texto_ajuda_snapshot text,
  exemplos_snapshot jsonb NOT NULL DEFAULT '[]'::jsonb,
  texto_resposta text,
  ordem_exibicao integer NOT NULL DEFAULT 0,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

-- Habilitar RLS nas tabelas
ALTER TABLE auditoria.perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria.modelos_auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria.perguntas_auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria.entradas_auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria.respostas_auditoria ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS (Caso não existam)
DO $$
BEGIN
  -- Perfis
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Acesso ao perfil próprio') THEN
    CREATE POLICY "Acesso ao perfil próprio" ON auditoria.perfis FOR SELECT USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Atualização do perfil próprio') THEN
    CREATE POLICY "Atualização do perfil próprio" ON auditoria.perfis FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Inserção do perfil próprio') THEN
    CREATE POLICY "Inserção do perfil próprio" ON auditoria.perfis FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;

  -- Modelos de Auditoria
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Gerenciar modelos próprios') THEN
    CREATE POLICY "Gerenciar modelos próprios" ON auditoria.modelos_auditoria FOR ALL USING (auth.uid() = usuario_id) WITH CHECK (auth.uid() = usuario_id);
  END IF;

  -- Perguntas dos Modelos
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Gerenciar perguntas de modelos próprios') THEN
    CREATE POLICY "Gerenciar perguntas de modelos próprios" ON auditoria.perguntas_auditoria FOR ALL USING (
      EXISTS (
        SELECT 1 FROM auditoria.modelos_auditoria m
        WHERE m.id = perguntas_auditoria.modelo_id AND m.usuario_id = auth.uid()
      )
    ) WITH CHECK (
      EXISTS (
        SELECT 1 FROM auditoria.modelos_auditoria m
        WHERE m.id = perguntas_auditoria.modelo_id AND m.usuario_id = auth.uid()
      )
    );
  END IF;

  -- Entradas de Auditoria
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Gerenciar entradas de auditoria próprias') THEN
    CREATE POLICY "Gerenciar entradas de auditoria próprias" ON auditoria.entradas_auditoria FOR ALL USING (auth.uid() = usuario_id) WITH CHECK (auth.uid() = usuario_id);
  END IF;

  -- Respostas das Auditorias
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Gerenciar respostas de auditorias próprias') THEN
    CREATE POLICY "Gerenciar respostas de auditorias próprias" ON auditoria.respostas_auditoria FOR ALL USING (
      EXISTS (
        SELECT 1 FROM auditoria.entradas_auditoria e
        WHERE e.id = respostas_auditoria.entrada_id AND e.usuario_id = auth.uid()
      )
    ) WITH CHECK (
      EXISTS (
        SELECT 1 FROM auditoria.entradas_auditoria e
        WHERE e.id = respostas_auditoria.entrada_id AND e.usuario_id = auth.uid()
      )
    );
  END IF;
END $$;

-- Triggers de timestamp
CREATE OR REPLACE FUNCTION auditoria.atualizar_coluna_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  new.atualizado_em = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_perfis_atualizado_em ON auditoria.perfis;
CREATE TRIGGER set_perfis_atualizado_em BEFORE UPDATE ON auditoria.perfis FOR EACH ROW EXECUTE FUNCTION auditoria.atualizar_coluna_atualizado_em();

DROP TRIGGER IF EXISTS set_modelos_auditoria_atualizado_em ON auditoria.modelos_auditoria;
CREATE TRIGGER set_modelos_auditoria_atualizado_em BEFORE UPDATE ON auditoria.modelos_auditoria FOR EACH ROW EXECUTE FUNCTION auditoria.atualizar_coluna_atualizado_em();

DROP TRIGGER IF EXISTS set_perguntas_auditoria_atualizado_em ON auditoria.perguntas_auditoria;
CREATE TRIGGER set_perguntas_auditoria_atualizado_em BEFORE UPDATE ON auditoria.perguntas_auditoria FOR EACH ROW EXECUTE FUNCTION auditoria.atualizar_coluna_atualizado_em();

DROP TRIGGER IF EXISTS set_entradas_auditoria_atualizado_em ON auditoria.entradas_auditoria;
CREATE TRIGGER set_entradas_auditoria_atualizado_em BEFORE UPDATE ON auditoria.entradas_auditoria FOR EACH ROW EXECUTE FUNCTION auditoria.atualizar_coluna_atualizado_em();

DROP TRIGGER IF EXISTS set_respostas_auditoria_atualizado_em ON auditoria.respostas_auditoria;
CREATE TRIGGER set_respostas_auditoria_atualizado_em BEFORE UPDATE ON auditoria.respostas_auditoria FOR EACH ROW EXECUTE FUNCTION auditoria.atualizar_coluna_atualizado_em();

-- Função RPC: criar_auditoria_diaria
CREATE OR REPLACE FUNCTION auditoria.criar_auditoria_diaria(
  p_modelo_id uuid,
  p_data_entrada date
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auditoria
AS $$
DECLARE
  v_usuario_id uuid;
  v_entrada_id uuid;
  v_modelo_nome text;
  v_modelo_desc text;
BEGIN
  v_usuario_id := auth.uid();
  IF v_usuario_id IS NULL THEN
    RAISE EXCEPTION 'Não autorizado';
  END IF;

  SELECT nome, descricao INTO v_modelo_nome, v_modelo_desc
  FROM auditoria.modelos_auditoria
  WHERE id = p_modelo_id AND usuario_id = v_usuario_id AND ativo = true;

  IF v_modelo_nome IS NULL THEN
    RAISE EXCEPTION 'Modelo de auditoria não encontrado ou inativo';
  END IF;

  SELECT id INTO v_entrada_id
  FROM auditoria.entradas_auditoria
  WHERE usuario_id = v_usuario_id AND modelo_id = p_modelo_id AND data_entrada = p_data_entrada;

  IF v_entrada_id IS NULL THEN
    INSERT INTO auditoria.entradas_auditoria (
      usuario_id,
      modelo_id,
      data_entrada,
      status,
      nome_modelo_snapshot,
      descricao_modelo_snapshot
    )
    VALUES (
      v_usuario_id,
      p_modelo_id,
      p_data_entrada,
      'rascunho',
      v_modelo_nome,
      v_modelo_desc
    )
    RETURNING id INTO v_entrada_id;

    INSERT INTO auditoria.respostas_auditoria (
      entrada_id,
      pergunta_modelo_id,
      texto_pergunta_snapshot,
      texto_ajuda_snapshot,
      exemplos_snapshot,
      ordem_exibicao,
      texto_resposta
    )
    SELECT
      v_entrada_id,
      q.id,
      q.texto_pergunta,
      q.texto_ajuda,
      q.exemplos,
      q.ordem_exibicao,
      ''
    FROM auditoria.perguntas_auditoria q
    WHERE q.modelo_id = p_modelo_id AND q.ativo = true
    ORDER BY q.ordem_exibicao ASC;
  END IF;

  RETURN v_entrada_id;
END;
$$;


-- =========================================================================
-- 2. CORREÇÃO DE PERMISSÕES (GRANT E POLICIES NO POSTGRESQL)
-- =========================================================================
-- Concede permissões para as roles do Supabase acessarem o schema e tabelas
GRANT USAGE ON SCHEMA auditoria TO authenticated;
GRANT USAGE ON SCHEMA auditoria TO anon;
GRANT USAGE ON SCHEMA auditoria TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA auditoria TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA auditoria TO service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA auditoria TO anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA auditoria GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA auditoria GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA auditoria GRANT SELECT ON TABLES TO anon;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA auditoria TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA auditoria TO service_role;

-- Se o seu projeto usa Views no schema 'public' para expor o schema 'auditoria',
-- garante que essas views também têm as devidas permissões:
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon;


-- =========================================================================
-- 3. SEED DOS MODELOS E PERGUNTAS INICIAIS DO USUÁRIO
-- =========================================================================
-- Insere os modelos e perguntas padrão para o email samuelvictor87@hotmail.com
DO $$
DECLARE
  v_usuario_id uuid;
  v_modelo_deus_id uuid;
  v_modelo_realidade_id uuid;
  v_count integer;
BEGIN
  -- 1. Obter o ID do usuário através do e-mail no auth.users
  SELECT id INTO v_usuario_id
  FROM auth.users
  WHERE email = 'samuelvictor87@hotmail.com'
  LIMIT 1;

  IF v_usuario_id IS NULL THEN
    RAISE NOTICE 'Usuário samuelvictor87@hotmail.com não encontrado. Crie a conta no app primeiro.';
    RETURN;
  END IF;

  -- Sincronizar o perfil na tabela auditoria.perfis
  INSERT INTO auditoria.perfis (id, email, nome_completo)
  VALUES (v_usuario_id, 'samuelvictor87@hotmail.com', 'Samuel Victor')
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email;

  -- 2. MODELO: Diante de Deus
  SELECT id INTO v_modelo_deus_id
  FROM auditoria.modelos_auditoria
  WHERE usuario_id = v_usuario_id AND identificador = 'diante-de-deus'
  LIMIT 1;

  IF v_modelo_deus_id IS NULL THEN
    v_modelo_deus_id := gen_random_uuid();
    INSERT INTO auditoria.modelos_auditoria (id, usuario_id, nome, identificador, descricao, ordem_exibicao, ativo)
    VALUES (
      v_modelo_deus_id,
      v_usuario_id,
      'Auditoria Diária Diante de Deus',
      'diante-de-deus',
      'Uma prática diária para revisar o coração, as atitudes, os relacionamentos e a obediência diante de Deus. Não é sobre autocondenação ou perfeccionismo religioso, mas sobre parar no fim do dia e perguntar com sinceridade: "Senhor, onde hoje eu não vivi como alguém que pertence a Ti?". A ideia é transformar cada dia em discipulado, permitindo que Deus revele o que precisa ser corrigido, confessado, abandonado ou amadurecido.',
      0,
      true
    );
  END IF;

  -- Perguntas Diante de Deus
  -- Pergunta 1
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_deus_id AND ordem_exibicao = 0;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_deus_id, 'Onde eu não me pareci com Cristo hoje?', 'Essa pergunta olha para as atitudes, palavras, decisões e reações do dia. O objetivo é identificar momentos em que meu comportamento não refletiu o caráter de Cristo, como mansidão, domínio próprio, paciência, amor, humildade e verdade.', '["Fui impaciente com alguém.", "Respondi de forma dura.", "Agi por orgulho.", "Fugi de uma responsabilidade.", "Quis aparecer.", "Falei mais do que deveria.", "Não tive domínio próprio."]'::jsonb, 0, true);
  END IF;

  -- Pergunta 2
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_deus_id AND ordem_exibicao = 1;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_deus_id, 'O que estava governando meu coração naquele momento?', 'Essa pergunta busca a raiz por trás da atitude. Não basta perceber o comportamento errado; é necessário entender o que estava dominando o coração naquele momento: orgulho, medo, ansiedade, vaidade, preguiça, inveja, desejo de controle, comparação ou necessidade de aprovação.', '["Fui impaciente porque queria controlar tudo.", "Procrastinei porque estava com medo de falhar.", "Falei demais porque queria reconhecimento.", "Me comparei porque busquei valor fora de Deus.", "Reagi mal porque meu orgulho foi ferido."]'::jsonb, 1, true);
  END IF;

  -- Pergunta 3
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_deus_id AND ordem_exibicao = 2;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_deus_id, 'Que responsabilidade Deus colocou diante de mim hoje e como eu tratei?', 'Essa pergunta olha para a mordomia diária. Deus coloca tempo, trabalho, família, corpo, dons, dinheiro, oportunidades, tarefas e pessoas nas minhas mãos. A pergunta é se fui fiel com aquilo que recebi hoje.', '["Eu tinha uma tarefa importante, mas enrolei.", "Eu tinha tempo para orar, mas fui direto para o celular.", "Eu tinha uma conversa importante para resolver, mas evitei.", "Eu poderia servir alguém, mas pensei só em mim.", "Eu negligenciei meu corpo, minha casa, meu trabalho ou minha família."]'::jsonb, 2, true);
  END IF;

  -- Pergunta 4
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_deus_id AND ordem_exibicao = 3;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_deus_id, 'Quem eu abençoei, feri ou negligenciei hoje?', 'Essa pergunta olha para os relacionamentos. Às vezes medimos o dia apenas por produtividade, mas Deus também observa como tratamos as pessoas. O objetivo é perceber se fui presente, paciente, humilde, manso, generoso e disposto a perdoar.', '["Fui presente ou indiferente?", "Escutei ou só quis falar?", "Servi ou só cobrei?", "Descarreguei meu estresse em alguém?", "Preciso pedir perdão para alguém?", "Deixei de honrar alguém que deveria honrar."]'::jsonb, 3, true);
  END IF;

  -- Pergunta 5
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_deus_id AND ordem_exibicao = 4;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_deus_id, 'O que eu preciso confessar, abandonar ou corrigir amanhã?', 'Essa pergunta transforma reflexão em arrependimento prático. Não é apenas perceber o erro, mas responder com uma atitude concreta. Arrependimento verdadeiro não termina apenas em sentimento; ele vira mudança de direção.', '["Vou pedir perdão para alguém.", "Vou começar o dia orando antes de pegar o celular.", "Vou resolver uma pendência que estou evitando.", "Vou falar com mais mansidão.", "Vou abandonar uma comparação.", "Vou cortar algo que está me enfraquecendo espiritualmente."]'::jsonb, 4, true);
  END IF;


  -- 3. MODELO: Realidade e Produtividade
  SELECT id INTO v_modelo_realidade_id
  FROM auditoria.modelos_auditoria
  WHERE usuario_id = v_usuario_id AND identificador = 'realidade-e-produtividade'
  LIMIT 1;

  IF v_modelo_realidade_id IS NULL THEN
    v_modelo_realidade_id := gen_random_uuid();
    INSERT INTO auditoria.modelos_auditoria (id, usuario_id, nome, identificador, descricao, ordem_exibicao, ativo)
    VALUES (
      v_modelo_realidade_id,
      v_usuario_id,
      'Auditoria Diária da Realidade e Produtividade',
      'realidade-e-produtividade',
      'Uma prática diária para revisar trabalho, estudo, saúde, performance, dinheiro e evolução pessoal. A ideia é responder com honestidade: "Hoje eu avancei de verdade ou só estive ocupado?". Essa auditoria serve para enxergar onde houve progresso real, onde houve desperdício de tempo e energia, quais suposições estavam erradas e qual ajuste prático precisa ser feito amanhã.',
      1,
      true
    );
  END IF;

  -- Perguntas Realidade e Produtividade
  -- Pergunta 1
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_realidade_id AND ordem_exibicao = 0;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_realidade_id, 'Qual foi o avanço real de hoje?', 'Essa pergunta separa ocupação de progresso. O objetivo não é listar tudo que foi feito, mas identificar o que realmente contou e moveu a vida para frente em trabalho, estudo, saúde, finanças ou desenvolvimento pessoal.', '["Entreguei uma parte importante do projeto.", "Resolvi um problema que estava travando.", "Estudei praticando, não apenas assistindo.", "Fiz exercícios.", "Organizei uma pendência financeira.", "Melhorei um processo.", "Criei algo que pode gerar resultado depois."]'::jsonb, 0, true);
  END IF;

  -- Pergunta 2
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_realidade_id AND ordem_exibicao = 1;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_realidade_id, 'Onde eu desperdicei tempo, energia ou atenção?', 'Essa pergunta identifica vazamentos de foco e execução. Muitas vezes o problema não é falta de capacidade, mas dispersão, distração, perfeccionismo em coisas pequenas ou falta de prioridade.', '["Fiquei pulando de tarefa em tarefa.", "Comecei o dia sem definir prioridade.", "Passei tempo demais no celular.", "Consumi conteúdo em vez de praticar.", "Fui perfeccionista em algo pequeno.", "Respondi mensagens o tempo todo e não entrei em trabalho profundo.", "Deixei uma tarefa simples virar uma bola de neve."]'::jsonb, 1, true);
  END IF;

  -- Pergunta 3
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_realidade_id AND ordem_exibicao = 2;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_realidade_id, 'Que suposição minha estava errada hoje?', 'Essa pergunta treina clareza com a realidade. O objetivo é perceber o que eu achei que era verdade, mas o dia mostrou que não era. Isso ajuda a melhorar planejamento, decisões e autoconhecimento.', '["Achei que a tarefa levaria 1 hora, mas levou 4.", "Achei que tinha entendido o escopo, mas comecei com dúvidas.", "Achei que estudar assistindo aula seria suficiente, mas percebi que preciso praticar.", "Achei que dormir pouco não afetaria meu rendimento, mas afetou.", "Achei que um gasto pequeno não faria diferença, mas somando virou relevante.", "Achei que conseguiria fazer tudo hoje, mas planejei mais do que cabia."]'::jsonb, 2, true);
  END IF;

  -- Pergunta 4
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_realidade_id AND ordem_exibicao = 3;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_realidade_id, 'Como eu cuidei da minha energia hoje?', 'Essa pergunta olha para saúde e performance. Produtividade não depende apenas de força de vontade; depende também de sono, alimentação, movimento, descanso, foco e estado mental. A ideia não é estética ou culpa, mas energia para viver e trabalhar melhor.', '["Dormi pouco e meu foco caiu.", "Fiquei muitas horas parado.", "Comi de um jeito que me deixou pesado.", "Não fez nenhuma pausa real.", "Fiquei no celular até tarde.", "Tentei resolver tudo ao mesmo tempo e fiquei ansioso.", "Quando me movimentei, meu dia melhorou."]'::jsonb, 3, true);
  END IF;

  -- Pergunta 5
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_realidade_id AND ordem_exibicao = 4;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_realidade_id, 'O que eu fiz hoje que constrói ou destrói meu futuro?', 'Essa pergunta conecta o dia com o longo prazo. Algumas ações pequenas constroem futuro, como estudar, treinar, economizar, vender, criar, melhorar habilidades e cuidar da mente. Outras ações pequenas destroem futuro aos poucos, como procrastinação, compras impulsivas, desorganização e distração constante.', '["Fiz algo que meu eu do futuro vai agradecer?", "Melhorei uma habilidade importante?", "Organizei algo que vai poupar tempo depois?", "Gastei com consciência ou por impulso?", "Cuidei da minha saúde ou repeti algo que me deixa pior?", "Criei algo que pode gerar resultado no futuro?", "Evitei algo difícil que deveria ter enfrentado?"]'::jsonb, 4, true);
  END IF;

  -- Pergunta 6
  SELECT count(*) INTO v_count FROM auditoria.perguntas_auditoria WHERE modelo_id = v_modelo_realidade_id AND ordem_exibicao = 5;
  IF v_count = 0 THEN
    INSERT INTO auditoria.perguntas_auditoria (modelo_id, texto_pergunta, texto_ajuda, exemplos, ordem_exibicao, obrigatorio)
    VALUES (v_modelo_realidade_id, 'Qual ajuste prático eu faço amanhã?', 'Essa pergunta transforma reflexão em ação. Não basta dizer "amanhã vou ser melhor". O objetivo é definir uma ação pequena, clara e possível para corrigir a rota no próximo dia.', '["Amanhã vou definir as 3 prioridades antes de começar.", "Amanhã vou fazer a tarefa mais importante antes de abrir WhatsApp.", "Amanhã vou estudar praticando por 40 minutos.", "Amanhã vou registrar meus gastos.", "Amanhã vou dormir mais cedo.", "Amanhã vou terminar uma coisa antes de abrir outra.", "Amanhã vou pedir clareza antes de executar uma demanda confusa."]'::jsonb, 5, true);
  END IF;

END $$;
