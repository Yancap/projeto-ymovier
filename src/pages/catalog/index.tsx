import { ContainerCard } from '@/components/Catalog/ContainerCard'
import Image from 'next/image'
import React, { MouseEvent, useState } from 'react'
import { Card } from '../../components/Card'
import { Modal } from '@/components/Modal'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '@/services/prismic'
import { Simplify } from '@prismicio/client/dist/types/value/types'
import { MoviesDocumentData } from '../../../prismicio-types'
import { moveEmitHelpers } from 'typescript'

export interface NewMoviesDocumentData extends Omit<MoviesDocumentData, "gender" | "poster" | "runtime"> {
  gender: string;
  poster: {
    url: string;
    alt: string
  }
  runtime: string;
}

interface CatalogProps{
  movies: Simplify<NewMoviesDocumentData[]>;
}

export default function Catalog({movies}: CatalogProps) {
  const [ modal, setModal ] = useState(false)
  const [ dataModal, setDataModal ] = useState<NewMoviesDocumentData | null>(null)

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
                {movies && movies.map(movie => (
                  <Card movie={movie} setModal={setModal} setDataModal={setDataModal}/>
                ))}
                
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
            {movies && movies.map(movie => (
              <Card movie={movie} setModal={setModal} setDataModal={setDataModal}/>
            ))}
          </ContainerCard>
        </div>
      </section>
      {(modal && dataModal) && <Modal movie={dataModal} setModal={setModal}/> }
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getAllByType('movies', {
    fetch: [], 
    pageSize: 100, 
  })

  const movies = response.map(movie => ({
    slug: movie.uid, 
    ...movie.data,
    gender: (movie.data.gender.map(gen => gen.type)).join(", "),
    runtime: movie.data.runtime ? ( `${Math.floor(movie.data.runtime / 60)}h ${movie.data.runtime - (60 * Math.floor(movie.data.runtime / 60))}min`) : 0
  }))
  return {
    props: {
      movies
    }
  }
}