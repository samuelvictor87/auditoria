# 🎨 Design Tokens: Paleta Oficial de Cores - Dibracam

Este documento serve como a **Fonte Única de Verdade (SSoT)** para todas as cores do sistema. Nenhuma cor deve ser aplicada de forma hardcoded; utilize sempre as variáveis CSS definidas em `src/styles/tokens.css`.

## 📦 Estrutura de Cores

As cores estão organizadas por categorias e níveis de escala para garantir consistência visual e escalabilidade.

### 1. Cores de Core (Principais)
Usadas para a fundação da interface e elementos estruturais.

| Token | Valor Hex | Descrição |
| :--- | :--- | :--- |
| `--color-primary` | `#001A4F` | Ação principal, branding, elementos de destaque. |
| `--color-primary-contrast` | `#FFFFFF` | Contraste sobre a cor primária (ex: texto em botões). |
| `--color-text` | `#182230` | Cor de texto padrão (alta legibilidade). |
| `--color-surface` | `#FFFFFF` | Camada superior (elevação), como cards e menus. |
| `--color-background` | `#FFFFFF` | Cor de fundo base do sistema. |

---

### 2. Tipografia (Escala)

| Token | Tamanho | Uso Recomendado |
| :--- | :--- | :--- |
| `--font-size-xs` | `12px` | Badges, legendas, hints |
| `--font-size-sm` | `13px` | Labels, textos secundários |
| `--font-size-md` | `14px` | Texto padrão, inputs, botões |
| `--font-size-lg` | `16px` | Títulos pequenos, mensagens de erro |
| `--font-size-xl` | `18px` | Títulos de seção |
| `--font-size-2xl` | `24px` | Títulos de página (H2) |
| `--font-size-3xl` | `32px` | Título principal (H1) |

---

### 3. Espaçamento (Escala 4px)

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--spacing-4` | `4px` | Gaps internos mini, micro margens |
| `--spacing-8` | `8px` | Gaps entre elementos, padding sm |
| `--spacing-12` | `12px` | Padding padrão de botões/inputs |
| `--spacing-16` | `16px` | Margem entre seções, padding md |
| `--spacing-24` | `24px` | Padding lateral de containers (lg) |
| `--spacing-32` | `32px` | Altura de componentes sm |
| `--spacing-40` | `40px` | Altura padrão (md) de inputs/botões |
| `--spacing-48` | `48px` | Altura grande (lg), margens amplas |

---

### 4. Border Radius (Arredondamento)

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--radius-none` | `0px` | Elementos retos (sem arredondamento) |
| `--radius-sm` | `4px` | Badges, chips, tags |
| `--radius-md` | `8px` | Botões, inputs, cards, selects |
| `--radius-lg` | `12px` | Cards de destaque, drawers |
| `--radius-xl` | `16px` | Modais, popups centrais |
| `--radius-full` | `9999px` | Avatares, pills, toggles |

---

### 5. Sombras (Elevação)

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--shadow-xs` | `0 1px 2px rgba(16, 24, 40, 0.05)` | Elevação mínima (inputs focus) |
| `--shadow-sm` | `0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)` | Cards, badges elevados |
| `--shadow-md` | `0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)` | Dropdowns, menus flutuantes |
| `--shadow-lg` | `0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)` | Modais, drawers |
| `--shadow-xl` | `0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)` | Overlays elevados |

---

### 6. Estados (Semânticas)
Utilizadas para fornecer feedback visual claro ao usuário.

| Token | Valor Hex | Uso |
| :--- | :--- | :--- |
| `--color-destructive` | `#F04438` | Ações perigosas ou remoção. |
| `--color-success` | `#17B26A` | Sucesso, confirmação, ativação. |
| `--color-alert` | `#F79009` | Atenção, avisos preventivos. |

---

### 7. Escala Brand (Branding)
Variações da identidade visual para tons de hover, sombras e profundidade.

| Nível | Valor Hex |
| :--- | :--- |
| `50` | `#ECF0FB` (Subtle bg) |
| `200` | `#8EB7ED` |
| `400` | `#254E95` |
| `500` (Base) | `#001A4F` |
| `550` | `#0D2D6B` |
| `600` | `#001443` |
| `800` | `#000A2D` |
| `900` | `#000725` |

---

### 8. Escala Grey (Neutras)
Fundamental para hierarquia de texto, bordas e divisores.

| Nível | Valor Hex | Uso |
| :--- | :--- | :--- |
| `50` | `#F9FAFB` | Backgrounds de seção |
| `100` | `#F2F4F7` | Bordas suaves |
| `200` | `#EAECF0` | Bordas de cards/inputs |
| `300` | `#D0D5DD` | Divisores e borders |
| `400` | `#98A2B3` | Placeholders |
| `500` | `#667085` | Texto secundário (muted) |
| `600` | `#475467` | Texto de descrição |
| `700` | `#344054` | Labels de input |
| `800` | `#252B37` | Texto forte |
| `900` | `#101828` | Headings (H1, H2...) |
| `charcoal` | `#475467` | Alternativa neutra |

---

### 9. Escalas de Estado (Variações)

#### ✅ Success
- `25`: `#F6FEF9`
- `50`: `#ECFDF3` (Background de badge/sucesso)
- `100`: `#DCFCE6`
- `200`: `#AAEFBA`
- `300`: `#75E0A7`
- `400`: `#47CD89`
- `500`: `#17B26A` (Base)
- `600`: `#079455`
- `700`: `#067647`
- `800`: `#05603A`
- `900`: `#054F31`

#### ⚠️ Warning
- `25`: `#FFFCF5`
- `50`: `#FFFAEB`
- `100`: `#FEF0C7`
- `200`: `#FEDF89`
- `300`: `#FEC84B`
- `400`: `#FDB022`
- `500`: `#F79009` (Base)
- `600`: `#DC6803`
- `700`: `#B54708`
- `800`: `#93370D`
- `900`: `#7A2E0E`

#### ❌ Error
- `25`: `#FFFBFA`
- `50`: `#FEF3F2` (Background de erro/alerta crítico)
- `100`: `#FEE4E2`
- `200`: `#FECDCA`
- `300`: `#FDA29B`
- `400`: `#F97066`
- `500`: `#F04438` (Base)
- `600`: `#D92D20`
- `700`: `#B42318`
- `800`: `#912018`
- `900`: `#7A271A`

---

### 10. Auxiliares
Cores específicas para funcionalidades ou variações pontuais.

| Token | Valor Hex | Notas |
| :--- | :--- | :--- |
| `--color-ai-variant` | `rgba(0, 26, 79, 0.1)` | Toque de cor da marca com opacidade (ex: áreas de IA). |
| `--color-ai-border` | `#E3E6EB` | Bordas suaves para elementos auxiliares. |

---

## 🛠️ Guia de Implementação

### Como aplicar em CSS:
```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  border: 1px solid var(--color-brand-600);
}

.text-subtle {
  color: var(--color-grey-500);
}

.input-border {
  border: 1px solid var(--color-grey-200);
}
```

### Como importar o arquivo:
No seu arquivo CSS principal ou no entry point Javascript:
```javascript
import './styles/tokens.css';
```
ou em HTML:
```html
<link rel="stylesheet" href="src/styles/tokens.css">
```
