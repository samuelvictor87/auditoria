// components/ui/Card.tsx — CRM Dibracam
import React from 'react';
import '../../styles/components/card.css';

type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  padding?: CardPadding;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, padding = 'md', className = '', style }: CardProps) {
  return (
    <div className={`card card-${padding} ${className}`} style={style}>
      {children}
    </div>
  );
}

// ─── KPI Card ────────────────────────────────────────
interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  iconColor?: 'blue' | 'green' | 'yellow' | 'red';
}

import { ArrowUp, ArrowDown } from '@phosphor-icons/react';

export function KpiCard({ label, value, trend, trendLabel, icon, iconColor = 'blue' }: KpiCardProps) {
  const trendUp = trend !== undefined && trend >= 0;

  return (
    <div className="kpi-card">
      <div className="kpi-card-header">
        <div>
          <p className="kpi-label">{label}</p>
          <p className="kpi-value">{value}</p>
        </div>
        <div className={`kpi-icon kpi-icon-${iconColor}`}>{icon}</div>
      </div>
      {trend !== undefined && (
        <div className={`kpi-trend kpi-trend-${trendUp ? 'up' : 'down'}`}>
          {trendUp ? <ArrowUp size={12} weight="bold" /> : <ArrowDown size={12} weight="bold" />}
          <span>{Math.abs(trend)}% {trendLabel ?? (trendUp ? 'vs mês anterior' : 'vs mês anterior')}</span>
        </div>
      )}
    </div>
  );
}
