import Image from 'next/image'
import React from 'react'
import { Simplify } from '../../../prismicio-types';
import { NewMoviesDocumentData } from '@/pages/catalog';
import { styled } from 'styled-components';
import { ExecutionContext } from 'styled-components/dist/types';
interface ModalProps{
  movie: Simplify<NewMoviesDocumentData>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PropsContainer extends ExecutionContext{
  color: string;
  img: string;
}

const Container = styled.div`
  background-color: ${(props) => props.color + "B1"};
  @media screen and (max-width: 768px){
    background-color: ${(props) => props.color + "C1"};
  }
`

const Section = styled.section`
  @media screen and (max-width: 768px){
    background-image: url(${(props: any) => props['data-image']});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`


export const Modal = ({movie, setModal}: ModalProps) => {
  return (
    <Section data-image={movie.background.url} className='h-screen w-screen backdrop-blur fixed top-0 left-0 z-50 flex items-center justify-center lg:pr-10 lg:pl-5'>
        <Container color={movie.main_color as string}
        className='bg-opacity-70 w-screen h-screen lg:w-full lg:h-auto rounded py-2 px-8'>
            <header className='flex justify-end' onClick={() => setModal(modal => !modal)}>
              X
            </header>
            <div className='flex gap-2 lg:gap-6 mb-4 flex-wrap md:flex-nowrap '>
                <figure className='hidden md:block overflow-hidden w-[50rem] rounded'>
                  <img src={movie.poster.url} alt={movie.poster.alt} />
                </figure>
                <article className='flex flex-col gap-8 py-4'>
                    <div className='order-1 flex flex-col gap-3'>
                      <div className='flex gap-2 items-end'>
                        <h2 className='text-4xl xl:text-5xl text-white font-bold '>
                        {movie.title}
                        </h2>
                        <span className='hidden lg:inline text-xl xl:text-2xl text-gray-500'>
                          ({movie.year})
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <span className='text-gray-300 text-md xl:text-lg rounded border px-[6px]'>
                          {movie.parental_rating}
                        </span>
                        <Image src='/star.svg' alt='star' height='12' width='12'/>
                        <span className='text-gray-300 text-md xl:text-lg'>
                          {movie.gender}
                        </span>
                        <Image src='/star.svg' alt='star' height='12' width='12'/>
                        <span className='text-gray-500 text-md xl:text-lg'>
                          {movie.runtime}
                        </span>
                      </div>
                    </div>
                    <div className='order-3 lg:order-2 relative grid place-items-center w-max h-max' >
                      <Image src='/star.svg' alt='star' width='76' height='76'/>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1 font-bold text-xl">
                        {movie.review}
                      </span>
                    </div>
                    <div className='order-4 lg:order-3 '>
                      <h3 className='text-white font-medium text-2xl xl:text-3xl mb-2'>
                        Sinopse
                      </h3>
                      <p className='text-gray-300 text-md xl:text-lg'>
                        {movie.plot}
                      </p>
                    </div>
                    <div className='order-5 lg:order-4 justify-between flex gap-14 lg:justify-start'>
                      {movie.production.map(person => (
                        <div>
                          <h4 className='font-bold text-xl xl:text-2xl text-white'>{person.name}</h4>
                          <span className='font-light text-base text-gray-300'>{person.role}</span>
                        </div>
                      ))}
                    </div>
                    <button className='order-2 lg:order-5 justify-center flex gap-3 items-center rounded-md bg-gray-300 py-2 px-6 transition-all font-bold text-xl text-gray-800 lg:self-start hover:bg-gray-400'>
                      <Image src='/play.svg' alt='play' width='18' height='20' className='mt-px'/>
                      Assistir
                    </button>
                </article>
            </div>
        </Container>
    </Section>
  )
}
