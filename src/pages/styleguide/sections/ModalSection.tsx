// pages/styleguide/sections/ModalSection.tsx — CRM Dibracam
import { useState } from 'react';
import { StyleGuideSection, SubsectionTitle, Preview, CodeBlock } from '../StyleGuideSection';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Warning, UserCheck, X } from '@phosphor-icons/react';

export function ModalSection() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <StyleGuideSection id="modal" title="Modal" description="Diálogo de sobreposição para confirmações, formulários e alertas.">
      <SubsectionTitle>Modal Positivo / Padrão</SubsectionTitle>
      <Preview>
        <Button variant="primary" onClick={() => setOpen1(true)}>Ativar Usuário</Button>
        <Modal 
          open={open1} 
          onClose={() => setOpen1(false)}
          size="sm"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen1(false)}>Cancelar</Button>
              <Button variant="primary" onClick={() => setOpen1(false)}>Ativar</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: -24,
              left: -24,
              width: 216,
              height: 216,
              backgroundImage: 'url(/assets/Background_pattern_decorative.svg)',
              backgroundRepeat: 'no-repeat',
              pointerEvents: 'none',
              zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-16)', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-success-50)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={24} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>Ativar Usuário</h3>
                </div>
                <button type="button" className="modal-close-btn" onClick={() => setOpen1(false)} aria-label="Fechar" style={{ marginRight: '-8px' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-grey-600)', marginBottom: 'var(--spacing-8)' }}>
                  Tem certeza que deseja ativar o usuário <strong style={{ color: 'var(--color-text)' }}>João Paulo Franco Da Silva</strong>?
                </p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-grey-500)', lineHeight: 1.5 }}>
                  O usuário terá acesso ao sistema imediatamente após a confirmação.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </Preview>

      <SubsectionTitle>Modal Destrutivo</SubsectionTitle>
      <Preview>
        <Button variant="destructive" onClick={() => setOpen2(true)}>Inativar Usuário</Button>
        <Modal 
          open={open2} 
          onClose={() => setOpen2(false)}
          size="sm"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen2(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={() => setOpen2(false)}>Inativar</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: -24,
              left: -24,
              width: 216,
              height: 216,
              backgroundImage: 'url(/assets/Background_pattern_decorative.svg)',
              backgroundRepeat: 'no-repeat',
              pointerEvents: 'none',
              zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-16)', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-error-50)', color: 'var(--color-destructive)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Warning size={24} weight="fill" />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>Inativar Usuário</h3>
                </div>
                <button type="button" className="modal-close-btn" onClick={() => setOpen2(false)} aria-label="Fechar" style={{ marginRight: '-8px' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-grey-600)', marginBottom: 'var(--spacing-8)' }}>
                  Tem certeza que deseja inativar o usuário <strong style={{ color: 'var(--color-text)' }}>Murillo Pereira da Silva</strong>?
                </p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-grey-500)', lineHeight: 1.5 }}>
                  O usuário perderá o acesso ao sistema imediatamente após a confirmação.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </Preview>
      <CodeBlock>{`<Modal 
  open={isOpen} 
  onClose={close} 
  size="sm"
  footer={
    <>
      <Button variant="secondary" onClick={close}>Cancelar</Button>
      <Button variant="primary" onClick={confirm}>Confirmar</Button>
    </>
  }
>
  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
    <div style={{ position: 'absolute', top: -24, left: -24, width: 216, height: 216, backgroundImage: 'url(/assets/Background_pattern_decorative.svg)', backgroundRepeat: 'no-repeat', pointerEvents: 'none', zIndex: 0 }} />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-16)', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-success-50)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCheck size={24} />
          </div>
          <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, margin: 0 }}>Título</h3>
        </div>
        <button type="button" className="modal-close-btn" onClick={close}><X size={20} /></button>
      </div>
      <p style={{ margin: 0, fontSize: 'var(--font-size-md)' }}>Conteúdo do modal</p>
    </div>
  </div>
</Modal>`}</CodeBlock>
    </StyleGuideSection>
  );
}
