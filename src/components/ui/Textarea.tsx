// components/ui/Textarea.tsx — CRM Dibracam
import React from 'react';
import '../../styles/components/textarea.css';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  rows?: number;
  id?: string;
  name?: string;
}

export function Textarea({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled = false,
  required = false,
  error,
  rows = 3,
  id,
  name,
}: TextareaProps) {
  const hasError = Boolean(error);

  return (
    <div className="textarea-wrapper">
      {label && (
        <label
          htmlFor={id}
          className={`textarea-label${required ? ' textarea-label-required' : ''}`}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        className={`textarea-field${hasError ? ' textarea-field--error' : ''}`}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
      />
      {hasError && <span className="textarea-error-msg">{error}</span>}
    </div>
  );
}
