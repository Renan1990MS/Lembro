import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';


const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || ''
});

export async function POST(request: Request) {
  try {
    const cartItems = await request.json();

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: cartItems.map((item: any) => ({
          title: item.title || item.name || 'Ímã Lembrô', // Adicionado item.title
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
          currency_id: 'BRL',
        })),
        back_urls: {
          success: `https://lembrofotos.com.br/sucesso`,
          failure: `https://lembrofotos.com.br/`,
          pending: `https://lembrofotos.com.br/`,
        },
        auto_return: 'approved',
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json({ error: 'Erro no checkout' }, { status: 500 });
  }
}