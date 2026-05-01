import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Adicionado para navegação interna
import { Heart, Gift, Truck, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative w-full overflow-hidden">

        {/* Background */}
        <div className="relative w-full h-[350px] md:h-[500px]">
          <Image
            src="/lembro.png"
            alt="Lembrô Banner Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/5 md:bg-transparent"></div>
        </div>

        {/* FRASE + CTA */}
        <div className="w-full bg-gradient-to-r from-[#FFF5F5] via-[#FDF2F2] to-[#FFF5F5] py-12 md:py-20 border-y border-pink-100 shadow-inner">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center gap-8">

            <h2 className="text-2xl md:text-5xl font-serif text-[#D63384] italic whitespace-nowrap tracking-tight drop-shadow-sm">
              Transforme suas fotos em ímãs únicos e surpreenda quem você ama!
            </h2>

            <p className="text-[#5D4037] text-lg md:text-xl font-medium max-w-2xl opacity-90">
              A maior qualidade do Brasil para eternizar suas memórias mais especiais!
            </p>

            {/* BOTÃO ATUALIZADO PARA O SIMULADOR */}
            <Link
              href="/simulador"
              className="mt-4 px-10 py-4 bg-[#D63384] hover:bg-[#B91C1C] text-white text-xl font-bold rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 inline-flex"
            >
              Como Funciona!
              <Heart size={20} fill="currentColor" />
            </Link>

          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">

            {/* LOGO */}
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden border-[12px] border-[#FDF2F2] transition-transform hover:scale-105 duration-500">
                <div className="relative w-full h-full">
                  <Image
                    src="/logo.png" 
                    alt="Lembrô Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="absolute top-4 -right-4 bg-[#D63384] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg z-10">
                ORIGINAL
              </div>
            </div>

            {/* BENEFÍCIOS */}
            <div className="flex-1 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <Heart className="text-pink-500" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[#5D4037] text-lg">
                      Ímãs personalizados com suas fotos favoritas
                    </p>
                    <p className="text-gray-500 text-sm italic">
                      Eternize momentos especiais
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <Gift className="text-pink-400" size={24} />
                  </div>
                  <p className="text-[#5D4037] font-semibold text-lg leading-tight">
                    Perfeito para presentear quem você ama
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <Truck className="text-pink-400" size={24} />
                  </div>
                  <p className="text-[#5D4037] font-semibold text-lg leading-tight">
                    Entregamos em todo o Brasil 🇧🇷
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <MessageCircle className="text-pink-400" size={24} />
                  </div>
                  <p className="text-[#5D4037] font-semibold text-lg leading-tight">
                    Atendimento rápido pelo WhatsApp
                  </p>
                </div>

              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Produção limitada • Peça já o seu antes que acabe
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BOTÃO WHATSAPP - GRANDE E ESTÁTICO */}
      <a
        href="https://wa.me/5511976134955?text=Olá! Gostaria de fazer um pedido de ímãs."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-4 right-4 z-50 transition-transform hover:scale-110"
      >
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={220}
          height={220}
          className="w-40 h-40 md:w-48 md:h-48 object-contain"
          priority
        />
      </a>

      {/* FOOTER PROFISSIONAL */}
      <footer className="bg-[#FFF5F5] border-t border-pink-100 mt-20 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            {/* Coluna 1: Sobre a Marca */}
            <div className="col-span-1 md:col-span-1 text-center md:text-left">
              <h3 className="text-3xl font-serif text-[#D63384] mb-4">Lembrô</h3>
              <p className="text-[#5D4037] text-sm leading-relaxed opacity-80">
                Eternizando seus momentos mais felizes em ímãs de alta qualidade. Feito com amor, para durar para sempre.
              </p>
            </div>

            {/* Coluna 2: Links Rápidos */}
            <div className="text-center md:text-left">
              <h4 className="font-bold text-[#5D4037] mb-4 uppercase text-xs tracking-widest">Navegação</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-[#D63384] transition">Início</Link></li>
                <li><Link href="/simulador" className="hover:text-[#D63384] transition">Como Funciona</Link></li>
                <li><a href="#" className="hover:text-[#D63384] transition">Preços</a></li>
                <li><a href="https://wa.me/5511976134955" className="hover:text-[#D63384] transition">Suporte</a></li>
              </ul>
            </div>

            {/* Coluna 3: Pagamento & Segurança */}
            <div className="text-center md:text-left">
              <h4 className="font-bold text-[#5D4037] mb-4 uppercase text-xs tracking-widest">Pagamento & Segurança</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 opacity-70 grayscale hover:grayscale-0 transition-all">
                <div className="bg-white p-1 rounded border border-gray-200 text-[10px] font-bold px-2">PIX</div>
                <div className="bg-white p-1 rounded border border-gray-200 text-[10px] font-bold px-2">CARTÃO</div>
                <div className="bg-white p-1 rounded border border-gray-200 text-[10px] font-bold px-2">BOLETO</div>
              </div>
              <p className="text-[11px] text-gray-500 mt-4 flex items-center justify-center md:justify-start gap-1">
                <span className="text-green-600">🔒</span> Ambiente 100% Seguro
              </p>
            </div>

            {/* Coluna 4: CTA Direto */}
            <div className="text-center md:text-right flex flex-col items-center md:items-end">
              <h4 className="font-bold text-[#5D4037] mb-4 uppercase text-xs tracking-widest">Dúvidas?</h4>
              <a
                href="https://wa.me/5511976134955"
                target="_blank"
                className="flex items-center gap-2 bg-[#D63384] hover:bg-[#B91C1C] text-white px-5 py-3 rounded-full text-sm font-bold shadow-lg transition-all transform hover:scale-105"
              >
                <MessageCircle size={18} />
                Chamar no Whats
              </a>
            </div>

          </div>

          {/* Linha Final */}
          <div className="border-t border-pink-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Lembrô — Todos os direitos reservados
            </p>
            <div className="flex gap-6 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
              <span>Produzido com Carinho no Brasil 🇧🇷</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}