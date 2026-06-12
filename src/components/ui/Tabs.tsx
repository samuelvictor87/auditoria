// components/ui/Tabs.tsx — CRM Dibracam
import React from 'react';
import '../../styles/components/tabs.css';

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (key: string) => void;
  variant?: 'underline' | 'pill';
}

export function Tabs({ tabs, activeTab, onChange, variant = 'underline' }: TabsProps) {
  return (
    <div className={`tabs tabs-${variant}`} role="tablist">
      {tabs.map(tab => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            className={`tab-item ${isActive ? 'tab-active' : ''}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="tab-badge">{tab.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
