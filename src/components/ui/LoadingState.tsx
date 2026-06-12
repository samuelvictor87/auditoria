// components/ui/LoadingState.tsx — CRM Dibracam
import React from 'react';
import { Truck } from '@phosphor-icons/react';

interface LoadingStateProps {
  variant?: 'fullscreen' | 'inline' | 'overlay';
  message?: string;
}

export function LoadingState({ variant = 'inline', message = 'Carregando...' }: LoadingStateProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-16)',
    padding: 'var(--spacing-24)',
    color: 'var(--color-primary)',
    textAlign: 'center'
  };

  if (variant === 'fullscreen') {
    containerStyle.height = '100vh';
    containerStyle.width = '100vw';
    containerStyle.position = 'fixed';
    containerStyle.top = 0;
    containerStyle.left = 0;
    containerStyle.backgroundColor = 'var(--color-background)';
    containerStyle.zIndex = 9999;
  } else if (variant === 'overlay') {
    containerStyle.position = 'absolute';
    containerStyle.top = 0;
    containerStyle.left = 0;
    containerStyle.right = 0;
    containerStyle.bottom = 0;
    containerStyle.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    containerStyle.zIndex = 10;
  } else {
    // inline
    containerStyle.width = '100%';
    containerStyle.minHeight = '200px';
  }

  return (
    <div style={containerStyle}>
      <div style={{ animation: 'pulse 1.5s infinite ease-in-out' }}>
        {/* Placeholder Caminhão Animado */}
        <Truck size={48} weight="duotone" />
      </div>
      <p style={{ margin: 0, fontSize: 'var(--font-size-md)', color: 'var(--color-grey-600)' }}>
        {message}
      </p>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
