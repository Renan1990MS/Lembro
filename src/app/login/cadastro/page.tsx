'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/app/lib/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para Login Normal
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/'; 
    } catch (err: any) {
      setError('E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  // Função disparada ao clicar em "ESQUECEU?" ou no modo de recuperação
  const handleForgotPassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!email) {
      setError('Por favor, digite seu e-mail no campo acima.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      
      setTimeout(() => {
        setIsForgotMode(false);
        setSuccessMessage('');
      }, 6000);
    } catch (err: any) {
      // ESTA LINHA VAI DIZER O ERRO REAL NO NAVEGADOR
      console.error("Erro do Firebase:", err.code);
      
      if (err.code === 'auth/user-not-found') {
        setError('Este e-mail não está cadastrado no sistema.');
      } else if (err.code === 'auth/invalid-email') {
        setError('O formato do e-mail é inválido.');
      } else {
        setError('Erro ao enviar e-mail. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDF2F2] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-50">
        <div className="h-2 w-full bg-[#D63384]"></div>
        
        <div className="p-8 text-center">
          <div className="mb-8">
            <Link href="/">
              <h1 className="text-4xl font-serif text-[#D63384] italic mb-2">Lembrô<span className="text-pink-200">...</span></h1>
            </Link>
            <h2 className="text-2xl font-bold text-[#3D144C] mt-4">
              {isForgotMode ? 'Recuperar Senha' : 'Bem-vindo!'}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {isForgotMode ? 'Enviaremos um link para o seu e-mail' : 'Acesse sua conta para gerenciar suas memórias.'}
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-xl text-xs text-left">
              <CheckCircle2 size={16} className="shrink-0" /> {successMessage}
            </div>
          )}

          <form onSubmit={isForgotMode ? handleForgotPassword : handleLogin} className="space-y-5 text-left">
            <Input 
              label="E-MAIL" 
              type="email" 
              placeholder="seu@email.com" 
              value={email} 
              onChange={(e: any) => setEmail(e.target.value)} 
              icon={<Mail size={18}/>} 
            />

            {!isForgotMode && (
              <div className="relative">
                <div className="flex justify-between items-center mb-1 px-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">SENHA</label>
                  <button 
                    type="button" 
                    onClick={() => {
                        setIsForgotMode(true);
                        setError('');
                    }}
                    className="text-[10px] font-bold text-[#D63384] hover:opacity-70 transition-opacity"
                  >
                    ESQUECEU?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-pink-300">
                    <Lock size={18}/>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="........"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-pink-100 rounded-xl py-2.5 pl-10 pr-12 text-sm text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-pink-100 focus:border-[#D63384] outline-none transition-all shadow-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-3 text-pink-300 hover:text-[#D63384]"
                  >
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-[11px] font-bold bg-red-50 p-2 rounded-lg text-center border border-red-100 transition-all">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D63384] hover:bg-[#c12a74] text-white py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>{isForgotMode ? 'ENVIAR LINK DE RECUPERAÇÃO' : 'ENTRAR NA CONTA'} <ArrowRight size={18}/></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 flex flex-col gap-4 text-center border-t border-gray-50">
            {isForgotMode ? (
              <button 
                onClick={() => setIsForgotMode(false)}
                className="text-sm text-gray-400 font-semibold hover:text-[#D63384] transition-colors"
              >
                Voltar para o Login
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Não tem uma conta? <Link href="/login/cadastro" className="text-[#D63384] font-bold hover:underline">Criar agora</Link>
              </p>
            )}
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-300 tracking-widest uppercase">
               <span className="text-pink-200 text-xs">❤</span> ETERNIZE MOMENTOS <span className="text-pink-200 text-xs">❤</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Input({ label, icon, ...props }: any) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-3 text-pink-300">{icon}</div>}
        <input
          {...props}
          className="w-full bg-white border border-pink-100 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-pink-100 focus:border-[#D63384] outline-none transition-all shadow-sm"
        />
      </div>
    </div>
  );
}