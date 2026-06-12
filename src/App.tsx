import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { ToastProvider } from './components/ui/Toast';
import { StyleGuidePage } from './pages/styleguide/StyleGuidePage';

function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <h1 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Mais Gestão</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-grey-500)' }}>
          Projeto inicializado com sucesso na porta 3002!
        </p>
        <Button variant="primary" onClick={() => alert('Funcionando!')}>
          Testar Componente
        </Button>
        <div style={{ marginTop: '2rem' }}>
          <a href="/styleguide" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Ir para o Styleguide</a>
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/styleguide" element={<StyleGuidePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
