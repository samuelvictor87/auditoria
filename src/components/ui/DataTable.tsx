// components/ui/DataTable.tsx — CRM Dibracam
import React from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';
import '../../styles/components/table.css';

export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface ActionConfig<T = any> {
  icon: React.ReactNode;
  label: string;
  onClick: (row: T) => void;
  hidden?: (row: T) => boolean;
}

interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  pagination?: PaginationConfig;
  onRowClick?: (row: T) => void;
  actions?: ActionConfig<T>[];
  rowHighlight?: (row: T) => string | null;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'Nenhum dado encontrado',
  pagination,
  onRowClick,
  actions,
  rowHighlight,
  className = '',
}: DataTableProps<T>) {
  if (loading) {
    return <LoadingState message="Carregando dados..." />;
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1;

  return (
    <div className={`table-container ${className}`}>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{ width: col.width, textAlign: col.align || 'left' }}
                >
                  {col.label}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th style={{ width: '120px', textAlign: 'right' }}>Ações</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => {
              const highlight = rowHighlight?.(row);
              return (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'table-row-clickable' : ''}
                  style={highlight ? { backgroundColor: highlight } : undefined}
                >
                  {columns.map(col => (
                    <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                      {col.render
                        ? col.render(row[col.key], row, rowIndex)
                        : row[col.key] ?? '—'}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions">
                        {actions.map((action, i) => {
                          if (action.hidden?.(row)) return null;
                          return (
                            <button
                              key={i}
                              className="pagination-btn"
                              onClick={e => { e.stopPropagation(); action.onClick(row); }}
                              title={action.label}
                              aria-label={action.label}
                            >
                              {action.icon}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="table-pagination">
          <span>
            Página {pagination.page} de {totalPages}
          </span>
          <div className="pagination-controls">
            <button
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              className="pagination-btn"
            >
              <CaretLeft size={16} />
            </button>
            <button
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              className="pagination-btn"
            >
              <CaretRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
