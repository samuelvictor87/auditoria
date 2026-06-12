// components/ui/Avatar.tsx — CRM Dibracam


interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: number;
  fallback?: string;
}

function getInitialsFromName(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase();
}

export function Avatar({ src, name, size = 32, fallback }: AvatarProps) {
  const initials = fallback || (name ? getInitialsFromName(name) : '?');

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? 'Avatar'}
        className="avatar-img"
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
          (e.target as HTMLImageElement).nextElementSibling &&
            ((e.target as HTMLImageElement).nextElementSibling as HTMLElement).style.removeProperty('display');
        }}
      />
    );
  }

  return (
    <div
      className="avatar-fallback"
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
