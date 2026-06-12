// components/ui/InputDate.tsx — CRM Dibracam
import { useState, useRef, useEffect } from 'react';
import { Calendar, CaretLeft, CaretRight, CaretDoubleLeft, CaretDoubleRight } from '@phosphor-icons/react';
import '../../styles/components/input-date.css';

interface InputDateProps {
  label?: string;
  mode?: 'single' | 'range';
  value?: string | { start: string; end: string };
  onChange?: (value: string | { start: string; end: string }) => void;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function formatDateBR(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}



export function InputDate({
  label,
  mode = 'single',
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  required = false,
}: InputDateProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

  const displayValue = mode === 'single'
    ? (typeof value === 'string' ? value : '')
    : (typeof value === 'object' && value ? `${value.start} — ${value.end}` : '');

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const handleDayClick = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const formatted = formatDateBR(selected);
    if (mode === 'single') {
      onChange?.(formatted);
      setOpen(false);
    }
  };

  const prevYear = () => setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1));
  const nextYear = () => setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1));
  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  return (
    <div className="input-date-wrapper" ref={ref}>
      {label && (
        <label className="input-label">
          {label}{required && <span className="input-required"> *</span>}
        </label>
      )}
      <div
        className={`input-date-trigger ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
        onClick={() => !disabled && setOpen(!open)}
      >
        <Calendar size={16} className="input-date-icon" />
        <span className={displayValue ? '' : 'input-date-placeholder'}>
          {displayValue || placeholder || (mode === 'range' ? 'dd/mm/aaaa — dd/mm/aaaa' : 'dd/mm/aaaa')}
        </span>
      </div>
      {error && <span className="input-error-msg">{error}</span>}

      {open && (
        <div className="input-date-popover">
          <div className="input-date-header">
            <div style={{ display: 'flex', gap: 4 }}>
              <button type="button" onClick={prevYear} className="input-date-nav" title="Ano anterior"><CaretDoubleLeft size={16} /></button>
              <button type="button" onClick={prevMonth} className="input-date-nav" title="Mês anterior"><CaretLeft size={16} /></button>
            </div>
            <span className="input-date-month">{MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button type="button" onClick={nextMonth} className="input-date-nav" title="Próximo mês"><CaretRight size={16} /></button>
              <button type="button" onClick={nextYear} className="input-date-nav" title="Próximo ano"><CaretDoubleRight size={16} /></button>
            </div>
          </div>
          <div className="input-date-grid">
            {DAYS.map(d => <div key={d} className="input-date-day-label">{d}</div>)}
            {days.map((day, i) => (
              <div
                key={i}
                className={`input-date-day ${day ? 'input-date-day-active' : ''}`}
                onClick={() => day && handleDayClick(day)}
              >
                {day || ''}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
