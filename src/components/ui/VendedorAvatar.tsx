// components/ui/VendedorAvatar.tsx — CRM Dibracam
import { getInitials } from '../../lib/formatters';

interface VendedorAvatarProps {
  foto: string | null;
  nome: string | null;
  size?: number;
}

export function VendedorAvatar({ foto, nome, size = 28 }: VendedorAvatarProps) {
  const initials = nome ? getInitials(nome) : '?';
  if (foto) {
    return (
      <img
        src={foto}
        alt={nome ?? 'Vendedor'}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          border: '1px solid var(--color-grey-200)',
        }}
        onError={e => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--color-brand-50)',
        color: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.36,
        fontWeight: 600,
        flexShrink: 0,
        border: '1px solid var(--color-grey-200)',
        letterSpacing: '0.5px',
      }}
    >
      {initials}
    </div>
  );
}
