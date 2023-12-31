import { NextApiRequest, NextApiResponse } from "next";
import {   getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { fauna } from "@/services/faunadb";
import { query } from "faunadb";
import { stripe } from "@/services/stripe";

interface User {
    data: {
        stripe_customer_id: string;
    }
    ref: {
        id: string;
    }
}

export default async function handler(request: NextApiRequest, response: NextApiResponse){
    
    
    if(request.method === "POST") {
        const session = await getServerSession(request, response, authOptions)
        
        const user = await fauna.query<User>(
            query.Get(
                query.Match(
                    query.Index("user_by_email"),
                    query.Casefold(session?.user?.email as string)
                )
            )
        )

        let customerId = user.data.stripe_customer_id
        if (!customerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session?.user?.email as string
            })

            await fauna.query(
                query.Update(
                    query.Ref(query.Collection('users'), user.ref.id),
                    {data: {
                        stripe_customer_id: stripeCustomer.id
                    }}
                )
            )
            customerId = stripeCustomer.id
        }

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            line_items: [
                {price: 'price_1NWTHPCGnWxAsuIluA7e1LWT', quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL as string,
            cancel_url: process.env.STRIPE_CANCEL_URL as string
        })
        return response.status(201).json({sessionId: stripeCheckoutSession.id})
    } else {
        response.setHeader("Allow", "POST");
        response.status(405).end("Method not allowed")
    }
}