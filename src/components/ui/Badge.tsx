// components/ui/Badge.tsx — CRM Dibracam
import React from 'react';
import '../../styles/components/badge.css';

type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'primary';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}

// Helpers de conveniência para status comuns
export function ClientStatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    ativo: 'success',
    inativo: 'error',
    prospecto: 'warning',
  };
  const labels: Record<string, string> = {
    ativo: 'Ativo',
    inativo: 'Inativo',
    prospecto: 'Prospecto',
  };
  return <Badge variant={map[status] ?? 'neutral'}>{labels[status] ?? status}</Badge>;
}

export function OpportunityPriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, BadgeVariant> = { alta: 'error', media: 'warning', baixa: 'neutral' };
  const labels: Record<string, string> = { alta: 'Alta', media: 'Média', baixa: 'Baixa' };
  return <Badge variant={map[priority] ?? 'neutral'}>{labels[priority] ?? priority}</Badge>;
}

export function UserRoleBadge({ role }: { role: string }) {
  const map: Record<string, BadgeVariant> = { 
    Administrador: 'primary', 
    Gestor_Comercial: 'warning', 
    Vendedor: 'neutral' 
  };
  const labels: Record<string, string> = { 
    Administrador: 'Administrador', 
    Gestor_Comercial: 'Gestor Comercial', 
    Vendedor: 'Vendedor' 
  };
  return <Badge variant={map[role] ?? 'neutral'}>{labels[role] ?? role}</Badge>;
}

export function TaskStatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    pendente: 'warning',
    em_andamento: 'primary',
    concluida: 'success',
    cancelada: 'error',
  };
  const labels: Record<string, string> = {
    pendente: 'Pendente',
    em_andamento: 'Em andamento',
    concluida: 'Concluída',
    cancelada: 'Cancelada',
  };
  return <Badge variant={map[status] ?? 'neutral'}>{labels[status] ?? status}</Badge>;
}
