import { ContainerCard } from '@/components/Catalog/ContainerCard'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Modal } from '@/components/Modal'
import { GetServerSideProps} from 'next'
import { getPrismicClient } from '@/services/prismic'
import { Simplify } from '@prismicio/client/dist/types/value/types'
import { MoviesDocumentData } from '../../../prismicio-types'

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
  signature: 'active' | 'canceled' | string;
}


interface SignatureResponse {
  signature: string | null;
}


export default function Catalog({movies}: CatalogProps) {
  const [ modal, setModal ] = useState(false)
  const [ dataModal, setDataModal ] = useState<NewMoviesDocumentData | null>(null)
  
  return (
    <main className='min-h-[calc(100vh-5rem)] '>
      <section className='bg-catalog bg-cover bg-no-repeat'>
        <div className='bg-gradient-to-t from-gray-800 via-gray-800/70 to-gray-900 backdrop-blur-sm'>
          <div className='container'>
            <section className="catalog-section-one ">
              <h1 className='text-white font-bold text-5xl lg:text-7xl'>
                Catálogo
              </h1>
            </section>
            <section className="relative container pb-20 md:pb-40 ">
              <div className='-top-80 absolute z-10 sm:container w-[calc(100%-1rem)]'>
                <div className='flex gap-4 flex-col md:flex-row pb-2 justify-between border-b-light-gray-500 border-b-2'>
                  <h2 className='text-white font-medium text-2xl order-1'>
                    Principais Filmes
                  </h2>
                  <form className='flex w-full md:w-auto md:order-2'>
                    <input type="text" placeholder='Pesquisar' 
                    className='bg-transparent pb-1 transition-all w-full md:w-auto
                    border-b-gray-500 border-b-2 text-light-gray-300 outline-none  
                    hover:placeholder:text-light-gray-300 focus:placeholder:text-light-gray-300 
                    focus:border-b-light-gray-400'/>
                    <button type="submit" className='bg-gray-400/20 py-1 px-2 rounded-r-full rounded-tl-full transition-all hover:bg-gray-400'>
                      <Image src='/search.svg' alt='search' height='15' width='15'/>
                    </button>
                  </form>
                </div>
                <ContainerCard>
                  {movies && movies.map(movie => (
                    <Card key={movie.title} movie={movie} setModal={setModal} setDataModal={setDataModal}/>
                  ))}
                  
                </ContainerCard>
              </div>
            </section>
          </div>
        </div>

      </section>
      <section className=' bg-gray-800 pb-20 pt-10'>
        <div className='container'>
          <div className='flex pb-2 justify-between border-b-light-gray-500 border-b-2'>
            <h2 className='text-white font-medium text-2xl'>
              Filmes de Ação
            </h2>
          </div>
          <ContainerCard>
            {movies && movies.map(movie => (
              <Card key={movie.title} movie={movie} setModal={setModal} setDataModal={setDataModal}/>
            ))}
          </ContainerCard>
        </div>
      </section>
      {(modal && dataModal) && <Modal movie={dataModal} setModal={setModal}/> }
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res, params}) => {
  const prismic = getPrismicClient();
  
  const response = await prismic.getAllByType('movies', {
    fetch: [], 
    pageSize: 100, 
  })

  const movies = response.map(movie => ({
    slug: movie.uid, 
    ...movie.data,
    gender: (movie.data.gender.map(gen => gen.type)).join(", "),
    runtime: movie.data.runtime ? ( `${Math.floor(movie.data.runtime / 60)}h ${movie.data.runtime - (60 * Math.floor(movie.data.runtime / 60))}min`) : 0,
    video: {
      ...movie.data.video,
      height: 'auto',
      width: 'auto',
      html: movie.data.video.html?.replace(/(?:width|height)="(\d+)"/g, "class=\"iframe\" ")
    }
  }))
  
  return {
    props: {
      movies,
    }
  }
}