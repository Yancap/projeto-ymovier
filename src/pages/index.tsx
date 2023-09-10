import { SignatureButton } from '@/components/SignatureButton'
import { useSignatureContext } from '@/context/SignatureContext'
import { api } from '@/services/api'
import Head from 'next/head'
import styles from './index.module.scss'

import { useEffect } from 'react'

interface SignatureResponse {
  signature: string | null;
}

export default function Home() {
  const { setSignature } = useSignatureContext();
  useEffect(() => {
    api.get<SignatureResponse>("/get-user-signature")
    .then((response) => {
      setSignature<string | null>(response.data.signature)
    })
  }, [])
  return (
    <>
      <Head>
        <title>yMovier</title>
        <meta name="description" content="Site criado por Yan Gabriel Ferreira" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <main className={styles.main}>
        <div>
            <section className='container'>
              <div className={styles.content}>
                  <h1>
                    <strong>Filmes</strong>  para todas as pessoas<strong>.</strong>
                  </h1>
                  <h2>
                    Assista a qualquer filme, em qualquer lugar
                    por apenas <strong>R$ 19,99</strong> 
                  </h2>
                  <SignatureButton />
              </div>
            </section>
        </div>
    </main>
    </>
  )
}
