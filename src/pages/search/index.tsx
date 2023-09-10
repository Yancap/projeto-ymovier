import { ContainerCard } from '@/components/ContainerCard'
import styles from './search.module.scss'
import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Modal } from '@/components/Modal'
import { GetServerSideProps, GetStaticPaths} from 'next'
import { Simplify } from '@prismicio/client/dist/types/value/types'
import { Search } from '@/components/Search'
import searchEngine from '@/services/search'
import { useRouter } from 'next/router'
import { NewMoviesDocumentData, SignatureResponse } from '../catalog/catalog'
import Head from 'next/head'
import { useSignatureContext } from '@/context/SignatureContext'
import { api } from '@/services/api'


interface SearchProps{
  movies: Simplify<NewMoviesDocumentData[]>;
  signature: 'active' | 'canceled' | string;
}

export default function SearchPage({movies}: SearchProps) {
  const [ modal, setModal ] = useState(false)
  const [ dataModal, setDataModal ] = useState<NewMoviesDocumentData | null>(null)
  const {query} = useRouter()
  const result = query.query
  const { setSignature } = useSignatureContext();
  useEffect(() => {
    api.get<SignatureResponse>("/get-user-signature")
    .then((response) => {
      setSignature<string | null>(response.data.signature)
    })
  }, [])
  return (
    <>
      <Head>
        <title>Buscas | yMovier</title>
        <meta name="description" content="Site criado por Yan Gabriel Ferreira" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <main className={styles.main}>
        <section>
          <div>
            <div className='container'>
              <section className={styles.section_header}>
                <h1 >
                  Resultados
                </h1>
              </section>
              <section className={styles.section_floating}>
                <div>
                  <div className={styles.heading}>
                    <h2>
                      {result}
                    </h2>
                    <Search />
                  </div>
                  <div className={styles.container_results} >
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
    </>
    
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