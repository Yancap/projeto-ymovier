import Image from 'next/image'
import React from 'react'
import styles from './header.module.scss'
import Link from 'next/link'
import { SignIn } from '../SignIn'
import { useRouter } from 'next/router'


export const Header = () => {
  const {asPath} = useRouter()
  return (
    <header className={styles.header}>
        <div className={`container ${styles.container}`}>
          <div className='flex gap-10'>
            <Image src='/logo.svg' alt='logo' width='122' height='32'/>
            <nav className={styles.navbar}>
              <div className='container'>
                <div className={`${styles.div_link} ${ asPath === "/" ? styles.div_link_active : null}`}>
                    <Link href="/" className={ asPath === "/" ? styles.link_active : styles.link}>Home</Link>
                </div>
                <div className={`${styles.div_link} ${ asPath === "/catalog" ? styles.div_link_active : null}`}>
                    <Link href="/catalog" className={ asPath === "/catalog" ? styles.link_active : styles.link}>Catálogo</Link>
                </div>
              </div>
            </nav>
          </div>
          <SignIn />
        </div>
    </header>
  )
}
