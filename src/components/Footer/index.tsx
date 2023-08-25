import Image from 'next/image'
import React from 'react'
import styles from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={'container'}>
            <span className='text-gray-500 text-xs'>Projeto feito por Yan Gabriel</span>
        </div>
    </footer>
  )
}
