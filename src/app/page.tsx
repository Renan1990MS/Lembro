'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart, Gift, Truck, MessageCircle, Search, User,
  ShoppingBasket, Phone, Mail
} from 'lucide-react';

export default function Home() {
  const [selectedImg, setSelectedImg] = useState('/img1.png');
  const [selectedPackage, setSelectedPackage] = useState('3');

  // Novo estado para a quantidade do seletor numérico
  const [quantity, setQuantity] = useState(1);

  const prices = {
    '3': { original: '19,90', current: '12,90' },
    '5': { original: '29,90', current: '17,90' },
    '9': { original: '44,90', current: '24,90' },
    '15': { original: '69,90', current: '39,90' },

  };

  const currentPrice = prices[selectedPackage as keyof typeof prices];

  // Funções para o seletor de quantidade
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <main className="min-h-screen bg-white">

      {/* --- TOP BAR --- */}
      <div className="w-full bg-[#D63384] text-white py-2 px-4 border-b border-pink-400">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-[10px] md:text-xs font-bold tracking-widest uppercase">
          <div className="hidden md:block">PRECISA DE AJUDA?</div>
          <div className="flex items-center gap-2">
            <Truck size={14} />
            ENVIAMOS PARA TODO O BRASIL 🇧🇷
          </div>
          <div className="flex items-center gap-2">WHATSAPP: (11) 97613-4955</div>
        </div>
      </div>

      {/* --- HEADER PRINCIPAL --- */}
      <header className="w-full bg-white py-4 px-6 border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="transition-transform hover:scale-105">
            <h1 className="text-4xl font-serif text-[#D63384] italic tracking-tighter">
              Lembrô<span className="text-pink-300">...</span>
            </h1>
          </Link>

          {/* BARRA DE BUSCA CORRIGIDA (TEXTO PRETO) */}
          <div className="flex-1 max-w-xl w-full relative group">
            <input
              type="text"
              placeholder="O que você procura?"
              className="w-full bg-gray-50 border border-pink-100 rounded-sm py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all text-gray-900 placeholder:text-gray-400"
            />
            <Search className="absolute right-4 top-3 text-[#D63384]" size={20} />
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-3 text-[#5D4037] cursor-pointer group">
              <div className="w-10 h-10 rounded-full border border-pink-100 flex items-center justify-center group-hover:border-[#D63384]">
                <User size={20} className="text-[#D63384]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-bold uppercase tracking-tighter text-gray-400">Minha Conta</span>
                <span className="text-sm font-semibold">Entrar / Cadastrar</span>
              </div>
            </div>

            <div className="relative cursor-pointer group">
              <ShoppingBasket size={32} className="text-[#D63384] transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-2 bg-[#00CED1] text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">0</span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[350px] md:h-[500px]">
          <Image src="/lembro.png" alt="Lembrô Banner" fill className="object-cover" priority />
        </div>

        <div className="w-full bg-gradient-to-r from-[#FFF5F5] via-[#FDF2F2] to-[#FFF5F5] py-12 md:py-20 border-y border-pink-100 shadow-inner">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center gap-8">
            <h2 className="text-2xl md:text-5xl font-serif text-[#D63384] italic tracking-tight drop-shadow-sm">
              Transforme suas fotos em ímãs únicos e surpreenda quem você ama!
            </h2>
            <p className="text-[#5D4037] text-lg md:text-xl font-medium max-w-2xl opacity-90">
              A maior qualidade do Brasil para eternizar suas memórias mais especiais!
            </p>
            <Link
              href="/simulador"
              className="mt-4 px-10 py-4 bg-[#D63384] hover:bg-[#B91C1C] text-white text-xl font-bold rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 inline-flex"
            >
              Como Funciona! <Heart size={20} fill="currentColor" />
            </Link>
          </div>
        </div>

        {/* LOGO E BENEFÍCIOS */}
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden border-[12px] border-[#FDF2F2] transition-transform hover:scale-105 duration-500">
                <div className="relative w-full h-full">
                  <Image src="/logo.png" alt="Lembrô Logo" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute top-4 -right-4 bg-[#D63384] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg z-10">ORIGINAL</div>
            </div>

            <div className="flex-1 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm"><Heart className="text-pink-500" size={24} /></div>
                  <div className="text-left">
                    <p className="font-bold text-[#5D4037] text-lg leading-tight">Ímãs personalizados com suas fotos favoritas</p>
                    <p className="text-gray-500 text-sm italic">Eternize momentos especiais</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm"><Gift className="text-pink-400" size={24} /></div>
                  <p className="text-[#5D4037] font-semibold text-lg leading-tight text-left">Perfeito para presentear quem você ama</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm"><Truck className="text-pink-400" size={24} /></div>
                  <p className="text-[#5D4037] font-semibold text-lg leading-tight text-left">Entregamos em todo o Brasil 🇧🇷</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm"><MessageCircle className="text-pink-400" size={24} /></div>
                  <p className="text-[#5D4037] font-semibold text-lg leading-tight text-left">Atendimento rápido pelo WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE PRODUTO (SHOWCASE) --- */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">

          {/* Lado Esquerdo: Galeria de Imagens */}
          <div className="md:w-1/2 p-4 md:p-8 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
              <Image
                src={selectedImg}
                alt="Ímãs de geladeira personalizados"
                fill
                className="object-cover transition-all duration-300"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImg(`/img${i}.png`)}
                  className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer transition-all ${selectedImg === `/img${i}.png` ? 'ring-2 ring-pink-400' : 'border-gray-200'
                    }`}
                >
                  <Image src={`/img${i}.png`} alt={`img${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            {/* --- NOVA DESCRIÇÃO DO PRODUTO ABAIXO DA GALERIA --- */}
            <div className="mt-12 space-y-8 border-t border-gray-100 pt-8">
              <div>
                <h3 className="text-2xl font-bold text-[#3D144C] mb-4">Descrição do produto</h3>
                <div className="space-y-4 text-[#5D4037] leading-relaxed">
                  <p className="font-semibold text-lg">Foto ímã estilo Polaroid!</p>
                  <p>Monte seu álbum de geladeira! Ótima opção para decorar sua casa ou presentear pessoas especiais!</p>
                  <div className="py-2">
                    <p className="font-bold mb-2">Especificações técnicas:</p>
                    <ul className="list-none space-y-1 ml-1">
                      <li>• Fotos impressas em papel fotográfico de alta qualidade</li>
                      <li>• Tamanho: 7x5,5cm</li>
                      <li>• Ímã total no verso (máxima aderência)</li>
                    </ul>
                  </div>
                  <p className="bg-pink-50 p-4 rounded-lg border-l-4 border-[#D63384] text-sm italic">
                    <strong>Importante:</strong> Após a compra, entre em contato pelo chat ou WhatsApp. Iremos disponibilizar o e-mail para o envio das fotos!
                  </p>
                </div>
              </div>

              {/* Grid Técnico */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100">
                <div className="flex flex-col gap-1">
                  <span className="text-[#D63384] font-bold text-[10px] uppercase tracking-wider">Medidas</span>
                  <span className="text-[#3D144C] font-extrabold text-sm">7 x 5,5 cm</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#D63384] font-bold text-[10px] uppercase tracking-wider">Peso</span>
                  <span className="text-[#3D144C] font-extrabold text-sm">3 g</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#D63384] font-bold text-[10px] uppercase tracking-wider">Código</span>
                  <span className="text-[#3D144C] font-extrabold text-sm">1DC3E5D</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#D63384] font-bold text-[10px] uppercase tracking-wider">Ano</span>
                  <span className="text-[#3D144C] font-extrabold text-sm">2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Informações e Compra */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center text-center">

            <div className="bg-gray-100 px-6 py-2 rounded-sm mb-6">
              <span className="text-[#5D4037] text-[11px] font-bold uppercase tracking-widest">
                ímã de Geladeira Personalizado
              </span>
            </div>

            <h2 className="text-3xl font-bold text-[#3D144C] mb-1">Foto Presente Criativo</h2>
            <p className="text-[11px] text-[#5D4037] font-bold mb-4 uppercase tracking-tighter">REF: IMAPAC</p>

            <div className="flex items-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">☆</span>
              ))}
              <span className="text-[13px] text-[#3D144C] ml-2 font-medium">Seja o primeiro a opinar :)</span>
            </div>

            <div className="w-full space-y-6">
              <p className="text-[13px] text-[#3D144C] font-semibold">
                Disponibilidade: <span className="font-normal opacity-80">Disponível em 5 dias úteis</span>
              </p>

              <div className="space-y-2 text-left">
                <label className="text-[12px] text-[#5D4037] font-medium ml-1">Quantidade:</label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full border border-[#3D144C]/30 rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#3D144C] bg-white text-[#3D144C]"
                >
                  <option value="3">Kit com 3 unidades</option>
                  <option value="5">Kit com 5 unidades</option>
                  <option value="9">Kit com 9 unidades</option>
                  <option value="15">Kit com 15 unidades</option>
                </select>
              </div>

              {/* Preço Dinâmico */}
              <div className="flex flex-col items-end py-2">
                <span className="text-[14px] text-[#3D144C] line-through opacity-60">
                  de R$ {currentPrice.original}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#D63384] text-xl font-bold uppercase">R$</span>
                  <span className="text-[#D63384] text-5xl font-bold italic transition-all duration-300">
                    {currentPrice.current}
                  </span>
                </div>
              </div>

              <div className="bg-pink-50 rounded-sm p-6 text-center space-y-4 border border-pink-100">
                <p className="text-[#3D144C] font-bold flex items-center justify-center gap-2 text-lg">
                  Por que escolher a Lembrô?
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3 text-left">
                    <span className="text-[#D63384]">✓</span>
                    <p className="text-[13px] text-[#3D144C]">
                      <strong>Qualidade Premium:</strong> Papel fotográfico de alta gramatura com proteção UV.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <span className="text-[#D63384]">✓</span>
                    <p className="text-[13px] text-[#3D144C]">
                      <strong>Imã Total:</strong> Verso 100% imantado (não cai da geladeira).
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <span className="text-[#D63384]">✓</span>
                    <p className="text-[13px] text-[#3D144C]">
                      <strong>Pronto para Presentear:</strong> Embalagem especial inclusa em todos os kits.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-pink-200">
                  <p className="text-[12px] text-[#D63384] font-bold italic">
                    🔥 Promoção por tempo limitado!
                  </p>
                </div>
              </div>

              {/* SELETOR DE QUANTIDADE FUNCIONAL */}
              <div className="flex gap-2 h-14">
                <div className="flex bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 bg-transparent text-center font-bold text-[#3D144C] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="flex flex-col border-l border-gray-200">
                    <button
                      onClick={increment}
                      className="flex-1 px-2 hover:bg-gray-200 transition-colors text-[10px]"
                      type="button"
                    >
                      ▲
                    </button>
                    <button
                      onClick={decrement}
                      className="flex-1 px-2 hover:bg-gray-200 transition-colors text-[10px]"
                      type="button"
                    >
                      ▼
                    </button>
                  </div>
                </div>

                <button className="flex-1 bg-[#00CED1] hover:brightness-110 text-white font-bold rounded-sm transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-sm">
                  <ShoppingBasket size={22} />
                  Comprar Produto
                </button>
              </div>

              <p className="text-[11px] text-[#3D144C] font-medium">
                * Aqui sua compra é 100% segura, compre com tranquilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-white mt-10">
        <div className="py-10 border-t border-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
            <h3 className="text-4xl font-serif text-[#D63384] italic">Lembrô<span className="text-pink-300">...</span></h3>
            <div className="flex gap-6 text-gray-400 font-bold text-xs uppercase tracking-widest">
              <span className="hover:text-[#D63384] cursor-pointer">Instagram</span>
              <span className="hover:text-[#D63384] cursor-pointer">Facebook</span>
              <span className="hover:text-[#D63384] cursor-pointer">Youtube</span>
            </div>
          </div>
        </div>

        <div className="bg-[#D63384] py-8 px-4 text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <MessageCircle size={28} />
              <span className="text-sm font-semibold uppercase tracking-tight">Entre em contato</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Phone size={24} />
              <span className="text-sm font-semibold uppercase tracking-tight">WhatsApp: (11) 97613-4955</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Phone size={24} />
              <span className="text-sm font-semibold uppercase tracking-tight">Tel: (11) 94064-1485</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Mail size={24} />
              <span className="text-sm font-semibold uppercase tracking-tight"> lembrolembracas@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="py-12 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
            <div className="flex justify-between items-center min-w-[800px] text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              <Link href="#" className="hover:text-[#D63384]">Sobre a empresa</Link>
              <Link href="#" className="hover:text-[#D63384]">Segurança</Link>
              <Link href="#" className="hover:text-[#D63384]">Garantia</Link>
              <Link href="#" className="hover:text-[#D63384]">Depoimentos de Clientes</Link>
              <Link href="#" className="hover:text-[#D63384]">Notícias</Link>
              <Link href="#" className="hover:text-[#D63384]">Troca, devolução e reembolso</Link>
            </div>
          </div>
        </div>

        <div className="py-12 bg-white border-t border-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
              <div className="flex items-center gap-10">
                <Image
                  src="/selo.png"
                  alt="Selo Loja Protegida"
                  width={180}
                  height={55}
                  className="object-contain h-[55px] w-auto"
                />
                <Image
                  src="/selo1.png"
                  alt="Selo Google Safe Browsing"
                  width={180}
                  height={55}
                  className="object-contain h-[55px] w-auto"
                />
              </div>

              <div className="hidden md:block h-12 w-[1px] bg-gray-200"></div>

              <div className="opacity-90 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src="/selo3.png"
                  alt="Formas de Pagamento"
                  width={320}
                  height={60}
                  className="object-contain h-[60px] md:h-[65px] w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-gray-100 text-center bg-white">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[2px]">
            © {new Date().getFullYear()} Lembrô — Desenvolvido com carinho
          </p>
        </div>

        {/* WHATSAPP FLUTUANTE - APENAS A IMAGEM LIMPA */}
        <a
          href="https://wa.me/5511976134955"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform active:scale-95 drop-shadow-xl"
        >
          <Image
            src="/whtas.png"
            alt="WhatsApp Lembrô"
            width={65}
            height={65}
            className="object-contain"
          />
        </a>
      </footer>
    </main>
  );
}