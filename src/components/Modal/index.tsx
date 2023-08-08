import Image from 'next/image'
import React, { useState } from 'react'
import { Simplify } from '../../../prismicio-types';
import { NewMoviesDocumentData } from '@/pages/catalog';
import { styled } from 'styled-components';
import { useSignatureContext } from '@/context/SignatureContext';
import { signIn, useSession } from 'next-auth/react';
import { getStripeJs } from '@/services/stripe-js';
import { api } from '@/services/api';
import { useRouter } from 'next/router';

interface ModalProps{
  movie: Simplify<NewMoviesDocumentData>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  const { signature } = useSignatureContext();
  const [ viewMovie, setViewMovie ] = useState(false)
  const { data: session } = useSession()
  const router = useRouter();
  async function handleSignature(){
    if (!session) {
        signIn('github')
        return
    }
    try {
        const response = await api.post('/signature')
        const { sessionId } = response.data
        const stripe = await getStripeJs()
        await stripe?.redirectToCheckout({sessionId})
        
    } catch (error) {
        alert(error)
    }  
  }

  return (
    <Section data-image={movie.background.url} className='section-modal'>
        
        {viewMovie ? 
            <div className='h-full w-full py-2 px-8 relative'>
              <header className='flex cursor-pointer justify-end absolute text-white right-0 pt-2' 
              onClick={() => {setModal(modal => !modal); setViewMovie(false)}}>
                <Image src='/close.svg' alt="X" height="20" width="20" />
              </header>
              <div className='h-full w-full'
              dangerouslySetInnerHTML={{__html: movie.video.html as string}}
              />
            </div>
            :
            <Container color={movie.main_color as string}
              className='bg-opacity-70 w-screen h-screen lg:w-full lg:h-auto rounded py-2 px-8'>
              <header className='flex cursor-pointer justify-end pt-2' onClick={() => {setModal(modal => !modal); setViewMovie(false)}}>
                <Image src='/close.svg' alt="X" height="16" width="16" />
              </header>
              <div className='flex gap-2 lg:gap-6 mb-4 flex-wrap md:flex-nowrap'>
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
                      <div className='hidden lg:order-2 lg:relative lg:grid place-items-center w-max h-max' >
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
                      <button onClick={() => signature === "active" ? setViewMovie(true) : router.push("/")}
                        className='order-2 lg:order-5 justify-center flex gap-3 items-center rounded-md bg-gray-300 py-2 px-6 transition-all font-bold text-xl text-gray-800 lg:self-start hover:bg-gray-400'
                      >
                        <Image src='/play.svg' alt='play' width='18' height='20' className='mt-px'/>
                        Assistir
                      </button>
                  </article>
              </div>
            </Container>
        }
    </Section>
  )
}
