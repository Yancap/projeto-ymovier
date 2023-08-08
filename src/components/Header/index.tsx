import Image from 'next/image'
import React from 'react'
import { SignIn } from '../SignIn'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Header = () => {
  const {asPath} = useRouter()
  return (
    <header className='bg-gray-900 border-b-gray-800 border-b-2'>
        <div className='container flex justify-between items-center h-full py-2 md:py-0'>
          <div className='flex gap-10'>
            <Image src='/logo.svg' alt='logo' width='122' height='32'/>
            <nav className='w-full z-50 bg-gray-900 left-0 bottom-0 fixed md:static md:bg-inherit '>
              <div className='container flex gap-4'>
                <div className={`div-link ${ asPath === "/" ? 'div-link-active' : null}`}>
                    <Link href="/" className={ asPath === "/" ? 'link-active' : 'link'}>Home</Link>
                </div>
                <div className={`div-link ${ asPath === "/catalog" ? 'div-link-active' : null}`}>
                    <Link href="/catalog" className={ asPath === "/catalog" ? 'link-active' : 'link'}>Catálogo</Link>
                </div>
              </div>
            </nav>
          </div>
          <SignIn />
        </div>
    </header>
  )
}
