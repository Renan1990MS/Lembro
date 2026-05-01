'use client';
import React, { useState } from 'react';
import { Upload, ArrowLeft, MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';

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
    <main className="min-h-screen bg-[#FFF5F5] py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Link href="/" className="inline-flex items-center text-[#D63384] font-bold mb-8 hover:gap-3 transition-all gap-2">
          <ArrowLeft size={20} /> Voltar para o início
        </Link>

        <h1 className="text-3xl md:text-5xl font-serif text-[#D63384] mb-4 italic">
          Simulador Lembrô
        </h1>
        <p className="text-[#5D4037] mb-12">
          Veja como sua foto fica linda no nosso ímã personalizado!
        </p>

        <div className="flex flex-col items-center gap-10">
          
          {/* O ÍMÃ POLAROID TRADICIONAL */}
          <div className="relative w-72 h-80 md:w-80 md:h-96 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm transform rotate-1 border-b-4 border-gray-100">
            <div className="w-full h-[82%] bg-gray-50 overflow-hidden relative border border-gray-50">
              {image ? (
                <img 
                  src={image} 
                  alt="Sua foto" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-300">
                  <Upload size={40} className="mb-2 opacity-20" />
                  <span className="text-xs font-bold tracking-widest uppercase">Sua Foto aqui</span>
                </div>
              )}
            </div>
            
            <div className="h-[18%] flex items-center justify-center">
              <span className="font-serif text-[#D63384] text-2xl tracking-tight">Lembrô</span>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <label className="cursor-pointer bg-[#D63384] hover:bg-[#B91C1C] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95">
              <Upload size={20} />
              {image ? 'Trocar Foto' : 'Selecionar Foto'}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>

            {image && (
              <a
                href="https://wa.me/5511976134955?text=Olá! Usei o simulador e amei como ficou. Quero encomendar meus ímãs!"
                target="_blank"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-3 animate-pulse"
              >
                <MessageCircle size={20} />
                Quero este Ímã!
              </a>
            )}
          </div>
          
          <div className="mt-8">
             <p className="text-gray-400 text-xs italic flex items-center gap-2">
               <Heart size={12} className="text-pink-300" /> 
               Impressão em papel fotográfico de alta qualidade com base 100% imantada.
             </p>
          </div>
        </div>
      </div>
    </main>
  );
}