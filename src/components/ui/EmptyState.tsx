// components/ui/EmptyState.tsx — CRM Dibracam
import React from 'react';
import { Truck } from '@phosphor-icons/react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-48) var(--spacing-24)',
      textAlign: 'center',
      gap: 'var(--spacing-16)'
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        backgroundColor: 'var(--color-grey-50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-grey-400)',
        marginBottom: 'var(--spacing-8)'
      }}>
        {icon || <Truck size={40} weight="light" />}
      </div>
      
      <div>
        <h3 style={{ 
          margin: 0, 
          fontSize: 'var(--font-size-lg)', 
          fontWeight: 600, 
          color: 'var(--color-text)' 
        }}>
          {title}
        </h3>
        
        {description && (
          <p style={{ 
            margin: 'var(--spacing-8) 0 0', 
            fontSize: 'var(--font-size-md)', 
            color: 'var(--color-grey-500)',
            maxWidth: 400
          }}>
            {description}
          </p>
        )}
      </div>

      {action && (
        <div style={{ marginTop: 'var(--spacing-16)' }}>
          {action}
        </div>
      )}
    </div>
  );
}
