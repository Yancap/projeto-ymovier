import { ContainerCard } from '@/components/ContainerCard'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Modal } from '@/components/Modal'
import { GetServerSideProps} from 'next'
import { getPrismicClient } from '@/services/prismic'
import { Search } from '@/components/Search'
import styles from './catalog.module.scss'
import {CatalogProps, NewMoviesDocumentData, } from './catalog'


export default function Catalog({movies}: CatalogProps) {
  const [ modal, setModal ] = useState(false)
  const [ dataModal, setDataModal ] = useState<NewMoviesDocumentData | null>(null)
  
  return (
    <main className={styles.main}>
      <section>
        <div>
          <div className='container'>
            <section className={styles.section_header}>
              <h1>
                Catálogo
              </h1>
            </section>
            <section className={styles.section_floating}>
              <div>
                <div className={styles.heading}>
                  <h2 >
                    Principais Filmes
                  </h2>
                  <Search />
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
      <section className={styles.section}>
        <div className='container'>
          <div className={styles.heading}>
            <h2>
              Filmes de Ação
            </h2>
          </div>
          <ContainerCard>
            {movies && movies.filter(movie => movie.gender.includes("Ação"))
            .map(movie => (
              <Card key={movie.title} movie={movie} setModal={setModal} setDataModal={setDataModal}/>
            ))}
          </ContainerCard>
        </div>
      </section>
      <section className={styles.section}>
        <div className='container'>
          <div className={styles.heading}>
            <h2 >
              Filmes de Aventura
            </h2>
          </div>
          <ContainerCard>
            {movies && movies.filter(movie => movie.gender.includes("Aventura"))
            .map(movie => (
              <Card key={movie.title} movie={movie} setModal={setModal} setDataModal={setDataModal}/>
            ))}
          </ContainerCard>
        </div>
      </section>
      <section className={styles.section}>
        <div className='container'>
          <div className={styles.heading}>
            <h2 >
              Filmes de Suspense
            </h2>
          </div>
          <ContainerCard>
            {movies && movies.filter(movie => movie.gender.includes("Suspense"))
            .map(movie => (
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