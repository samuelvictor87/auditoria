// components/ui/InputNumber.tsx — CRM Dibracam
import React, { useState, useEffect } from 'react';
import '../../styles/components/input.css';

interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
  currency?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: string | number;
  onChange?: (value: number | string) => void;
}

const formatCurrency = (value: number | string) => {
  if (value === null || value === undefined || value === '') return '';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num);
};

export function InputNumber({ 
  label, 
  error, 
  icon, 
  required, 
  className = '', 
  id, 
  currency,
  value,
  onChange,
  ...rest 
}: InputNumberProps) {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2)}`;
  
  const [displayValue, setDisplayValue] = useState<string | number>('');

  useEffect(() => {
    if (currency) {
      setDisplayValue(formatCurrency(value as string | number));
    } else {
      setDisplayValue(value ?? '');
    }
  }, [value, currency]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    
    if (currency) {
      // Remove any non-digit chars
      const digits = rawValue.replace(/\D/g, '');
      if (digits) {
        const numericValue = parseInt(digits, 10) / 100;
        setDisplayValue(formatCurrency(numericValue));
        onChange?.(numericValue);
      } else {
        setDisplayValue('');
        onChange?.(0);
      }
    } else {
      setDisplayValue(rawValue);
      onChange?.(rawValue);
    }
  };

  return (
    <div className="input-wrapper">
      {label && (
        <label className={`input-label${required ? ' input-label-required' : ''}`} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={icon ? 'input-with-icon' : undefined}>
        {icon && <span className="input-icon">{icon}</span>}
        <input
          id={inputId}
          className={`input-field${error ? ' input-field--error' : ''} ${className}`}
          value={displayValue}
          onChange={handleChange}
          {...(currency ? { type: 'text', inputMode: 'numeric' } : { type: 'number' })}
          {...rest}
        />
      </div>
      {error && <span className="input-error-msg" role="alert">{error}</span>}
    </div>
  );
}
