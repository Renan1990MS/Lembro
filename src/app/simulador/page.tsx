'use client';
import React, { useState } from 'react';
import { Upload, ArrowLeft, MessageCircle, Heart, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Simulador() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      
      {/* BACKGROUND IMAGE - FOTO4.WEBP */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/foto4.webp"
          alt="Background Geladeira Lembrô"
          fill
          className="object-cover object-left md:object-left-top opacity-60 md:opacity-100"
          priority
        />
      </div>

      {/* CONTEÚDO DA PÁGINA */}
      <div className="relative z-10 py-6 md:py-12 px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col items-end">
          
          {/* BOTÃO VOLTAR */}
          <div className="w-full lg:w-[65%] flex justify-start mb-8">
            <Link href="/" className="inline-flex items-center text-[#D63384] font-bold gap-2 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-pink-100 hover:scale-105 transition-all">
              <ArrowLeft size={20} /> 
              Voltar para a loja
            </Link>
          </div>

          {/* CONTAINER PRINCIPAL ALINHADO À DIREITA */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-end w-full gap-8 lg:gap-16">
            
            {/* COLUNA DO ÍMÃ (VISUALIZAÇÃO) */}
            <div className="flex justify-center w-full lg:w-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-black/10 blur-3xl rounded-full scale-90 opacity-40 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="relative w-72 h-80 md:w-[380px] md:h-[450px] bg-white p-4 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] rounded-sm transform lg:rotate-2 hover:rotate-0 transition-all duration-500 border-b-[6px] border-gray-100">
                  <div className="w-full h-[84%] bg-gray-50 overflow-hidden relative border border-gray-100">
                    {image ? (
                      <img 
                        src={image} 
                        alt="Sua foto" 
                        className="w-full h-full object-cover animate-in fade-in duration-700" 
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6 text-center">
                        <Upload size={48} className="mb-4 opacity-20" />
                        <span className="text-[10px] font-black tracking-[4px] uppercase opacity-40">Selecione sua foto abaixo</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="h-[16%] flex items-center justify-center">
                    <span className="font-serif text-[#D63384] text-3xl md:text-4xl tracking-tighter italic">Lembrô</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUNA DE INFORMAÇÕES - AGORA COM FUNDO ROSADO */}
            <div className="w-full max-w-2xl space-y-8 bg-pink-50/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/60">
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
      </div>
      <span className="text-[10px] font-black text-[#D63384] uppercase tracking-widest">Personalizado para você</span>
    </div>

    {/* TÍTULO EM UMA LINHA SÓ */}
    <h1 className="text-3xl md:text-4xl lg:text-[42px] font-serif text-[#D63384] italic tracking-tight leading-tight whitespace-nowrap">
      Veja como sua foto fica linda!
    </h1>
    
    <p className="text-[#5D4037] text-lg leading-relaxed font-medium">
      Nossos ímãs são produzidos com impressão de laboratório para garantir que suas cores durem para sempre.
    </p>
  </div>

              {/* BENEFÍCIOS COMPLETOS RESTAURADOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Papel Fotográfico Premium', 
                  'Ímã na base toda', 
                  'Cores Vibrantes', 
                  'Estilo Polaroid Clássico'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[#5D4037] font-bold text-xs uppercase tracking-tight">
                    <CheckCircle size={18} className="text-[#D63384] shrink-0" /> {item}
                  </div>
                ))}
              </div>

              {/* ÁREA DE BOTÕES - MAIOR E COM MAIS IMPACTO */}
              <div className="flex flex-col gap-4 pt-4">
                <label className="cursor-pointer bg-[#D63384] hover:bg-[#B91C1C] text-white px-8 py-5 rounded-full font-black text-sm uppercase tracking-[3px] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 group">
                  <Upload size={22} />
                  {image ? 'Trocar Minha Foto' : 'Subir Minha Foto'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>

                {image && (
                  <a
                    href="https://wa.me/5511976134955?text=Olá! Fiz o simulador no site Lembrô e amei o resultado. Quero encomendar meus ímãs!"
                    target="_blank"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-5 rounded-full font-black text-sm uppercase tracking-[3px] shadow-xl transition-all flex items-center justify-center gap-3 animate-pulse"
                  >
                    <MessageCircle size={24} />
                    Quero Comprar Agora!
                  </a>
                )}
              </div>
              
              <div className="pt-6 border-t border-[#D63384]/10">
                 <p className="text-[#5D4037]/60 text-xs font-bold uppercase tracking-widest flex items-center gap-3 leading-relaxed">
                   <Heart size={18} className="text-[#D63384] shrink-0" /> 
                   Base 100% imantada de alta fixação.
                 </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}