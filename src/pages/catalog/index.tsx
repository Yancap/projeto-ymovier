import { ContainerCard } from '@/components/Catalog/ContainerCard'
import Image from 'next/image'
import React, { MouseEvent } from 'react'
import { Card } from '../../components/Card'
import { Modal } from '@/components/Modal'

export default function Catalog() {
  
  return (
    <main className='min-h-[calc(100vh-5rem)] bg-catalog bg-cover bg-no-repeat'>
      <section className=' bg-gradient-to-t from-gray-800 via-gray-800/60 to-gray-900  backdrop-blur-sm'>
        <div className='container'>
          <section className="catalog-section-one ">
            <h1 className='text-white font-bold text-7xl'>
              Catálogo
            </h1>
          </section>
          <section className=" relative container pb-40 ">
            <div className='-top-80 absolute z-10 container'>
              <div className='flex pb-2 justify-between border-b-light-gray-500 border-b-[3px]'>
                <h2 className='text-white font-medium text-2xl'>
                  Principais Filmes
                </h2>
                <form className='flex '>
                  <input type="text" placeholder='Pesquisar' className='bg-transparent pb-2 transition-all border-b-gray-500 border-b-2 text-light-gray-300 outline-none  hover:placeholder:text-light-gray-300 focus:placeholder:text-light-gray-300 focus:border-b-light-gray-400'/>
                  <button type="submit" className='bg-gray-400 p-2'>
                    <Image src='/search.svg' alt='search' height='15' width='15'/>
                  </button>
                </form>
              </div>
              <ContainerCard>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </ContainerCard>
            </div>
          </section>
        </div>
      </section>
      <section className=' bg-gray-800 pb-20 pt-10'>
        <div className='container'>
          <div className='flex pb-2 justify-between border-b-light-gray-500 border-b-[3px]'>
            <h2 className='text-white font-medium text-2xl'>
              Filmes de Ação
            </h2>
          </div>
          <ContainerCard>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </ContainerCard>
        </div>
      </section>
      {/* <Modal /> */}
    </main>
  )
}
