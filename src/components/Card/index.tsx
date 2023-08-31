import { Simplify } from '@prismicio/client/dist/types/value/types';
import React from 'react'
import styles from './styles.module.scss'
import { NewMoviesDocumentData } from '@/pages/catalog/catalog';

interface CardProps{
  movie: Simplify<NewMoviesDocumentData>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDataModal: React.Dispatch<React.SetStateAction<NewMoviesDocumentData | null>>;
}


export const Card = ({movie, setModal, setDataModal}: CardProps) => {


  return (
    <div className={styles.card}
    onClick={() => {
      setModal(modal => !modal)
      setDataModal(movie)
      }}>
        <figure className={styles.image}>
            <img src={movie.poster.url} alt={movie.poster.alt} />
        </figure>
        <article className={styles.content}>
          <div>
            <h3>
              {movie.title}
            </h3>
            <span>
              {movie.year}
            </span>
          </div>
          <footer>
              <span>
                {movie.gender}
              </span>
              <span className='text-gray-500 font-medium text-[calc(.5rem+0.5vw)]'>
                {movie.review}/100
              </span>
          </footer>
        </article>
    </div>
  )
}
