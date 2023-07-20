import { Simplify } from '@prismicio/client/dist/types/value/types';
import React from 'react'
import { NewMoviesDocumentData } from '@/pages/catalog';
import Image from 'next/image';

interface CardProps{
  movie: Simplify<NewMoviesDocumentData>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDataModal: React.Dispatch<React.SetStateAction<NewMoviesDocumentData | null>>;
}


export const Card = ({movie, setModal, setDataModal}: CardProps) => {


  return (
    <div className='card group [scroll-snap-align:center;] [scroll-snap-stop:always;]  hover:scale-105 hover:z-30 select-none'
    onClick={() => {
      setModal(modal => !modal)
      setDataModal(movie)
      }}>
        <figure className='max-h-64 h-auto overflow-hidden'>
            <img src={movie.poster.url} alt={movie.poster.alt} className='max-w-full h-auto'/>
        </figure>
        <div className='p-2 bg-gray-900 flex flex-col justify-between  gap-2'>
            <h3 className='text-white font-bold group-hover:text-red-500'>
              {movie.title}
            </h3>
            <span className='text-gray-500/50'>
              {movie.year}
            </span>
            <footer className='flex justify-between items-end'>
              <span className='text-[11px] text-gray-500/80 '>
                {movie.gender}
              </span>
              <span className='text-gray-500 font-medium text-sm'>
                {movie.review}/100
              </span>
            </footer>
        </div>
    </div>
  )
}
