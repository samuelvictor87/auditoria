# 📦 Component Spec — CRM Dibracam

> Este documento é a **fonte oficial de especificação** de todos os componentes reutilizáveis do sistema CRM Dibracam.  
> Ele complementa o [PRD (`prd.md`)](./prd.md), o [Style Guide (`style-guide.md`)](./style-guide.md) e os [Design Tokens (`design-tokens.md`)](./design-tokens.md).

**Regra**: Nenhum componente deve ser implementado sem antes consultar esta especificação. Nenhum estilo visual deve ser aplicado fora dos tokens definidos em `design-tokens.md`.

---

## Índice de Componentes

| # | Componente | Arquivo | Categoria |
|:---|:---|:---|:---|
| 1 | [Button](#1-button) | `Button.tsx` | Ação |
| 2 | [Input](#2-input) | `Input.tsx` | Formulário |
| 3 | [InputSearch](#3-inputsearch) | `InputSearch.tsx` | Formulário |
| 4 | [InputNumber](#4-inputnumber) | `InputNumber.tsx` | Formulário |
| 5 | [InputDate](#5-inputdate) | `InputDate.tsx` | Formulário |
| 6 | [Select](#6-select) | `Select.tsx` | Formulário |
| 7 | [MultiSelect](#7-multiselect) | `MultiSelect.tsx` | Formulário |
| 8 | [Textarea](#8-textarea) | `Textarea.tsx` | Formulário |
| 9 | [DataTable](#9-datatable) | `DataTable.tsx` | Dados |
| 10 | [Card](#10-card) | `Card.tsx` | Layout |
| 11 | [Modal](#11-modal) | `Modal.tsx` | Overlay |
| 12 | [Drawer](#12-drawer) | `Drawer.tsx` | Overlay |
| 13 | [Badge](#13-badge) | `Badge.tsx` | Informação |
| 14 | [Toast](#14-toast) | `Toast.tsx` | Feedback |
| 15 | [EmptyState](#15-emptystate) | `EmptyState.tsx` | Feedback |
| 16 | [LoadingState](#16-loadingstate) | `LoadingState.tsx` | Feedback |
| 17 | [Tabs](#17-tabs) | `Tabs.tsx` | Navegação |
| 18 | [FileUpload](#18-fileupload) | `FileUpload.tsx` | Formulário |
| 19 | [Accordion](#19-accordion) | `Accordion.tsx` | Layout |

---

## 1. Button

**Arquivo**: `components/ui/Button.tsx` · **Estilo**: `styles/components/button.css`

### Props

| Prop | Tipo | Default | Descrição |
|:---|:---|:---|:---|
| `variant` | `'primary' \| 'secondary' \| 'destructive'` | `'primary'` | Variante visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho |
| `disabled` | `boolean` | `false` | Desabilita o botão |
| `loading` | `boolean` | `false` | Exibe spinner no lugar do label |
| `fullWidth` | `boolean` | `false` | Ocupa 100% do container pai |
| `icon` | `ReactNode` | — | Ícone à esquerda do label |
| `children` | `ReactNode` | — | Conteúdo textual do botão |
| `onClick` | `() => void` | — | Handler de clique |
| `type` | `'button' \| 'submit'` | `'button'` | Tipo HTML |

### Variantes Visuais

| Variante | Background | Texto | Borda | Uso no CRM |
|:---|:---|:---|:---|:---|
| **Primary** | `--color-primary` | `--color-primary-contrast` | `--color-brand-600` | Salvar, Criar, Entrar |
| **Secondary** | `transparent` | `--color-text` | `--color-grey-300` | Cancelar, Voltar, Filtrar |
| **Destructive** | `--color-destructive` | `white` | nenhuma | Excluir, Inativar |

### Tamanhos

| Size | Altura | Font Size | Padding Horizontal |
|:---|:---|:---|:---|
| `sm` | `--spacing-32` (32px) | `--font-size-sm` (13px) | `--spacing-12` |
| `md` | `--spacing-40` (40px) | `--font-size-md` (14px) | `--spacing-16` |
| `lg` | `--spacing-48` (48px) | `--font-size-lg` (16px) | `--spacing-24` |

### Estados

| Estado | Comportamento |
|:---|:---|
| **Hover** | Background escurecido 10% (Primary: `--color-brand-600`; Destructive: darken 10%) |
| **Focus** | Outline ring `--color-brand-200` |
| **Disabled** | Opacidade 50%, cursor `not-allowed` |
| **Loading** | Spinner animado substituindo texto, pointer-events desativados |

### Onde é usado

- Todos os formulários (Salvar / Cancelar)
- Headers de módulos (+ Novo Usuário, + Nova Oportunidade)
- Modais de confirmação (Inativar, Excluir)
- Tela de Login (Entrar)
- Filtros (Aplicar Filtro)

---

## 2. Input

**Arquivo**: `components/ui/Input.tsx` · **Estilo**: `styles/components/input.css`

### Props

| Prop | Tipo | Default | Descrição |
|:---|:---|:---|:---|
| `label` | `string` | — | Label posicionada acima do campo |
| `placeholder` | `string` | — | Texto placeholder |
| `value` | `string` | — | Valor controlado |
| `onChange` | `(value: string) => void` | — | Handler de mudança |
| `type` | `'text' \| 'email' \| 'password' \| 'tel'` | `'text'` | Tipo do input |
| `required` | `boolean` | `false` | Marca como obrigatório (exibe `*`) |
| `disabled` | `boolean` | `false` | Desabilita o campo |
| `error` | `string` | — | Mensagem de erro abaixo do campo |
| `icon` | `ReactNode` | — | Ícone embutido (ex: envelope no campo de email) |
| `mask` | `string` | — | Máscara de formatação (ex: CPF, telefone) |

### Estilos Base

| Elemento | Token |
|:---|:---|
| Label | Cor `--color-grey-700`, peso `500` |
| Borda | `--color-grey-300` |
| Borda (focus) | `--color-brand-400` + shadow `--shadow-sm` |
| Borda (error) | `--color-destructive` |
| Background | `--color-surface` |
| Radius | `--radius-md` |
| Altura | `--spacing-40` (40px) |
| Padding interno | `--spacing-12` |
| Placeholder | Cor `--color-grey-400` |
| Mensagem de erro | Cor `--color-destructive`, font `--font-size-sm` |

### Onde é usado

- Configurações (Nome, Email, Celular)
- Usuários (Nome, Email, Celular)
- Filial (Nome, CNPJ, IE, Telefone, CEP, Endereço)
- Login (Email, Senha)
- Chat (campo de digitação de mensagem)

---

## 3. InputSearch

**Arquivo**: `components/ui/InputSearch.tsx`

Extensão do `Input` com funcionalidade de busca assíncrona e dropdown de resultados.

### Props adicionais

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `onSearch` | `(term: string) => Promise<Item[]>` | Callback de busca assíncrona |
| `onSelect` | `(item: Item) => void` | Callback ao selecionar resultado |
| `debounceMs` | `number` | Tempo de debounce (default: 300ms) |
| `minChars` | `number` | Mínimo de caracteres para iniciar busca (default: 2) |

### Onde é usado

- Barra de busca global de Usuários, Clientes, Filial
- Campo "Cliente" no formulário de Nova Oportunidade
- Campo "Cliente" no popup de Editar Tarefa

---

## 4. InputNumber

**Arquivo**: `components/ui/InputNumber.tsx`

Extensão do `Input` com máscara numérica e formatação de moeda (BRL).

### Props adicionais

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `currency` | `boolean` | Se true, formata como `R$ 0.000,00` |
| `min` | `number` | Valor mínimo aceito |
| `max` | `number` | Valor máximo aceito |
| `step` | `number` | Incremento (default: 1) |

### Onde é usado

- Metas (input de valor por vendedor)
- Oportunidades (valor da negociação)

---

## 5. InputDate

**Arquivo**: `components/ui/InputDate.tsx`

Componente de seleção de data com suporte a range (início/fim).

### Props adicionais

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `mode` | `'single' \| 'range'` | Seleção única ou intervalo |
| `format` | `string` | Formato de exibição (default: `dd/mm/yyyy`) |
| `minDate` | `Date` | Data mínima selecionável |
| `maxDate` | `Date` | Data máxima selecionável |

### Onde é usado

- Filtros de Usuários (Data de criação)
- Filtros de Bolsão (Data início/fim)
- Filtros do Dashboard do Cliente (Data início/fim)
- Tarefas (Data do agendamento)

---

## 6. Select

**Arquivo**: `components/ui/Select.tsx` · **Estilo**: `styles/components/select.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `label` | `string` | Label acima do campo |
| `options` | `Option[]` | Lista de opções `{ value, label }` |
| `value` | `string` | Valor selecionado |
| `onChange` | `(value: string) => void` | Handler |
| `placeholder` | `string` | Texto quando nada selecionado |
| `required` | `boolean` | Campo obrigatório |
| `disabled` | `boolean` | Desabilitar |
| `error` | `string` | Mensagem de erro |

### Onde é usado

- Configurações (Tipo de usuário)
- Usuários (Tipo, Status, Filial nos filtros)
- Metas (Filial, Ano, Mês)
- Bolsão (Tipo, Qtd de Linhas, Vendedor/Origem)
- Tarefas (Status, Tipo de tarefa)

---

## 7. MultiSelect

**Arquivo**: `components/ui/MultiSelect.tsx`

Select com suporte a múltipla seleção, exibindo tags/chips dos itens escolhidos.

### Props adicionais em relação ao Select

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `value` | `string[]` | Valores selecionados (array) |
| `onChange` | `(values: string[]) => void` | Handler de mudança |
| `maxItems` | `number` | Limite máximo de seleções |

### Onde é usado

- Configurações (Equipe/Filiais)
- Filial (Vendedores associados)
- Usuários (Equipe)

---

## 8. Textarea

**Arquivo**: `components/ui/Textarea.tsx`

### Props

Mesmas do `Input` base, mais:

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `rows` | `number` | Número de linhas visíveis (default: 4) |
| `maxLength` | `number` | Limite de caracteres |
| `showCounter` | `boolean` | Exibe contador de caracteres |

### Onde é usado

- Tarefas (Descrição da tarefa)
- Oportunidades > Atividade (Anotações/Follow up)

---

## 9. DataTable

**Arquivo**: `components/ui/DataTable.tsx` · **Estilo**: `styles/components/table.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `columns` | `Column[]` | Definição das colunas `{ key, label, sortable, width }` |
| `data` | `T[]` | Array de dados |
| `loading` | `boolean` | Estado de carregamento |
| `emptyMessage` | `string` | Mensagem quando sem dados |
| `pagination` | `PaginationConfig` | Configuração de paginação |
| `onRowClick` | `(row: T) => void` | Click na linha |
| `actions` | `ActionConfig[]` | Ícones de ação por linha |
| `rowHighlight` | `(row: T) => string \| null` | Coloração condicional de linha |

### Estilos Base

| Elemento | Token |
|:---|:---|
| Header background | `--color-grey-100` |
| Header texto | `--color-grey-500`, uppercase |
| Row border-bottom | `--color-grey-200` |
| Row hover | `--color-grey-50` |
| Ícones de ação | 20px, agrupados à direita |
| Paginação | Alinhada ao rodapé da tabela |

### Onde é usado

- Usuários, Filial, Bolsão, Clientes, Tarefas, Metas (listagens principais)
- Dashboard do Gestor (tabela de representantes)
- Histórico de Compras do cliente (sub-tabela de NFs)

---

## 10. Card

**Arquivo**: `components/ui/Card.tsx` · **Estilo**: `styles/components/card.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `title` | `string` | Título no header do card |
| `subtitle` | `string` | Subtítulo opcional |
| `value` | `string \| number` | Valor de destaque (KPI cards) |
| `variant` | `'default' \| 'metric' \| 'kanban'` | Variante visual |
| `children` | `ReactNode` | Conteúdo livre |
| `onClick` | `() => void` | Torna o card clicável |

### Estilos Base

| Elemento | Token |
|:---|:---|
| Background | `--color-surface` |
| Border | `--color-grey-200` |
| Radius | `--radius-md` |
| Shadow | `--shadow-sm` |
| Header padding | `--spacing-16` |
| Header border-bottom | `--color-grey-100` |
| Valor numérico (métrica) | Cor `--color-primary`, bold |

### Onde é usado

- Dashboard Gestor (8 KPI cards)
- Dashboard Vendedor (4 micro-cards)
- Visão Geral do Cliente (cards de métricas)
- Kanban de Oportunidades (cards de negócio)

---

## 11. Modal

**Arquivo**: `components/ui/Modal.tsx` · **Estilo**: `styles/components/modal.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `isOpen` | `boolean` | Controle de visibilidade |
| `onClose` | `() => void` | Handler de fechamento |
| `title` | `string` | Título do modal |
| `description` | `string` | Subtítulo/instrução |
| `size` | `'sm' \| 'md' \| 'lg'` | Largura do modal |
| `children` | `ReactNode` | Conteúdo |
| `footer` | `ReactNode` | Botões de ação no rodapé |
| `closeOnOverlay` | `boolean` | Fechar ao clicar no overlay (default: true) |

### Estilos Base

| Elemento | Token |
|:---|:---|
| Overlay | `rgba(0, 0, 0, 0.5)` |
| Background | `--color-surface` |
| Radius | `--radius-xl` |
| Shadow | `--shadow-lg` |

### Onde é usado

- Inativar Usuário (confirmação destrutiva)
- Criar Meta (seleção de ano/mês)
- Editar Tarefa (popup central)
- Bolsão: Informações do Cliente (popup de visualização)

---

## 12. Drawer

**Arquivo**: `components/ui/Drawer.tsx` · **Estilo**: `styles/components/drawer.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `isOpen` | `boolean` | Controle de visibilidade |
| `onClose` | `() => void` | Handler de fechamento |
| `title` | `string` | Título no topo fixo |
| `subtitle` | `string` | Instrução abaixo do título |
| `position` | `'right' \| 'left'` | Direção do slide (default: `'right'`) |
| `width` | `string` | Largura (default: `480px`) |
| `children` | `ReactNode` | Conteúdo rolável |
| `actions` | `ReactNode` | Botões Salvar/Cancelar no topo fixo |

### Estilos Base

| Elemento | Token |
|:---|:---|
| Background | `--color-surface` |
| Overlay | `rgba(0, 0, 0, 0.5)` |
| Header — topo fixo | Padding `--spacing-16`, border-bottom `--color-grey-100` |
| Animação | Slide-in horizontal, 200ms ease-out |

### Onde é usado

- Usuários (Novo/Editar)
- Filial (Adicionar/Editar)
- Oportunidades (Nova Oportunidade)
- Oportunidades > Contatos (Adicionar contato)
- Oportunidades > Veículos (Adicionar veículo)

---

## 13. Badge

**Arquivo**: `components/ui/Badge.tsx` · **Estilo**: `styles/components/badge.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `variant` | `'success' \| 'warning' \| 'error' \| 'neutral' \| 'info'` | Variante visual |
| `label` | `string` | Texto exibido |
| `size` | `'sm' \| 'md'` | Tamanho (default: `'sm'`) |
| `dot` | `boolean` | Exibe indicador circular antes do texto |

### Variantes Visuais

| Variante | Background | Texto |
|:---|:---|:---|
| `success` | `--color-success-50` | `--color-success` |
| `warning` | `--color-alert-50` | `--color-alert` |
| `error` | `--color-error-50` | `--color-destructive` |
| `neutral` | `--color-grey-100` | `--color-grey-600` |
| `info` | `--color-brand-50` | `--color-primary` |

### Onde é usado

- Usuários (Badge "Ativo" / "Inativo")
- Clientes > Visão Geral (Tags "Alta Frequência", etc.)
- Chat (Tags "Pendente", "Finalizado")
- Oportunidades (Status do estágio)

---

## 14. Toast

**Arquivo**: `components/ui/Toast.tsx` · **Estilo**: `styles/components/toast.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | Tipo do feedback |
| `message` | `string` | Texto principal |
| `duration` | `number` | Tempo de exibição em ms (default: 4000) |
| `position` | `'top-right' \| 'bottom-right'` | Posição na tela (default: `'top-right'`) |
| `dismissible` | `boolean` | Botão X para fechar manualmente |

### Comportamento

- Aparece com animação slide-in da direita.
- Desaparece automaticamente após `duration` ms.
- Empilha múltiplos toasts verticalmente.
- Gerenciado centralmente via `hooks/useToast.ts`.

### Onde é usado

- Feedback ao redefinir senha de usuário ("E-mail enviado com sucesso")
- Feedback ao salvar formulários
- Feedback de erros de API
- Feedback ao concluir/excluir tarefa

---

## 15. EmptyState

**Arquivo**: `components/ui/EmptyState.tsx` · **Estilo**: `styles/components/empty-state.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `icon` | `ReactNode` | Ícone ou ilustração (default: caminhão Dibracam estático) |
| `title` | `string` | Título principal (ex: "Nenhum dado encontrado") |
| `description` | `string` | Texto auxiliar |
| `action` | `ReactNode` | Botão de ação (ex: "Tentar novamente" ou "Filtrar") |

### Regra do Style Guide

> Tabelas sem dados devem exibir o ícone do caminhão de forma estática no centro com uma legenda "Nenhum dado encontrado".

### Onde é usado

- Todas as DataTables quando sem dados
- Chat (estado sem conversa selecionada — com emoji 👋 e mensagem de boas-vindas)
- Bolsão (estado pré-filtro)
- Clientes (estado pré-filtro)

---

## 16. LoadingState

**Arquivo**: `components/ui/LoadingState.tsx` · **Estilo**: `styles/components/loading-state.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `variant` | `'fullscreen' \| 'inline' \| 'overlay'` | Tipo de exibição |
| `message` | `string` | Texto abaixo da animação (ex: "Carregando...") |

### Regra do Style Guide

> O projeto utiliza um elemento de branding forte durante esperas: o **caminhão de carregamento**.
> - Animação centralizada de um ícone de caminhão.
> - Deve ser exibido em qualquer troca de página, carregamento de tabelas ou filtros que demorem mais que 300ms.

### Variantes

| Variante | Uso |
|:---|:---|
| `fullscreen` | Troca de página ou carregamento inicial |
| `inline` | Dentro de cards ou seções isoladas |
| `overlay` | Sobre conteúdo existente (ex: tabela recarregando) |

### Onde é usado

- Troca entre módulos (Menu lateral)
- DataTables durante fetch
- Dashboards durante mudança de filtro temporal
- Chats ao carregar histórico de conversa

---

## 17. Tabs

**Arquivo**: `components/ui/Tabs.tsx` · **Estilo**: `styles/components/tabs.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `tabs` | `TabItem[]` | Lista de abas `{ key, label, icon?, badge? }` |
| `activeTab` | `string` | Key da aba ativa |
| `onChange` | `(key: string) => void` | Handler de troca de aba |
| `variant` | `'underline' \| 'pill'` | Estilo visual (default: `'underline'`) |

### Estilos Base

| Elemento | Token |
|:---|:---|
| Container | Border-bottom `--color-grey-200` |
| Tab inativa — texto | `--color-grey-500` |
| Tab ativa — texto | `--color-primary` |
| Tab ativa — indicador (underline) | `--color-primary`, 2px bottom |
| Tab ativa — indicador (pill) | Background `--color-brand-50`, radius `--radius-md` |
| Tab hover | `--color-grey-50` |

### Onde é usado

- Configurações (3 abas: Meus Dados, Senha, Email)
- Clientes > Visão Detalhada (4 abas: Visão Geral, Histórico, Insights, Tarefas)
- Oportunidades > Detalhes (5 abas: Contatos, Tarefas, Arquivos, Atividade, Veículos)

---

## 18. FileUpload

**Arquivo**: `components/ui/FileUpload.tsx` · **Estilo**: `styles/components/file-upload.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `onUpload` | `(files: File[]) => void` | Callback ao selecionar/dropar arquivos |
| `accept` | `string` | Tipos aceitos (ex: `'image/*,.pdf,.doc'`) |
| `maxSize` | `number` | Tamanho máximo em bytes (default: 5MB) |
| `maxFiles` | `number` | Quantidade máxima de arquivos simultâneos (default: 6) |
| `variant` | `'avatar' \| 'dropzone'` | Modo de exibição |
| `preview` | `string` | URL da imagem atual (para avatar) |
| `error` | `string` | Mensagem de erro |
| `disabled` | `boolean` | Desabilita o upload |

### Variantes

| Variante | Uso |
|:---|:---|
| `avatar` | Upload circular de foto de perfil. Exibe preview da imagem atual com overlay de ícone de câmera. Restrição: SVG, PNG, JPG, GIF; max 800x400px. |
| `dropzone` | Área retangular de Drag & Drop para documentos. Exibe ícone de upload, texto de instrução e lista de arquivos selecionados. Suporta múltiplos arquivos. |

### Estilos Base

| Elemento | Token |
|:---|:---|
| Dropzone — borda | `--color-grey-300`, dashed |
| Dropzone — borda (hover/drag) | `--color-brand-400` |
| Dropzone — background | `--color-grey-50` |
| Dropzone — radius | `--radius-lg` |
| Avatar — tamanho | `96px` circular |
| Avatar — borda | `--color-grey-200` |
| Erro | Cor `--color-destructive`, font `--font-size-sm` |

### Onde é usado

- Configurações > Meus Dados (upload de foto — variant `avatar`)
- Usuários > Novo/Editar (upload de foto — variant `avatar`)
- Oportunidades > Arquivos (upload de documentos — variant `dropzone`)

---

## 19. Accordion

**Arquivo**: `components/ui/Accordion.tsx` · **Estilo**: `styles/components/accordion.css`

### Props

| Prop | Tipo | Descrição |
|:---|:---|:---|
| `items` | `AccordionItem[]` | Lista de itens `{ key, header, content }` |
| `defaultOpen` | `string[]` | Keys dos itens abertos por padrão |
| `allowMultiple` | `boolean` | Permite mais de um item aberto (default: false) |
| `variant` | `'default' \| 'table-row'` | Estilo visual |

### Variantes

| Variante | Uso |
|:---|:---|
| `default` | Accordion padrão com borda e padding |
| `table-row` | Incorporado em linhas de DataTable (chevron expande sub-conteúdo dentro da tabela) |

### Estilos Base

| Elemento | Token |
|:---|:---|
| Header — padding | `--spacing-12` |
| Header — hover | `--color-grey-50` |
| Chevron — cor | `--color-grey-400` |
| Chevron — animação | Rotação 90° → 0° em 200ms |
| Content — padding | `--spacing-16` |
| Borda | `--color-grey-200` |

### Onde é usado

- Clientes > Histórico de Compras (expansão de itens da NF — variant `table-row`)
- Seções colapsáveis em formulários longos (se necessário — variant `default`)

---

## Biblioteca de Ícones

O sistema utiliza exclusivamente **[Phosphor Icons](https://phosphoricons.com/)** (`@phosphor-icons/react`) como biblioteca de ícones.

**Regras**:
- Nenhum ícone deve vir de outra biblioteca (FontAwesome, Heroicons, Lucide, etc.).
- Peso padrão: `regular`. Usar `bold` para ações primárias e `fill` para estados ativos/selecionados.
- Tamanho padrão: `20px` em tabelas/ações, `24px` em headers/botões.
- Cor padrão: `currentColor` (herda do pai).

**Exemplo**:
```tsx
import { MagnifyingGlass, Plus, Pencil, Trash } from '@phosphor-icons/react';
<MagnifyingGlass size={20} weight="regular" />
```

---

## Regras Gerais de Componentização

1. **Nenhuma página cria componentes visuais avulsos.** Tudo vem de `components/ui/`.
2. **Nenhum componente usa valores hardcoded.** Tudo vem de `var(--token)`.
3. **Todo componente deve tratar seus próprios estados** (hover, focus, disabled, loading, error).
4. **Componentes não conhecem rotas** — não fazem `navigate()` nem acessam contextos de página.
5. **Evolução sempre documentada** — ao adicionar props ou variantes, este spec deve ser atualizado junto com o código.
6. **Ícones exclusivamente via Phosphor Icons** — `@phosphor-icons/react`, nunca outra biblioteca.

