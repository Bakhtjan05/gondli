import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default stripePromise;