import Image from 'next/image'
import React, { useState } from 'react'
import styles from './modal.module.scss'
import { Simplify } from '../../../prismicio-types';
import { styled } from 'styled-components';
import { useSignatureContext } from '@/context/SignatureContext';
import { signIn, useSession } from 'next-auth/react';
import { getStripeJs } from '@/services/stripe-js';
import { api } from '@/services/api';
import { useRouter } from 'next/router';
import { NewMoviesDocumentData } from '@/pages/catalog/catalog';

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
  console.log(signature);
  
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
    
        <>
        {viewMovie ? 
        <Section className={`${styles.section_modal}`}>
            <Container color={movie.main_color as string} className={styles.container_film}>
              <Image src='/close.svg' alt="X" height="20" width="20" onClick={() => {
                setModal(modal => !modal) 
                setViewMovie(false)}} 
              />
              <div className={styles.film} dangerouslySetInnerHTML={{__html: movie.video.html as string}}/>
            </Container>
          </Section>
            :
            <Section data-image={movie.background.url} className={`${styles.section_modal} `}>
              <Container color={movie.main_color as string} className={styles.container}>
                <header onClick={() => {setModal(modal => !modal); setViewMovie(false)}}>
                  <Image src='/close.svg' alt="X" height="16" width="16" />
                </header>
                <div>
                    <figure className={styles.post}>
                      <img src={movie.poster.url} alt={movie.poster.alt}/>
                    </figure>
                    <article className={styles.container_info}>
                        <header>
                          <div>
                            <h2>
                            {movie.title}
                            </h2>
                            <span >
                              ({movie.year})
                            </span>
                          </div>
                          <div>
                            <span>
                              {movie.parental_rating === 0 ? "Livre" : movie.parental_rating}
                            </span>
                            <Image src='/star.svg' alt='star' height='12' width='12'/>
                            <span>
                              {movie.gender}
                            </span>
                            <Image src='/star.svg' alt='star' height='12' width='12'/>
                            <span >
                              {movie.runtime}
                            </span>
                          </div>
                        </header>
                        <div className={styles.container_review} >
                          <Image src='/star.svg' alt='star' width='58' height='58'/>
                          <span>
                            {movie.review}
                          </span>
                        </div>
                        <div className={styles.container_plot}>
                          <h3>
                            Sinopse
                          </h3>
                          <p>
                            {movie.plot}
                          </p>
                        </div>
                        <div className={styles.container_production}>
                          {movie.production.map(person => (
                            <div>
                              <h4>{person.name}</h4>
                              <span>{person.role}</span>
                            </div>
                          ))}
                        </div>
                        <button className={styles.btn} onClick={() => signature === "active" ? setViewMovie(true) : router.push("/")}>
                          <Image src='/play.svg' alt='play' width='18' height='20' className='mt-px'/>
                          Assistir
                        </button>
                    </article>
                </div>
              </Container>
            </Section>
        }
    </>
  )
}
