// components/ui/Drawer.tsx — CRM Dibracam
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from '@phosphor-icons/react';
import '../../styles/components/drawer.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  position?: 'right' | 'left';
  width?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  position = 'right',
  width = '480px',
  children,
  actions,
}: DrawerProps) {
  // Fechar com Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Travar scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="drawer-overlay" role="dialog" aria-modal="true">
      <div className="drawer-overlay-bg" onClick={onClose} aria-label="Fechar drawer" />
      <div
        className={`drawer-panel drawer-${position}`}
        style={{ width }}
      >
        {/* Header fixo */}
        <div className="drawer-header">
          <div className="drawer-header-info">
            <h2 className="drawer-title">{title}</h2>
            {subtitle && <p className="drawer-subtitle">{subtitle}</p>}
          </div>
          <div className="drawer-header-actions">
            {actions}
            <button className="drawer-close" onClick={onClose} aria-label="Fechar">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Conteúdo rolável */}
        <div className="drawer-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
