// src/pages/Login.jsx
import { useState } from 'react';
import { supabase } from '../supabase'; // Verifique se o caminho está correto
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      if (isLogin) {
        // Lógica de Login
        response = await supabase.auth.signInWithPassword({ email, password });
      } else {
        // Lógica de Registo
        response = await supabase.auth.signUp({ email, password });
      }

      if (response.error) throw response.error;

      // Se o login/registo for bem-sucedido, navega para a página principal
      navigate('/'); 

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center p-4">
      <img
          src="/logo-legiao.png"
          alt="Logo Legião"
          className="w-40 md:w-60 mb-6 drop-shadow-[0_0_20px_rgba(0,140,255,0.4)]"
      />
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800">
        <h1 className="text-3xl font-bold text-center mb-2 text-gradient">
          {isLogin ? 'Acessar Bússola' : 'Criar Conta'}
        </h1>
        <p className="text-center text-zinc-400 text-sm mb-6">
          {isLogin ? 'Bem-vindo de volta, Estratega.' : 'Comece sua jornada para a excelência.'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            placeholder="seu@email.com"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            placeholder="••••••••••"
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <button type="submit" className="btn-legiao w-full" disabled={loading}>
            {loading ? 'Aguarde...' : (isLogin ? 'Entrar' : 'Registrar')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-zinc-400 hover:text-white hover:underline">
            {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
}
