// pages/styleguide/sections/AvatarSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Avatar } from '../../../components/ui/Avatar';

export function AvatarSection() {
  return (
    <StyleGuideSection id="avatar" title="Avatar" description="Exibe foto ou iniciais do usuário. Fallback automático para iniciais quando não há imagem.">
      <SubsectionTitle>Tamanhos</SubsectionTitle>
      <Preview>
        <div className="sg-flex sg-flex-center">
          <Avatar name="João Silva" size={24} />
          <Avatar name="João Silva" size={32} />
          <Avatar name="João Silva" size={40} />
          <Avatar name="João Silva" size={48} />
          <Avatar name="João Silva" size={64} />
        </div>
      </Preview>

      <SubsectionTitle>Variações</SubsectionTitle>
      <Preview>
        <div className="sg-flex sg-flex-center">
          <Avatar name="Ana Beatriz" size={40} />
          <Avatar name="Carlos" size={40} />
          <Avatar name={null} size={40} />
          <Avatar name="Maria Luísa Ferreira" size={40} />
        </div>
      </Preview>
      <CodeBlock>{`<Avatar name="João Silva" size={40} />
<Avatar src="https://..." name="João" size={40} />
<Avatar name={null} size={40} /> {/* Mostra "?" */}`}</CodeBlock>
    </StyleGuideSection>
  );
}
