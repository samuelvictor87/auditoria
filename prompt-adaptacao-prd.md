# Prompt: Refatoração de Projeto Base para Novo PRD

**Objetivo:** Você atua como um Arquiteto de Software e Agente de IA responsável por adaptar a documentação de um projeto _boilerplate_ (que já possui um Design System e regras estruturais) para um **novo produto**, utilizando um novo documento de requisitos (`prd.md`) como a única fonte da verdade.

---

## 📋 Instruções de Execução

### 1. Análise de Domínio
Leia o arquivo `prd.md` recém-adicionado ao projeto para compreender:
- O nome do novo sistema.
- O contexto e domínio do negócio.
- A **entidade raiz de isolamento** (o tenant) que ditará a segurança (ex: "Clínica", "Escritório", "Empresa", "Condomínio").
- Os perfis de acesso e os módulos principais.

### 2. Preservação do Design System
- Você **NÃO** deve alterar os arquivos `design-tokens.md`, `component-spec.md` ou o código dos componentes visuais já existentes na pasta `src/components/ui/`, a não ser para remover o "nome do projeto antigo", caso exista.
- As cores, tipografias, espaçamentos e a organização dos componentes devem ser mantidas **intactas** para garantir que a interface base continue funcionando.

### 3. Refatoração da Arquitetura e Contexto (`context.md`)
Reescreva totalmente o arquivo `context.md`:
- Atualize o nome do projeto.
- Altere a regra de **Isolamento de Dados (Multi-tenant)**: defina a nova entidade raiz extraída do PRD e decrete que o escopo deve sempre ser resolvido pelo servidor (via `auth.uid()`).
- Troque a lista de módulos principais para refletir o novo PRD.

### 4. Refatoração do Banco de Dados (`docs/database-schema.md`)
Reescreva o documento de schema do banco:
- Remova todas as tabelas inerentes ao projeto antigo.
- Projete um novo referencial de tabelas base (ex: entidade raiz, usuários, e as entidades vitais do PRD).
- Especifique as diretrizes de Row Level Security (RLS), deixando claro que todas as políticas devem verificar o vínculo do usuário com a nova entidade raiz.

### 5. Atualização da Skill Operacional (`.agents/skills/projeto-expert/SKILL.md`)
Reescreva as diretrizes do agente para o projeto atual:
- Atualize o nome do projeto e descrição.
- Atualize a sessão de "Segurança Multi-Tenant" para proteger a nova entidade raiz (ex: "Nunca aceite `clinica_id` vindo do frontend...").
- Atualize o glossário de tabelas que exigem aprovação explícita antes de qualquer deleção ou DDL (`DROP`, `TRUNCATE`).

---

## 🛠️ Plano de Ação Exigido

Antes de executar as edições, gere um **Artefato de Plano de Implementação** (`implementation_plan.md`) listando exatamente:
1. O que será mantido intacto (Design System).
2. Como o `context.md` será alterado.
3. Quais serão as novas tabelas base do `database-schema.md`.
4. Quais as novas regras a serem inseridas na Skill do agente.

Aguarde a aprovação do usuário e, então, execute as modificações de uma só vez utilizando as ferramentas de manipulação de arquivo.
