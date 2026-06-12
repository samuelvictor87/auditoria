import { WhatsappLogo, Storefront, Handshake, PencilSimple } from '@phosphor-icons/react';

interface OrigemIconProps {
  origem: string | null;
  size?: number;
}

export function OrigemIcon({ origem, size = 16 }: OrigemIconProps) {
  if (!origem) return null;

  switch (origem.toLowerCase()) {
    case 'whatsapp':
      return <WhatsappLogo size={size} color="#25D366" weight="fill" />;
    case 'mercado_livre':
      return <Storefront size={size} color="#FFE600" weight="fill" />;
    case 'bolsao':
      return <Handshake size={size} color="#F59E0B" weight="fill" />;
    case 'manual':
      return <PencilSimple size={size} color="#6366F1" weight="fill" />;
    default:
      return null;
  }
}
