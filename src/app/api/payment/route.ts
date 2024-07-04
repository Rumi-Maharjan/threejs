import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export async function POST(req:Request) {
  const data = await req.json();
  
  try {
    const p = await stripe.paymentIntents.create({
      amount: data.amount*100,
      currency: 'USD',
      automatic_payment_methods: {
        enabled: true,
      },
      description: data.name,
    });

    return Response.json({ clientSecret: p.client_secret });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error' });
  }
  
  
}