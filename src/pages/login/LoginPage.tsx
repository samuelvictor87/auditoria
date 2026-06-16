import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { Heart, Envelope, Lock, User } from '@phosphor-icons/react';
import '../../styles/components/login.css';
import '../../styles/components/input.css';

export function LoginPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  // Se o usuário já estiver logado, redireciona diretamente para o app
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/app/responder', { replace: true });
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Campos obrigatórios', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (!isLogin && !fullName) {
      toast.error('Campos obrigatórios', 'Preencha seu nome completo.');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Fluxo de Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        navigate('/app/responder', { replace: true });
      } else {
        // Fluxo de Cadastro
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;
        
        // Exibe mensagem informativa de confirmação ou faz login automático (dependendo se a confirmação de e-mail estiver habilitada)
        setIsLogin(true);
        toast.success('Conta criada!', 'Faça login para continuar.');
      }
    } catch (err: any) {
      console.error(err);
      const msg = err.message || 'Ocorreu um erro ao processar sua solicitação.';
      toast.error('Erro de Autenticação', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Painel Esquerdo: Formulário */}
      <div className="login-form-panel">
        <div className="login-logo">
          <Heart size={36} weight="fill" />
          <span className="login-logo-text">Auditoria</span>
        </div>

        <h2 className="login-title">{isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
        <p className="login-subtitle">
          {isLogin 
            ? 'Faça login para continuar sua auditoria diária.' 
            : 'Comece a monitorar suas atitudes e produtividade.'
          }
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-wrapper">
              <label className="input-label input-label-required" htmlFor="fullName">Nome Completo</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  id="fullName"
                  type="text"
                  className="input-field"
                  placeholder="Seu nome"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div className="input-wrapper">
            <label className="input-label input-label-required" htmlFor="email">E-mail</label>
            <div className="input-with-icon">
              <Envelope size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="seu-email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="input-wrapper">
            <label className="input-label input-label-required" htmlFor="password">Senha</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            full 
            loading={loading}
            style={{ marginTop: 'var(--spacing-8)' }}
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </Button>
        </form>

        <div className="login-toggle-mode">
          {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}
          <button 
            type="button" 
            className="login-toggle-link"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            disabled={loading}
          >
            {isLogin ? 'Cadastre-se' : 'Faça Login'}
          </button>
        </div>
      </div>

      {/* Painel Direito: Hero */}
      <div className="login-hero-panel">
        <div className="login-hero-pattern" />
        <div className="login-hero-overlay">
          <h1 className="login-hero-tagline">
            "A vida não examinada não vale a pena ser vivida."
          </h1>
          <p className="login-hero-sub">
            — Sócrates. Faça sua auditoria pessoal todos os dias com foco em integridade, fé e performance.
          </p>
        </div>
      </div>
    </div>
  );
}
