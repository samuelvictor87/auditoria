// pages/styleguide/StyleGuideSidebar.tsx — CRM Dibracam
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

const NAV: NavCategory[] = [
  {
    title: 'Fundação',
    items: [
      { id: 'cores', label: 'Cores' },
      { id: 'tipografia', label: 'Tipografia' },
      { id: 'espacamento', label: 'Espaçamento e Radius' },
      { id: 'sombras', label: 'Sombras' },
      { id: 'estados', label: 'Estados' },
    ],
  },
  {
    title: 'Inputs e Formulários',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'input', label: 'Input' },
      { id: 'input-search', label: 'InputSearch' },
      { id: 'input-number', label: 'InputNumber' },
      { id: 'input-date', label: 'InputDate' },
      { id: 'select', label: 'Select' },
      { id: 'multi-select', label: 'MultiSelect' },
      { id: 'textarea', label: 'Textarea' },
      { id: 'file-upload', label: 'FileUpload' },
    ],
  },
  {
    title: 'Exibição de Dados',
    items: [
      { id: 'avatar', label: 'Avatar' },
      { id: 'badge', label: 'Badge' },
      { id: 'card', label: 'Card' },
      { id: 'data-table', label: 'DataTable' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'accordion', label: 'Accordion' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { id: 'modal', label: 'Modal' },
      { id: 'drawer', label: 'Drawer' },
      { id: 'toast', label: 'Toast' },
      { id: 'empty-state', label: 'EmptyState' },
      { id: 'loading-state', label: 'LoadingState' },
    ],
  },
  {
    title: 'Ícones',
    items: [
      { id: 'icones', label: 'Biblioteca Phosphor' },
    ],
  },
  {
    title: 'Exemplos Reais',
    items: [
      { id: 'exemplos', label: 'Composições do CRM' },
    ],
  },
];

export function StyleGuideSidebar() {
  const [activeId, setActiveId] = useState('cores');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    const allIds = NAV.flatMap(c => c.items.map(i => i.id));
    allIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <aside className="sg-sidebar">
      <Link to="/painel/inicio" className="sg-sidebar-back">
        <ArrowLeft size={14} /> Voltar ao Painel
      </Link>
      <div className="sg-sidebar-brand">
        <h1 className="sg-sidebar-title">Styleguide</h1>
        <p className="sg-sidebar-sub">Tokens & Components</p>
      </div>

      {NAV.map(cat => (
        <React.Fragment key={cat.title}>
          <div className="sg-sidebar-category">{cat.title}</div>
          {cat.items.map(item => (
            <button
              key={item.id}
              className={`sg-sidebar-item ${activeId === item.id ? 'sg-sidebar-item-active' : ''}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </React.Fragment>
      ))}
    </aside>
  );
}
