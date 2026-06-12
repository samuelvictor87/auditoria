// components/ui/Toast.tsx — CRM Dibracam
import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, WarningCircle, Warning, Info } from '@phosphor-icons/react';
import '../../styles/components/toast.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  addToast: (type: ToastType, title: string, message?: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const ctx: ToastContextValue = React.useMemo(() => ({
    addToast,
    success: (t, m) => addToast('success', t, m),
    error:   (t, m) => addToast('error', t, m),
    warning: (t, m) => addToast('warning', t, m),
    info:    (t, m) => addToast('info', t, m),
  }), [addToast]);

  const iconMap: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle size={20} weight="fill" />,
    error:   <WarningCircle size={20} weight="fill" />,
    warning: <Warning size={20} weight="fill" />,
    info:    <Info size={20} weight="fill" />,
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {createPortal(
        <div className="toast-container" aria-live="polite">
          {toasts.map(t => (
            <div key={t.id} className={`toast toast-${t.type}`} role="alert">
              <span className="toast-icon">{iconMap[t.type]}</span>
              <div className="toast-content">
                <p className="toast-title">{t.title}</p>
                {t.message && <p className="toast-message">{t.message}</p>}
              </div>
              <button className="toast-close" onClick={() => removeToast(t.id)} aria-label="Fechar">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider');
  return ctx;
}
