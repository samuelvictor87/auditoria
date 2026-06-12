// pages/styleguide/sections/TextareaSection.tsx — CRM Dibracam
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Textarea } from '../../../components/ui/Textarea';
import { FileUpload } from '../../../components/ui/FileUpload';

export function TextareaSection() {
  return (
    <StyleGuideSection id="textarea" title="Textarea" description="Campo de texto multilinha e upload de arquivos.">
      <SubsectionTitle>Textarea</SubsectionTitle>
      <Preview>
        <div style={{ maxWidth: 500 }}>
          <Textarea label="Observações" placeholder="Digite suas observações..." rows={4} />
        </div>
      </Preview>
      <CodeBlock>{`<Textarea label="Observações" placeholder="Digite..." rows={4} />`}</CodeBlock>

      <div id="file-upload" style={{ scrollMarginTop: 'var(--spacing-24)' }}>
        <SubsectionTitle>FileUpload — Dropzone</SubsectionTitle>
        <Preview label="Arrastar e soltar ou clicar para enviar">
          <div style={{ maxWidth: 400 }}>
            <FileUpload
              label="Anexos"
              onUpload={files => console.log(files)}
              accept="image/*,.pdf"
              maxSize={5 * 1024 * 1024}
            />
          </div>
        </Preview>

        <SubsectionTitle>FileUpload — Avatar</SubsectionTitle>
        <Preview label="Upload de foto de perfil">
          <FileUpload
            variant="avatar"
            label="Foto de perfil"
            onUpload={files => console.log(files)}
          />
        </Preview>
        <CodeBlock>{`<FileUpload variant="dropzone" onUpload={handleUpload} maxSize={5MB} />
<FileUpload variant="avatar" onUpload={handleUpload} />`}</CodeBlock>
      </div>
    </StyleGuideSection>
  );
}
