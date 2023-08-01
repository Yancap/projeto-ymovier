import { fauna } from "@/services/faunadb";
import { query } from 'faunadb'
import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"


export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string 
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SECRET as string,
    callbacks: {
        async session({session}){
            const email = session.user?.email ?? ''
            return {
                ...session,
            } 
            try{
                const userActiveSignature = await fauna.query(
                    query.Get(
                    query.Intersection([
                        query.Match(
                        query.Index('subscription_by_user_ref'),
                        query.Select(
                            "ref",
                            query.Get(
                            query.Match(
                                query.Index('user_by_email'),
                                query.Casefold(email)
                            )
                            )
                        )
                        ),
                        query.Match(
                        query.Index('subscription_by_status'),
                        "active"
                        )
                    ])
                    )
                )
                return {
                    ...session,
                    activeSignature: userActiveSignature
                }   
            } catch {
                return {
                    ...session,
                    activeSubscription: null
                }
            }
            
        },
        async signIn({user}){
            try {
             await fauna.query(
                query.If(
                    query.Not(
                        query.Exists(
                            query.Match(
                                query.Index("user_by_email"),
                                query.Casefold(user.email as string)
                            )
                        )
                    ),
                    query.Create(
                        query.Collection('users'),
                        {data: {email: user.email}}
                    ),
                    query.Get( //Equivalente ao Select do SQL
                        query.Match(
                            query.Index("user_by_email"),
                            query.Casefold(user.email as string)
                        )
                    )
                )
             )
            return true   
            } catch (error) {
                return false
            }
        }
    }
  }
  export default NextAuth(authOptions)