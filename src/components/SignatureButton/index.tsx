import { api } from '@/services/api'
import { getStripeJs } from '@/services/stripe-js'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export const SignatureButton = () => {
  const { data: session } = useSession()
  async function handleSignature(){
    if (!session) {
        signIn('github')
        return
    }
    try {
        const response = await api.post('/signature')
        const { sessionId } = response.data
        const stripe = await getStripeJs()
        await stripe?.redirectToCheckout({sessionId})
    } catch (error) {
        alert(error)
    }  
  }
  return (
    <button className='subscribe' onClick={handleSignature}>
        <Image src='/play.svg' alt='play' width='28' height='32' className='w-6 h-8'/>
        Assine agora
    </button>
  )
}
