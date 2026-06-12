// components/ui/InputSearch.tsx — CRM Dibracam
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MagnifyingGlass, X, CircleNotch } from '@phosphor-icons/react';
import '../../styles/components/input.css';

interface SearchItem {
  value: string;
  label: string;
  [key: string]: any;
}

interface InputSearchProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onSearch: (term: string) => Promise<SearchItem[]>;
  onSelect: (item: SearchItem) => void;
  onClear?: () => void;
  debounceMs?: number;
  minChars?: number;
  disabled?: boolean;
  error?: string;
}

export function InputSearch({
  label,
  placeholder = 'Buscar...',
  value = '',
  onSearch,
  onSelect,
  onClear,
  debounceMs = 300,
  minChars = 2,
  disabled = false,
  error,
}: InputSearchProps) {
  const [term, setTerm] = useState(value);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTerm(val);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (val.length < minChars) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const res = await onSearch(val);
        setResults(res);
        setIsOpen(res.length > 0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);
  }, [onSearch, debounceMs, minChars]);

  const handleSelect = (item: SearchItem) => {
    setTerm(item.label);
    setIsOpen(false);
    onSelect(item);
  };

  const handleClear = () => {
    setTerm('');
    setResults([]);
    setIsOpen(false);
    onClear?.();
  };

  return (
    <div className="input-search-wrapper" ref={wrapperRef}>
      {label && <label className="input-label">{label}</label>}
      <div className={`input-container ${error ? 'input-error' : ''}`}>
        <MagnifyingGlass size={16} className="input-icon-left" />
        <input
          type="text"
          className="input-field input-with-icon"
          placeholder={placeholder}
          value={term}
          onChange={handleChange}
          disabled={disabled}
        />
        {loading && <CircleNotch size={16} className="input-icon-right input-spinner" />}
        {!loading && term && (
          <button className="input-clear-btn" onClick={handleClear} aria-label="Limpar busca">
            <X size={14} />
          </button>
        )}
      </div>
      {error && <span className="input-error-msg">{error}</span>}

      {isOpen && results.length > 0 && (
        <ul className="input-search-dropdown">
          {results.map(item => (
            <li key={item.value} onClick={() => handleSelect(item)} className="input-search-item">
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
