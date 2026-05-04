'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// CAMINHO CORRIGIDO: Sobe um nível para sair de 'login' e entra em 'lib'
import { auth } from '../lib/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Mail, Lock, ArrowRight, Heart, Loader2, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Novo estado para o olho da senha
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redireciona para a home. Certifique-se que src/app/page.tsx existe.
      router.push('/'); 
    } catch (err: any) {
      setError('E-mail ou senha incorretos. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-white to-[#FDF2F2] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-50 relative">
        <div className="h-2 w-full bg-[#D63384]"></div>

        <div className="p-8 md:p-12 flex flex-col items-center">
          <Link href="/" className="mb-8 transition-transform hover:scale-105">
            <h1 className="text-5xl font-serif text-[#D63384] italic tracking-tighter">
              Lembrô<span className="text-pink-300">...</span>
            </h1>
          </Link>

          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#3D144C]">Bem-vindo!</h2>
            <p className="text-gray-400 text-sm mt-2">Acesse sua conta para gerenciar suas memórias.</p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-pink-300 group-focus-within:text-[#D63384] transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-pink-100 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all text-[#3D144C] placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Senha</label>
                <Link href="#" className="text-[10px] font-bold text-[#D63384] hover:underline uppercase tracking-tighter">Esqueceu?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-pink-300 group-focus-within:text-[#D63384] transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-pink-100 rounded-xl py-3.5 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all text-[#3D144C] placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-pink-300 hover:text-[#D63384] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D63384] hover:bg-[#B91C1C] text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-4 uppercase tracking-widest text-xs disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <>Entrar na conta <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-10 text-center space-y-4">
            <p className="text-gray-500 text-sm">
              Não tem uma conta? 
              <Link href="/login/cadastro" className="ml-1 text-[#D63384] font-bold hover:underline">
                Criar agora
              </Link>
            </p>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-300 font-bold uppercase tracking-[2px] pt-4">
              <Heart size={10} fill="currentColor" className="text-pink-200" />
              Eternize Momentos
              <Heart size={10} fill="currentColor" className="text-pink-200" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}