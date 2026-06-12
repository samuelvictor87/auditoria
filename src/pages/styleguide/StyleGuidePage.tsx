// pages/styleguide/StyleGuidePage.tsx — CRM Dibracam
// Documentação visual do Design System — rota /styleguide
import './styleguide.css';
import { StyleGuideSidebar } from './StyleGuideSidebar';
import { ColorsSection } from './sections/ColorsSection';
import { TypographySection } from './sections/TypographySection';
import { SpacingRadiusSection } from './sections/SpacingRadiusSection';
import { ShadowsSection } from './sections/ShadowsSection';
import { StatesSection } from './sections/StatesSection';
import { ButtonSection } from './sections/ButtonSection';
import { InputSection } from './sections/InputSection';
import { SelectSection } from './sections/SelectSection';
import { TextareaSection } from './sections/TextareaSection';
import { AvatarSection } from './sections/AvatarSection';
import { BadgeSection } from './sections/BadgeSection';
import { CardSection } from './sections/CardSection';
import { DataTableSection } from './sections/DataTableSection';
import { TabsSection } from './sections/TabsSection';
import { AccordionSection } from './sections/AccordionSection';
import { ModalSection } from './sections/ModalSection';
import { DrawerSection } from './sections/DrawerSection';
import { ToastSection } from './sections/ToastSection';
import { FeedbackSection } from './sections/FeedbackSection';
import { IconsSection } from './sections/IconsSection';
import { ExamplesSection } from './sections/ExamplesSection';

export function StyleGuidePage() {
  return (
    <div className="sg-layout">
      <StyleGuideSidebar />
      <main className="sg-main">
        <h1 className="sg-main-title">Design System</h1>
        <p className="sg-main-desc">Documentação visual de todos os design tokens e componentes</p>

        {/* Fundação */}
        <ColorsSection />
        <TypographySection />
        <SpacingRadiusSection />
        <ShadowsSection />
        <StatesSection />

        {/* Inputs e Formulários */}
        <ButtonSection />
        <InputSection />
        <SelectSection />
        <TextareaSection />

        {/* Exibição de Dados */}
        <AvatarSection />
        <BadgeSection />
        <CardSection />
        <DataTableSection />
        <TabsSection />
        <AccordionSection />

        {/* Feedback */}
        <ModalSection />
        <DrawerSection />
        <ToastSection />
        <FeedbackSection />

        {/* Ícones */}
        <IconsSection />

        {/* Exemplos Reais */}
        <ExamplesSection />
      </main>
    </div>
  );
}
