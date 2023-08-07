import { saveSignature } from "@/services/saveSignature";
import { stripe } from "@/services/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable, Writable } from "stream";
import Stripe from "stripe";

async function buffer(readable: Readable){
    const chunks: any[] = [];
    for await (const chunk of readable){
        chunks.push(
            typeof chunk === 'string' ? Buffer.from(chunk) : chunk
        )
    }
    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false
    }
}

const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted',
]);

export default async (request: NextApiRequest, response: NextApiResponse) =>{
    if(request.method === "POST"){
        const buf = await buffer(request)
        let signature_return = ""
        const secret = request.headers["stripe-signature"] as string | string[]
        let event: Stripe.Event
        
        try {
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET as string)
        } catch (error) {
            return response.status(404).send('Webhook Error')
        }
        const {type} = event
        if(relevantEvents.has(type)){
            try {
                switch(type){
                    case 'customer.subscription.updated':
                    case 'customer.subscription.deleted':
                        const signature = event.data.object as Stripe.Subscription
                        signature_return = await saveSignature(
                            signature.id,
                            signature.customer.toString(),
                            false
                          )
                        break
                    case 'checkout.session.completed':
                        const checkoutSession = event.data.object as Stripe.Checkout.Session
                        signature_return = await saveSignature(
                            checkoutSession.subscription?.toString() as string,
                            checkoutSession.customer?.toString() as string,
                            true
                       )
    
                    default:
                        throw new Error("Unhandled event: " + type)
                }
            } catch (error) {
                return response.json({ error: "Webhook handler failed."})
            }
        }
        response.json({ received: true, signature: signature_return })
        
        response.redirect("/")
    }  
    else {
        response.setHeader("Allow", "POST");
        response.status(405).end("Method not allowed")
    }

}

class Send extends Writable {
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        
    }
}