import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"
import { Session, getServerSession } from "next-auth"


interface SessionSlug extends Session {
    activeSignature: 'active' | 'canceled' | null;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
    
    
    if(request.method === "GET"){
        const session = await getServerSession(request, response, authOptions)
        return  response.status(201).json({
            signature: (session as SessionSlug)?.activeSignature ?? null
        })
    }
    response.setHeader("Allow", "GET");
    return response.status(405).end("Method not allowed")
}