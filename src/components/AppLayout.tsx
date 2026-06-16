import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ListChecks, 
  ChartBar, 
  Clock, 
  Gear, 
  SignOut,
  User,
  Heart
} from '@phosphor-icons/react';
import '../styles/components/layout.css';
import '../styles/components/sidebar.css';
import '../styles/components/header.css';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [perfil, setPerfil] = useState<any>(null);

  useEffect(() => {
    // Verificar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login', { replace: true });
      } else {
        setUser(session.user);
        buscarPerfil(session.user.id);
      }
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        setPerfil(null);
        navigate('/login', { replace: true });
      } else {
        setUser(session.user);
        buscarPerfil(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const buscarPerfil = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('perfis')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error && data) {
        setPerfil(data);
      }
    } catch (err) {
      console.error('Erro ao buscar perfil:', err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid var(--color-border)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>Carregando sessão...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) return null;

  // Função auxiliar para determinar título do header baseado na rota
  const getPageInfo = () => {
    const path = location.pathname;
    if (path.includes('/app/responder')) {
      return { title: 'Responder Auditorias', subtitle: 'Examine seu dia com sinceridade' };
    }
    if (path.includes('/app/dashboard')) {
      return { title: 'Dashboard', subtitle: 'Acompanhe sua consistência e evolução' };
    }
    if (path.includes('/app/historico')) {
      return { title: 'Histórico', subtitle: 'Consulte auditorias respondidas no passado' };
    }
    if (path.includes('/app/configuracoes')) {
      return { title: 'Configurações', subtitle: 'Gerencie seus modelos de auditorias e perguntas' };
    }
    return { title: 'Minha Auditoria', subtitle: 'Desenvolvimento pessoal diário' };
  };

  const pageInfo = getPageInfo();

  return (
    <div className="app-layout">
      {/* SIDEBAR DESKTOP */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">
            <Heart size={24} weight="fill" />
          </span>
          <span className="sidebar-logo-text">Auditoria</span>
        </div>

        <nav className="sidebar-nav">
          <Link 
            to="/app/responder" 
            className={`sidebar-item ${location.pathname.includes('/app/responder') ? 'sidebar-item-active' : ''}`}
          >
            <span className="sidebar-item-icon">
              <ListChecks size={20} />
            </span>
            <span>Responder</span>
          </Link>

          <Link 
            to="/app/dashboard" 
            className={`sidebar-item ${location.pathname.includes('/app/dashboard') ? 'sidebar-item-active' : ''}`}
          >
            <span className="sidebar-item-icon">
              <ChartBar size={20} />
            </span>
            <span>Dashboard</span>
          </Link>

          <Link 
            to="/app/historico" 
            className={`sidebar-item ${location.pathname.includes('/app/historico') ? 'sidebar-item-active' : ''}`}
          >
            <span className="sidebar-item-icon">
              <Clock size={20} />
            </span>
            <span>Histórico</span>
          </Link>

          <Link 
            to="/app/configuracoes" 
            className={`sidebar-item ${location.pathname.includes('/app/configuracoes') ? 'sidebar-item-active' : ''}`}
          >
            <span className="sidebar-item-icon">
              <Gear size={20} />
            </span>
            <span>Configurações</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              <User size={18} />
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">
                {perfil?.nome_completo || user.email.split('@')[0]}
              </div>
              <div className="sidebar-user-role" title={user.email}>
                {user.email}
              </div>
            </div>
            <button 
              onClick={handleLogout}
              style={{ color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Sair"
            >
              <SignOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="main-wrapper">
        <header className="header">
          <div className="header-left">
            <h1 className="header-title">{pageInfo.title}</h1>
            <span className="header-subtitle">{pageInfo.subtitle}</span>
          </div>

          <div className="header-right">
            <div className="header-avatar" title={user.email}>
              {perfil?.nome_completo ? perfil.nome_completo[0].toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        <main className="content-container">
          <Outlet />
        </main>
      </div>

      {/* BOTTOM NAV MOBILE */}
      <nav className="mobile-nav">
        <Link 
          to="/app/responder" 
          className={`mobile-nav-item ${location.pathname.includes('/app/responder') ? 'mobile-nav-item-active' : ''}`}
        >
          <ListChecks size={22} className="mobile-nav-icon" />
          <span>Responder</span>
        </Link>

        <Link 
          to="/app/dashboard" 
          className={`mobile-nav-item ${location.pathname.includes('/app/dashboard') ? 'mobile-nav-item-active' : ''}`}
        >
          <ChartBar size={22} className="mobile-nav-icon" />
          <span>Dashboard</span>
        </Link>

        <Link 
          to="/app/historico" 
          className={`mobile-nav-item ${location.pathname.includes('/app/historico') ? 'mobile-nav-item-active' : ''}`}
        >
          <Clock size={22} className="mobile-nav-icon" />
          <span>Histórico</span>
        </Link>

        <Link 
          to="/app/configuracoes" 
          className={`mobile-nav-item ${location.pathname.includes('/app/configuracoes') ? 'mobile-nav-item-active' : ''}`}
        >
          <Gear size={22} className="mobile-nav-icon" />
          <span>Configurações</span>
        </Link>
      </nav>
    </div>
  );
}
