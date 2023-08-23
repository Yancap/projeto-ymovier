import { ContainerCard } from '@/components/Catalog/ContainerCard'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Modal } from '@/components/Modal'
import { GetServerSideProps, GetStaticPaths} from 'next'
import { getPrismicClient } from '@/services/prismic'
import { Simplify } from '@prismicio/client/dist/types/value/types'
import { MoviesDocumentData } from '../../../prismicio-types'
import { Search } from '@/components/Search'
import { api } from '@/services/api'
import searchEngine from '@/services/search'
import { NewMoviesDocumentData } from '../catalog'
import { useRouter } from 'next/router'


interface SearchProps{
  movies: Simplify<NewMoviesDocumentData[]>;
  signature: 'active' | 'canceled' | string;
}

export default function SearchPage({movies}: SearchProps) {
  const [ modal, setModal ] = useState(false)
  const [ dataModal, setDataModal ] = useState<NewMoviesDocumentData | null>(null)
  const {query} = useRouter()
  const result = query.query
  console.log(query);
  
  return (
    <main className='min-h-[calc(100vh-5rem)] '>
      <section className='bg-catalog bg-cover bg-no-repeat'>
        <div className='bg-gradient-to-t from-gray-800 via-gray-800/70 to-gray-900 backdrop-blur-sm'>
          <div className='container'>
            <section className="py-16 lg:py-24 mx-auto text-center">
              <h1 className='text-white font-bold text-5xl lg:text-7xl'>
                Resultados
              </h1>
            </section>
            <section className="relative container pb-20 md:pb-40 ">
              <div className=' z-10 sm:container w-[calc(100%-1rem)]'>
                <div className='flex gap-4 flex-col md:flex-row pb-2 justify-between border-b-light-gray-500 border-b-2'>
                  <h2 className='text-white font-medium text-2xl order-1'>
                    {result}
                  </h2>
                  <Search />
                </div>
                <div className={`container-results z-10`} >
                  {movies && movies.map(movie => (
                    <Card key={movie.title} movie={movie} setModal={setModal} setDataModal={setDataModal}/>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      {(modal && dataModal) && <Modal movie={dataModal} setModal={setModal}/> }
    </main>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  const search: string = query.query as string
  const { movies } = await searchEngine(search)
  console.log(movies);
  
  return {
    props: {
        movies
    }
  }
}