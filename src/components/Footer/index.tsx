import Image from 'next/image'
import React from 'react'

export const Footer = () => {
  return (
    <footer className='hidden md:block bg-gray-600'>
        <div className='container flex justify-between items-center py-2'>
            <span className='text-gray-500 text-xs'>Projeto feito por Yan Gabriel</span>
        </div>
    </footer>
  )
}
