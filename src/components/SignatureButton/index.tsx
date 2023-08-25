import { api } from '@/services/api'
import { getStripeJs } from '@/services/stripe-js'
import { signIn, useSession } from 'next-auth/react'
import styles from './signatureButton.module.scss'
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
    <button className={styles.signature} onClick={handleSignature}>
        Assine agora
    </button>
  )
}
