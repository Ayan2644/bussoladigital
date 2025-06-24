// 📁 src/pages/Login.jsx
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    console.log('Futuro login com Supabase', email, senha)
    // 🔁 Redireciona para a rota do Simulador
    window.location.href = '/simulador'
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#008CFF] to-[#ED195C] bg-clip-text text-transparent">
          Entrar na Bússola
        </h1>

        <div className="flex flex-col mb-4">
          <label className="text-sm mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="exemplo@email.com"
            required
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="text-sm mb-1">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input"
            placeholder="********"
            required
          />
        </div>

        <button className="btn-legiao">Entrar</button>


        <div className="mt-4 text-sm text-zinc-400 text-center">
          <p className="hover:underline cursor-pointer">Esqueceu a senha?</p>
          <p className="hover:underline cursor-pointer mt-1">Criar nova conta</p>
        </div>
      </form>
    </div>
  )
}
