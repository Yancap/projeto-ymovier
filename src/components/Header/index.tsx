import Image from 'next/image'
import React from 'react'
import { SignIn } from '../SignIn'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Header = () => {
  const {asPath} = useRouter()
  return (
    <header className='bg-gray-900 border-b-gray-800 border-b-2'>
        <div className='container flex justify-between items-center h-full'>
          <div className='flex gap-10'>
            <Image src='/logo.svg' alt='logo' width='122' height='32'/>
            <nav className='flex gap-4'>
              <div className={`div-link ${ asPath === "/" ? 'div-link-active' : null}`}>
                  <Link href="/" className={ asPath === "/" ? 'link-active' : 'link'}>Home</Link>
              </div>
              <div className={`div-link ${ asPath === "/catalog" ? 'div-link-active' : null}`}>
                  <Link href="/catalog" className={ asPath === "/catalog" ? 'link-active' : 'link'}>Catálogo</Link>
              </div>
            </nav>
          </div>
          <SignIn />
        </div>
    </header>
  )
}
