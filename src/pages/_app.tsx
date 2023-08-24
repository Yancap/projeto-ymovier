import '@/styles/output.css'
import '@/styles/global.scss'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { SignatureProvider } from '@/context/SignatureContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
      <SignatureProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SignatureProvider>
    </SessionProvider>

    </>
    
  )
}
