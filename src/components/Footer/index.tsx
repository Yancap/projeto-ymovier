import Image from 'next/image'
import React from 'react'

export const Footer = () => {
  return (
    <footer className='bg-gray-600'>
        <div className='container flex justify-between items-center py-2'>
            <span className='text-gray-500'>Projeto feito por Yan Gabriel</span>
            <Image src='/movie-db.svg' alt='movie-db' width='48' height='32'/>
        </div>
    </footer>
  )
}
