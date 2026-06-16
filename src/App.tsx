import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { StyleGuidePage } from './pages/styleguide/StyleGuidePage';
import { LoginPage } from './pages/login/LoginPage';
import AppLayout from './components/AppLayout';
import { ResponderPage } from './pages/responder/ResponderPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { HistoricoPage } from './pages/historico/HistoricoPage';
import { ConfiguracoesPage } from './pages/configuracoes/ConfiguracoesPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* Rota pública de login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rota do guia de estilos */}
          <Route path="/styleguide" element={<StyleGuidePage />} />

          {/* Rotas autenticadas envelopadas pelo AppLayout */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/responder" replace />} />
            <Route path="responder" element={<ResponderPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="historico" element={<HistoricoPage />} />
            <Route path="configuracoes" element={<ConfiguracoesPage />} />
          </Route>

          {/* Fallback de redirecionamento para o app */}
          <Route path="/" element={<Navigate to="/app/responder" replace />} />
          <Route path="*" element={<Navigate to="/app/responder" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
