// components/ui/DrawerOportunidade.tsx — CRM Dibracam
// Container reutilizável — pode ser usado em qualquer contexto do sistema
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { OportunidadeDetalhe } from '../../pages/oportunidades/components/OportunidadeDetalhe';
import type { EstagioFunil } from '../../services/oportunidadesService';
import '../../styles/components/drawer-oportunidade.css';

interface DrawerOportunidadeProps {
  open: boolean;
  oportunidadeId: string | null;
  estagios: EstagioFunil[];
  onClose: () => void;
  onUpdate?: () => void;
}

export function DrawerOportunidade({ open, oportunidadeId, estagios, onClose, onUpdate }: DrawerOportunidadeProps) {
  // Fechar com Escape
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Travar scroll do body
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open || !oportunidadeId) return null;

  return createPortal(
    <div className="dop-overlay" role="dialog" aria-modal="true">
      {/* Área de overlay (click fecha) */}
      <div
        className="dop-overlay-bg"
        onClick={onClose}
        aria-label="Fechar painel"
      />

      {/* Drawer */}
      <div className="dop-drawer">
        <OportunidadeDetalhe
          oportunidadeId={oportunidadeId}
          estagios={estagios}
          onClose={onClose}
          onUpdate={onUpdate}
        />
      </div>
    </div>,
    document.body
  );
}
