import Image from 'next/image'
import React from 'react'
import styles from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={'container'}>
            <span>Projeto feito por Yan Gabriel</span>
        </div>
    </footer>
  )
}
