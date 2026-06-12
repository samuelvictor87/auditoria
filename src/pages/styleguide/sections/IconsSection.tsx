// pages/styleguide/sections/IconsSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle } from '../StyleGuideSection';
import {
  House, ChartBar, Users, ChatCircle, Kanban, Target, Buildings,
  Gear, ShoppingCart, SignOut, Bell, MagnifyingGlass, Plus, PencilSimple,
  Trash, Eye, EyeSlash, X, Check, ArrowLeft, ArrowRight,
  CaretDown, CaretUp, CaretLeft, CaretRight, DotsThreeVertical,
  Funnel, Calendar, Clock, Phone, Envelope, WhatsappLogo,
  CurrencyDollar, ChartLineUp, TrendUp, TrendDown, Export,
  Copy, DownloadSimple, UploadSimple, Warning, Info, CheckCircle,
  XCircle, Star, Truck, FileText, Image, Paperclip,
  ArrowUp, ArrowDown, Handshake, UserPlus, UserMinus
} from '@phosphor-icons/react';

interface IconEntry {
  name: string;
  icon: React.ReactNode;
  context?: string;
}

const ICONS_ACOES: IconEntry[] = [
  { name: 'Plus', icon: <Plus size={24} />, context: 'Criar/Adicionar' },
  { name: 'PencilSimple', icon: <PencilSimple size={24} />, context: 'Editar' },
  { name: 'Trash', icon: <Trash size={24} />, context: 'Excluir' },
  { name: 'Eye', icon: <Eye size={24} />, context: 'Visualizar' },
  { name: 'EyeSlash', icon: <EyeSlash size={24} />, context: 'Ocultar' },
  { name: 'X', icon: <X size={24} />, context: 'Fechar' },
  { name: 'Check', icon: <Check size={24} />, context: 'Confirmar' },
  { name: 'Copy', icon: <Copy size={24} />, context: 'Copiar' },
  { name: 'Export', icon: <Export size={24} />, context: 'Exportar' },
  { name: 'DownloadSimple', icon: <DownloadSimple size={24} />, context: 'Download' },
  { name: 'UploadSimple', icon: <UploadSimple size={24} />, context: 'Upload' },
  { name: 'MagnifyingGlass', icon: <MagnifyingGlass size={24} />, context: 'Buscar' },
  { name: 'Funnel', icon: <Funnel size={24} />, context: 'Filtrar' },
  { name: 'DotsThreeVertical', icon: <DotsThreeVertical size={24} />, context: 'Menu' },
];

const ICONS_NAV: IconEntry[] = [
  { name: 'ArrowLeft', icon: <ArrowLeft size={24} />, context: 'Voltar' },
  { name: 'ArrowRight', icon: <ArrowRight size={24} />, context: 'Avançar' },
  { name: 'CaretDown', icon: <CaretDown size={24} />, context: 'Expandir' },
  { name: 'CaretUp', icon: <CaretUp size={24} />, context: 'Recolher' },
  { name: 'CaretLeft', icon: <CaretLeft size={24} />, context: 'Anterior' },
  { name: 'CaretRight', icon: <CaretRight size={24} />, context: 'Próximo' },
  { name: 'ArrowUp', icon: <ArrowUp size={24} />, context: 'Subir' },
  { name: 'ArrowDown', icon: <ArrowDown size={24} />, context: 'Descer' },
];

const ICONS_MODULOS: IconEntry[] = [
  { name: 'House', icon: <House size={24} />, context: 'Início' },
  { name: 'ChartBar', icon: <ChartBar size={24} />, context: 'Dashboards' },
  { name: 'Users', icon: <Users size={24} />, context: 'Clientes/Usuários' },
  { name: 'ChatCircle', icon: <ChatCircle size={24} />, context: 'Chat' },
  { name: 'Kanban', icon: <Kanban size={24} />, context: 'Oportunidades' },
  { name: 'Target', icon: <Target size={24} />, context: 'Metas' },
  { name: 'Buildings', icon: <Buildings size={24} />, context: 'Filiais' },
  { name: 'ShoppingCart', icon: <ShoppingCart size={24} />, context: 'Bolsão' },
  { name: 'Gear', icon: <Gear size={24} />, context: 'Configurações' },
  { name: 'SignOut', icon: <SignOut size={24} />, context: 'Sair' },
  { name: 'Bell', icon: <Bell size={24} />, context: 'Notificações' },
];

