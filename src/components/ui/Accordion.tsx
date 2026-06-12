// components/ui/Accordion.tsx — CRM Dibracam
import React, { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import '../../styles/components/accordion.css';

export interface AccordionItem {
  key: string;
  header: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string[];
  allowMultiple?: boolean;
  variant?: 'default' | 'table-row';
}

export function Accordion({
  items,
  defaultOpen = [],
  allowMultiple = false,
  variant = 'default',
}: AccordionProps) {
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpen);

  const toggle = (key: string) => {
    if (openKeys.includes(key)) {
      setOpenKeys(openKeys.filter(k => k !== key));
    } else {
      setOpenKeys(allowMultiple ? [...openKeys, key] : [key]);
    }
  };

  return (
    <div className={`accordion accordion-${variant}`}>
      {items.map(item => {
        const isOpen = openKeys.includes(item.key);
        return (
          <div key={item.key} className={`accordion-item ${isOpen ? 'accordion-item-open' : ''}`}>
            <button
              className="accordion-header"
              onClick={() => toggle(item.key)}
              aria-expanded={isOpen}
            >
              <span className="accordion-header-content">{item.header}</span>
              <CaretDown
                size={16}
                className={`accordion-chevron ${isOpen ? 'accordion-chevron-open' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="accordion-content">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
