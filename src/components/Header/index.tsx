import Image from 'next/image'
import React from 'react'
import { SignIn } from '../SignIn'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className='bg-gray-600 h-20'>
        <div className='container flex justify-between items-center'>
          <div className='flex gap-10'>
            <Image src='/logo.svg' alt='logo' width='140' height='32'/>
            <nav className='flex gap-4'>
              <div className='div-link div-link-active'>
                  <Link href="/" className='link-active'>Home</Link>
              </div>
              <div className='div-link'>
                  <Link href="/catalog" className='link'>Catálogo</Link>
              </div>
            </nav>
          </div>
          <SignIn />
        </div>
    </header>
  )
}
