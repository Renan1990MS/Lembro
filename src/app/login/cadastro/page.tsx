'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { auth, db } from '@/app/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, MapPin, Phone, CreditCard, CheckCircle2 } from 'lucide-react';

export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    confirmarEmail: '',
    password: '',
    confirmarSenha: '',
    cpf: '',
    celular: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    referencia: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmarSenha) return setError('As senhas não coincidem.');
    if (formData.email !== formData.confirmarEmail) return setError('Os e-mails não coincidem.');

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.nome });

      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        celular: formData.celular,
        endereco: {
          cep: formData.cep,
          rua: formData.endereco,
          numero: formData.numero,
          complemento: formData.complemento,
          referencia: formData.referencia,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado
        },
        createdAt: new Date().toISOString()
      });

      setSuccess(true);
      setFormData({
        nome: '', email: '', confirmarEmail: '', password: '', confirmarSenha: '',
        cpf: '', celular: '', cep: '', endereco: '', numero: '',
        complemento: '', referencia: '', bairro: '', cidade: '', estado: ''
      });
      
    } catch (err: any) {
      setError(err.code === 'auth/email-already-in-use' ? 'E-mail já cadastrado.' : 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDF2F2] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-50">
        <div className="h-2 w-full bg-[#00CED1]"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-10 border-b pb-6">
            <Link href="/">
              <h1 className="text-3xl font-serif text-[#D63384] italic">Lembrô<span className="text-pink-300">...</span></h1>
            </Link>
            <div className="text-right">
              <h2 className="text-xl font-bold text-[#3D144C]">Identificação</h2>
              <p className="text-xs text-gray-400">Faça o seu login ou crie uma conta</p>
            </div>
          </div>

          {success && (
            <div className="mb-8 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="text-emerald-500" size={24} />
              <div>
                <p className="font-bold">Cadastro criado com sucesso!</p>
                <p className="text-sm">Clique em "Fazer Login" para acessar sua conta agora mesmo.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-8">
            <section>
              <h3 className="flex items-center gap-2 font-bold text-[#3D144C] mb-4 uppercase text-xs tracking-wider">
                <Lock size={16} className="text-[#00CED1]" /> Dados de Acesso
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="E-mail" name="email" type="email" placeholder="exemplo@email.com" value={formData.email} onChange={handleChange} icon={<Mail size={18}/>} />
                <Input label="Confirmar E-mail" name="confirmarEmail" type="email" placeholder="Repita seu e-mail" value={formData.confirmarEmail} onChange={handleChange} icon={<Mail size={18}/>} />
                <div className="relative">
                  <Input label="Crie uma senha" name="password" type={showPassword ? "text" : "password"} placeholder="No mínimo 6 caracteres" value={formData.password} onChange={handleChange} icon={<Lock size={18}/>} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-pink-300">
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                <Input label="Confirmar senha" name="confirmarSenha" type="password" placeholder="Repita sua senha" value={formData.confirmarSenha} onChange={handleChange} icon={<Lock size={18}/>} />
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="space-y-4">
                <h3 className="flex items-center gap-2 font-bold text-[#3D144C] border-b pb-2 uppercase text-xs tracking-wider">
                  <User size={16} className="text-[#00CED1]" /> Dados Pessoais
                </h3>
                <Input label="Nome Completo" name="nome" placeholder="Digite seu nome e sobrenome" value={formData.nome} onChange={handleChange} icon={<User size={18}/>} />
                <div className="grid grid-cols-2 gap-2">
                  <Input label="CPF" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} icon={<CreditCard size={18}/>} />
                  <Input label="Celular" name="celular" placeholder="(11) 99999-9999" value={formData.celular} onChange={handleChange} icon={<Phone size={18}/>} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="flex items-center gap-2 font-bold text-[#3D144C] border-b pb-2 uppercase text-xs tracking-wider">
                  <MapPin size={16} className="text-[#00CED1]" /> Endereço de Entrega
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1"><Input label="CEP" name="cep" placeholder="00000-000" value={formData.cep} onChange={handleChange} /></div>
                  <div className="col-span-2"><Input label="Endereço" name="endereco" placeholder="Rua, Avenida..." value={formData.endereco} onChange={handleChange} /></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Input label="Nº" name="numero" placeholder="123" value={formData.numero} onChange={handleChange} />
                  <div className="col-span-2"><Input label="Bairro" name="bairro" placeholder="Nome do bairro" value={formData.bairro} onChange={handleChange} /></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Complemento" name="complemento" placeholder="Apto, Bloco..." value={formData.complemento} onChange={handleChange} />
                  <Input label="Referência" name="referencia" placeholder="Perto de..." value={formData.referencia} onChange={handleChange} />
                </div>
              </section>
            </div>

            {error && <p className="text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-100 text-sm font-bold">{error}</p>}

            <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-4 pt-6 border-t">
              {/* Botão Fazer Login estilizado com o Rosa do site */}
              <Link 
                href="/login" 
                className="w-full md:w-auto px-6 md:px-8 py-3 rounded-xl font-bold text-[#D63384] border-2 border-[#D63384] hover:bg-[#D63384] hover:text-white transition-all flex items-center justify-center shadow-sm text-sm md:text-base"
              >
                Fazer Login
              </Link>
              
              {!success && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-[#00CED1] hover:bg-[#00B8B8] text-white px-6 md:px-10 py-4 md:py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Criar Conta <ArrowRight size={18}/></>}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function Input({ label, icon, ...props }: any) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-3 text-pink-300">{icon}</div>}
        <input
          {...props}
          className={`w-full bg-white border border-pink-100 rounded-xl py-2.5 ${icon ? 'pl-10' : 'pl-4'} pr-4 text-sm text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-pink-100 focus:border-[#00CED1] outline-none transition-all shadow-sm`}
        />
      </div>
    </div>
  );
}