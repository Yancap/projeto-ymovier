import Stripe from "stripe";

const config: Stripe.StripeConfig = {
    apiVersion: '2022-11-15',
    appInfo: {
        name: 'yMovier',
        version: '0.1.0'
    }
}

const __KEY = process.env.STRIPE_API_KEY as string

export const stripe = new Stripe(__KEY, config)