const ICONS_STATUS: IconEntry[] = [
  { name: 'Warning', icon: <Warning size={24} />, context: 'Aviso' },
  { name: 'Info', icon: <Info size={24} />, context: 'Informação' },
  { name: 'CheckCircle', icon: <CheckCircle size={24} />, context: 'Sucesso' },
  { name: 'XCircle', icon: <XCircle size={24} />, context: 'Erro' },
  { name: 'Truck', icon: <Truck size={24} />, context: 'Loading (provisório)' },
];

const ICONS_DOMINIO: IconEntry[] = [
  { name: 'CurrencyDollar', icon: <CurrencyDollar size={24} />, context: 'Valores' },
  { name: 'ChartLineUp', icon: <ChartLineUp size={24} />, context: 'Gráficos' },
  { name: 'TrendUp', icon: <TrendUp size={24} />, context: 'Tendência alta' },
  { name: 'TrendDown', icon: <TrendDown size={24} />, context: 'Tendência baixa' },
  { name: 'Calendar', icon: <Calendar size={24} />, context: 'Data' },
  { name: 'Clock', icon: <Clock size={24} />, context: 'Horário' },
  { name: 'Phone', icon: <Phone size={24} />, context: 'Telefone' },
  { name: 'Envelope', icon: <Envelope size={24} />, context: 'E-mail' },
  { name: 'WhatsappLogo', icon: <WhatsappLogo size={24} />, context: 'WhatsApp' },
  { name: 'Handshake', icon: <Handshake size={24} />, context: 'Parceria' },
  { name: 'UserPlus', icon: <UserPlus size={24} />, context: 'Adicionar' },
  { name: 'UserMinus', icon: <UserMinus size={24} />, context: 'Remover' },
  { name: 'FileText', icon: <FileText size={24} />, context: 'Documento' },
  { name: 'Image', icon: <Image size={24} />, context: 'Imagem' },
  { name: 'Paperclip', icon: <Paperclip size={24} />, context: 'Anexo' },
  { name: 'Star', icon: <Star size={24} />, context: 'Favorito' },
];

function IconGrid({ icons }: { icons: IconEntry[] }) {
  return (
    <div className="sg-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))' }}>
      {icons.map(i => (
        <div key={i.name} className="sg-icon-card">
          {i.icon}
          <span className="sg-icon-name">{i.name}</span>
          {i.context && (
            <span style={{ fontSize: '10px', color: 'var(--color-grey-400)' }}>{i.context}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function IconsSection() {
  return (
    <StyleGuideSection id="icones" title="Ícones — Phosphor" description="Biblioteca oficial: @phosphor-icons/react v2.1. Peso padrão: regular. Tamanho padrão: 16–20px.">
      <SubsectionTitle>Ações</SubsectionTitle>
      <IconGrid icons={ICONS_ACOES} />

      <SubsectionTitle>Navegação</SubsectionTitle>
      <IconGrid icons={ICONS_NAV} />

      <SubsectionTitle>Módulos do CRM</SubsectionTitle>
      <IconGrid icons={ICONS_MODULOS} />

      <SubsectionTitle>Status e Feedback</SubsectionTitle>
      <IconGrid icons={ICONS_STATUS} />

      <SubsectionTitle>Domínio / Negócio</SubsectionTitle>
      <IconGrid icons={ICONS_DOMINIO} />
    </StyleGuideSection>
  );
}
