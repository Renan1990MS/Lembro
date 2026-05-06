'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa'

export default function SucessoPage() {
  // Seu número configurado corretamente
  const whatsappNumber = "5511976134955"; 
  const message = encodeURIComponent("Olá! Acabei de fazer um pedido no Lembrô e quero enviar minhas fotos.");

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6 bg-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 text-7xl" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Pedido Confirmado!</h1>
          <p className="text-gray-600">
            Ficamos muito felizes! Seus ímãs personalizados serão produzidos com o maior carinho do mundo.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <p className="text-blue-800 font-medium">
            Próximo passo: Envie suas fotos agora mesmo para iniciarmos a produção!
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link 
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-green-200"
          >
            <FaWhatsapp size={24} />
            ENVIAR FOTOS PELO WHATSAPP
          </Link>

          <Link 
            href="/"
            className="text-gray-500 hover:text-gray-800 font-medium py-2 transition-colors"
          >
            Voltar para a loja
          </Link>
        </div>
      </motion.div>
    </main>
  )
}