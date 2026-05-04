'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from './lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  Heart, Gift, Truck, MessageCircle, Search, User,
  ShoppingBasket, Phone, Mail, LogOut, Loader2, X, Trash2
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [selectedImg, setSelectedImg] = useState('/img1.png');
  const [selectedPackage, setSelectedPackage] = useState('3');
  const [quantity, setQuantity] = useState(1);
  const [activeProduct, setActiveProduct] = useState<'classico' | 'polaroid'>('classico');

  // --- ESTADO DO CARRINHO ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    img: string;
    kit: string;
  }[]>([]);

  // --- ESTADO DO USUÁRIO ---
  const [userName, setUserName] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Monitora autenticação e busca nome no Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const fullNome = docSnap.data().nome;
            setUserName(fullNome.split(' ')[0]);
          } else {
            setUserName(user.displayName?.split(' ')[0] || 'Cliente');
          }
        } catch (error) {
          setUserName(user.displayName?.split(' ')[0] || 'Cliente');
        }
      } else {
        setUserName(null);
      }
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  const productData = {
    classico: {
      name: "Foto Presente Criativo",
      ref: "IMAPAC",
      tag: "Ímã de Geladeira Clássico",
      desc: "O queridinho da geladeira! Monte seu álbum de memórias com corte reto e acabamento impecável.",
      prices: {
        '3': { original: '19,90', current: '12,90' },
        '5': { original: '29,90', current: '17,90' },
        '9': { original: '44,90', current: '24,90' },
        '15': { original: '69,90', current: '39,90' },
      }
    },
    polaroid: {
      name: "Ímã Estilo Polaroid",
      ref: "IMAPOL",
      tag: "Edição Especial Retrô",
      desc: "O charme do retrô na sua cozinha! Possui a famosa borda branca clássica que valoriza cada clique.",
      prices: {
        '3': { original: '24,90', current: '16,90' },
        '5': { original: '34,90', current: '22,90' },
        '9': { original: '54,90', current: '32,90' },
        '15': { original: '89,90', current: '49,90' },
      }
    }
  };

  const currentData = productData[activeProduct];
  const currentPrice = currentData.prices[selectedPackage as keyof typeof currentData.prices];

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // --- FUNÇÕES DO CARRINHO ---
  const addToCart = () => {
    const priceValue = parseFloat(currentPrice.current.replace(',', '.'));
    const newItem = {
      id: `${activeProduct}-${selectedPackage}-${Date.now()}`,
      name: currentData.name,
      price: priceValue,
      quantity: quantity,
      img: selectedImg,
      kit: selectedPackage
    };
    setCart(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

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
          <div className="flex items-center gap-2 uppercase">WhatsApp: (11) 97613-4955</div>
        </div>
      </div>

      {/* --- HEADER PRINCIPAL --- */}
      <header className="w-full bg-white py-3 px-3 md:py-4 md:px-6 border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          <Link href="/" className="transition-transform hover:scale-105">
          <h1 className="text-2xl md:text-4xl font-serif text-[#D63384] italic tracking-tighter">
              Lembrô<span className="text-pink-300">...</span>
            </h1>
          </Link>

          <div className="flex-1 max-w-xl w-full relative group">
            <input
              type="text"
              placeholder="O que você procura?"
              className="w-full bg-gray-50 border border-pink-100 rounded-sm py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all text-gray-900 placeholder:text-gray-400"
            />
            <Search className="absolute right-4 top-3 text-[#D63384]" size={20} />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-[#5D4037] group">
                <div className="w-10 h-10 rounded-full border border-pink-100 flex items-center justify-center group-hover:border-[#D63384] overflow-hidden bg-pink-50">
                  {userName ? (
                    <span className="text-[#D63384] font-bold text-sm">{userName[0]}</span>
                  ) : (
                    <User size={20} className="text-[#D63384]" />
                  )}
                </div>

                <div className="flex flex-col leading-tight min-w-[120px]">
                  {loadingUser ? (
                    <Loader2 size={14} className="animate-spin text-gray-300" />
                  ) : userName ? (
                    <>
                      <span className="text-[11px] font-bold uppercase tracking-tighter text-gray-400">Bem-vindo</span>
                      <span className="text-sm font-semibold text-[#D63384]">Olá, {userName}!</span>
                      <button
                        onClick={handleLogout}
                        className="text-[10px] text-red-400 font-bold text-left uppercase hover:underline flex items-center gap-1 mt-1"
                      >
                        <LogOut size={10} /> Sair da conta
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-bold uppercase tracking-tighter text-gray-400">Minha Conta</span>
                      <Link href="/login" className="text-sm font-semibold group-hover:text-[#D63384] transition-colors">
                        Entrar / Cadastrar
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              className="relative cursor-pointer group"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBasket size={32} className="text-[#D63384] transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-2 bg-[#00CED1] text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                {cart.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[350px] md:h-[500px]">
          <Image src="/lembro.png" alt="Lembrô Banner" fill className="object-cover" priority />
        </div>

        <div className="w-full bg-gradient-to-r from-[#FFF5F5] via-[#FDF2F2] to-[#FFF5F5] py-12 md:py-20 border-y border-pink-100 shadow-inner text-center">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-8">
            <h2 className="text-xl md:text-5xl font-serif text-[#D63384] italic tracking-tight drop-shadow-sm">
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

            <div className="flex-1 space-y-8 text-center md:text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm"><Heart className="text-pink-500" size={24} /></div>
                  <div className="text-left">
                    <p className="font-bold text-[#5D4037] text-lg leading-tight">Ímãs personalizados</p>
                    <p className="text-gray-500 text-sm italic">Eternize momentos</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm"><Gift className="text-pink-400" size={24} /></div>
                  <p className="text-[#5D4037] font-semibold text-lg leading-tight text-left">Presente perfeito para quem você ama</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm"><Truck className="text-pink-400" size={24} /></div>
                  <p className="text-[#5D4037] font-semibold text-lg leading-tight text-left">Entregamos em todo o Brasil 🇧🇷</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm"><MessageCircle className="text-pink-400" size={24} /></div>
                  <p className="text-[#5D4037] font-semibold text-lg leading-tight text-left">Atendimento via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE PRODUTO --- */}
      <section className="bg-gray-50 py-10 md:py-16 px-3 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* SELETOR DE MODELOS */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveProduct('classico')}
              className={`px-8 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all ${activeProduct === 'classico' ? 'bg-[#D63384] text-white shadow-md' : 'bg-white text-gray-400 border border-gray-200 hover:border-pink-200'}`}
            >
              Ímã Clássico
            </button>
            <button
              onClick={() => setActiveProduct('polaroid')}
              className={`px-8 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all ${activeProduct === 'polaroid' ? 'bg-[#D63384] text-white shadow-md' : 'bg-white text-gray-400 border border-gray-200 hover:border-pink-200'}`}
            >
              Ímã Polaroid
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row transition-all duration-500">

            {/* Galeria de Imagens */}
            <div className="w-full md:w-1/2 p-3 md:p-8 flex flex-col gap-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-gray-200 shadow-inner group">
                <Image
                  src={selectedImg}
                  alt={currentData.name}
                  fill
                  className="object-cover transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => {
                  const polaroidImages = {
                    1: '/polaroide1.jpg',
                    2: '/polaroid2.webp',
                    3: '/poraloid3.png',
                    4: '/poraloid4.jpeg'
                  };

                  const imagePath = activeProduct === 'polaroid'
                    ? polaroidImages[i as keyof typeof polaroidImages]
                    : `/img${i}.png`;

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedImg(imagePath)}
                      className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer transition-all ${selectedImg === imagePath ? 'ring-2 ring-[#D63384]' : 'border-gray-200'
                        }`}
                    >
                      <Image
                        src={imagePath}
                        alt={`Opção ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              {/* DESCRIÇÃO DINÂMICA */}
              <div className="mt-12 space-y-8 border-t border-gray-100 pt-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#3D144C] mb-4">Descrição do produto</h3>
                  <div className="space-y-4 text-[#5D4037] leading-relaxed">
                    <p className="font-semibold text-lg text-[#D63384]">{currentData.name}!</p>
                    <p>{currentData.desc}</p>
                    <div className="py-2">
                      <p className="font-bold mb-2">Especificações técnicas:</p>
                      <ul className="list-none space-y-1 ml-1 text-sm">
                        <li>• Fotos impressas em papel fotográfico premium</li>
                        <li>• Tamanho: {activeProduct === 'polaroid' ? '7,5 x 10 cm' : '7 x 5,5 cm'}</li>
                        <li>• Verso 100% imantado</li>
                      </ul>
                    </div>

                    <div className="mt-6 bg-[#FFF5F8] border-l-4 border-[#D63384] p-4 rounded-r-lg shadow-sm">
                      <p className="text-[#3D144C] italic leading-relaxed text-left">
                        <span className="font-bold not-italic">Importante:</span> Após a compra, entre em contato pelo WhatsApp. Iremos disponibilizar o e-mail para o envio das fotos!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-8 border-y border-gray-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#D63384] font-bold text-[10px] uppercase tracking-wider">Medidas</span>
                    <span className="text-[#3D144C] font-extrabold text-sm">{activeProduct === 'polaroid' ? '7,5x10cm' : '7x5,5cm'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#D63384] font-bold text-[10px] uppercase tracking-wider">Peso</span>
                    <span className="text-[#3D144C] font-extrabold text-sm">3 g</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#D63384] font-bold text-[10px] uppercase tracking-wider">Código</span>
                    <span className="text-[#3D144C] font-extrabold text-sm">{currentData.ref}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#D63384] font-bold text-[10px] uppercase tracking-wider">Ano</span>
                    <span className="text-[#3D144C] font-extrabold text-sm">2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações e Compra */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center text-center">
              <div className="bg-gray-100 px-6 py-2 rounded-sm mb-6">
                <span className="text-[#5D4037] text-[11px] font-bold uppercase tracking-widest">
                  {currentData.tag}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-[#3D144C] mb-1">{currentData.name}</h2>
              <p className="text-[11px] text-[#5D4037] font-bold mb-4 uppercase tracking-tighter">REF: {currentData.ref}</p>

              <div className="flex items-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">☆</span>
                ))}
                <span className="text-[13px] text-[#3D144C] ml-2 font-medium">Seja o primeiro a opinar :)</span>
              </div>

              <div className="w-full space-y-6">
                <p className="text-[13px] text-[#3D144C] font-semibold">
                  Disponibilidade: <span className="font-normal opacity-80">Pronto para envio em 5 dias</span>
                </p>

                <div className="space-y-2 text-left">
                  <label className="text-[12px] text-[#5D4037] font-medium ml-1">Escolha seu Kit:</label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full border border-[#3D144C]/30 rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#D63384] bg-white text-[#3D144C]"
                  >
                    <option value="3">Kit com 3 unidades</option>
                    <option value="5">Kit com 5 unidades</option>
                    <option value="9">Kit com 9 unidades</option>
                    <option value="15">Kit com 15 unidades</option>
                  </select>
                </div>

                <div className="flex flex-col items-end py-2">
                  <span className="text-[14px] text-[#3D144C] line-through opacity-60">
                    de R$ {currentPrice.original}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#D63384] text-xl font-bold uppercase">R$</span>
                    <span className="text-[#D63384] text-5xl font-bold italic">
                      {currentPrice.current}
                    </span>
                  </div>
                </div>

                <div className="bg-[#FFF5F8] rounded-2xl p-6 mb-8 border border-pink-100 shadow-sm">
                  <h3 className="text-[#3D144C] font-bold text-xl text-center mb-6">Por que escolher a Lembrô?</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <span className="text-[#D63384] font-bold mt-1">✓</span>
                      <p className="text-[14px] text-[#3D144C] leading-tight text-left">
                        <span className="font-bold">Qualidade Premium:</span> Papel fotográfico de alta gramatura com proteção UV.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <span className="text-[#D63384] font-bold mt-1">✓</span>
                      <p className="text-[14px] text-[#3D144C] leading-tight">
                        <span className="font-bold">Ímã Total:</span> Verso 100% imantado (não cai da geladeira).
                      </p>
                    </div>
                    <div className="flex items-start gap-3 border-b border-pink-100 pb-5 text-left">
                      <span className="text-[#D63384] font-bold mt-1">✓</span>
                      <p className="text-[14px] text-[#3D144C] leading-tight">
                        <span className="font-bold">Pronto para Presentear:</span> Embalagem especial inclusa em todos os kits.
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-[#D63384] font-bold italic text-sm mt-4 animate-pulse">
                    🔥 Promoção por tempo limitado!
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-2 h-auto md:h-14">
              <div className="flex bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 bg-transparent text-center font-bold text-[#3D144C] focus:outline-none"
                />
                <div className="flex flex-col border-l border-gray-200">
                  <button onClick={increment} className="flex-1 px-2 hover:bg-gray-200 text-[10px]">▲</button>
                  <button onClick={decrement} className="flex-1 px-2 hover:bg-gray-200 text-[10px]">▼</button>
                </div>
              </div>

              <button
                onClick={addToCart}
                className="w-full md:flex-1 bg-[#00CED1] hover:brightness-110 text-white font-bold rounded-sm transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-md"
              >
                <ShoppingBasket size={22} />
                Comprar {activeProduct === 'polaroid' ? 'Polaroid' : 'Ímã'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      </section >

    {/* --- FOOTER --- */ }
    < footer className = "w-full bg-white mt-10" >
        <div className="py-10 border-t border-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
            <h3 className="text-4xl font-serif text-[#D63384] italic">Lembrô<span className="text-pink-300">...</span></h3>
            <div className="flex gap-6 text-gray-400 font-bold text-[10px] uppercase tracking-[3px]">
              <span className="hover:text-[#D63384] cursor-pointer transition-colors">Instagram</span>
              <span className="hover:text-[#D63384] cursor-pointer transition-colors">Facebook</span>
            </div>
          </div>
        </div>

        <div className="bg-[#D63384] py-8 px-4 text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Phone size={24} />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase opacity-70">Fale com a gente</span>
                <span className="text-sm font-semibold">(11) 97613-4955</span>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Mail size={24} />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase opacity-70">Envio de fotos</span>
                <span className="text-sm font-semibold">lembrolembracas@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Truck size={24} />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase opacity-70">Abrangência</span>
                <span className="text-sm font-semibold">Enviamos para todo o Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="flex items-center gap-8 opacity-100 transition-all">
                <Image src="/selo.png" alt="Selo" width={140} height={40} className="object-contain" />
                <Image src="/selo1.png" alt="Selo" width={140} height={40} className="object-contain" />
              </div>
              <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>
              <Image src="/selo3.png" alt="Pagamentos" width={280} height={50} className="object-contain" />
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-gray-50 text-center bg-gray-50">
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[2px]">
            © {new Date().getFullYear()} Lembrô — Eternizando Seus Melhores Momentos
          </p>
        </div>

        <a
          href="https://wa.me/5511976134955"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform drop-shadow-2xl"
        >
          <Image src="/whtas.png" alt="WhatsApp" width={60} height={60} className="object-contain" />
        </a>
      </footer >

    {/* --- JANELA LATERAL DO CARRINHO --- */ }
  {
    isCartOpen && (
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Fundo escuro */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />

        {/* Painel Branco */}
        <div className="relative w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
            <div className="flex items-center gap-2">
              <ShoppingBasket size={24} className="text-[#D63384]" />
              <h2 className="text-xl font-bold text-[#3D144C]">Meu Carrinho</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-pink-50 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          {/* Itens do Carrinho */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <ShoppingBasket size={40} />
                </div>
                <p className="text-gray-500 font-medium italic">Sua cesta está vazia... <br /> Que tal enchê-la de memórias?</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[#D63384] font-bold uppercase text-xs tracking-widest hover:underline"
                >
                  Voltar às compras
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-24 relative rounded-lg overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                    <Image src={item.img} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-bold text-[#3D144C] text-sm leading-tight mb-1">{item.name}</h4>
                      <p className="text-[10px] text-[#D63384] font-bold uppercase tracking-wider">Kit {item.kit} Unidades</p>
                      <p className="text-xs text-gray-400 mt-1">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-[#3D144C]">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé e Fechamento */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Subtotal:</span>
                <span className="text-xl font-bold text-[#3D144C]">R$ {cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => alert("Próximo passo: Integração Mercado Pago!")}
                className="w-full bg-[#00CED1] py-4 rounded-xl text-white font-bold uppercase tracking-widest hover:bg-[#00B8B8] transition-all shadow-lg flex items-center justify-center gap-3"
              >
                Finalizar Pedido
              </button>

              <p className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-tighter">
                Taxas de envio calculadas no próximo passo
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

    </main >
  );
}