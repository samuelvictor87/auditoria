// components/ui/MultiSelect.tsx — CRM Dibracam
import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, X, Check } from '@phosphor-icons/react';
import '../../styles/components/multi-select.css';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Selecione...',
  maxItems,
  disabled = false,
  error,
  required = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedLabels = value.map(v => options.find(o => o.value === v)?.label || v);

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter(v => v !== optValue));
    } else {
      if (maxItems && value.length >= maxItems) return;
      onChange([...value, optValue]);
    }
  };

  const removeChip = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optValue));
  };

  return (
    <div className="multi-select-wrapper" ref={ref}>
      {label && (
        <label className="input-label">
          {label}{required && <span className="input-required"> *</span>}
        </label>
      )}
      <div
        className={`multi-select-trigger ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''} ${open ? 'multi-select-open' : ''}`}
        onClick={() => !disabled && setOpen(!open)}
      >
        <div className="multi-select-chips">
          {value.length === 0 && <span className="multi-select-placeholder">{placeholder}</span>}
          {selectedLabels.map((lbl, i) => (
            <span key={value[i]} className="multi-select-chip">
              {lbl}
              <button className="multi-select-chip-remove" onClick={e => removeChip(value[i], e)}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <CaretDown size={16} className="multi-select-caret" />
      </div>
      {error && <span className="input-error-msg">{error}</span>}

      {open && (
        <ul className="multi-select-dropdown">
          {options.map(opt => {
            const isSelected = value.includes(opt.value);
            return (
              <li
                key={opt.value}
                className={`multi-select-option ${isSelected ? 'multi-select-option-selected' : ''}`}
                onClick={() => toggle(opt.value)}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={16} weight="bold" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
