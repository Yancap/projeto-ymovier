import Image from 'next/image'
import React from 'react'

export const Modal = () => {
  return (
    <section className='h-screen w-screen backdrop-blur fixed top-0 left-0 z-50 flex items-center justify-center lg:pr-10 lg:pl-5'>
        <div className='bg-purple-950 w-screen h-screen lg:w-full lg:h-auto rounded py-2 px-8'>
            <header className='flex justify-end'>
              X
            </header>
            <div className='flex gap-2 lg:gap-6 mb-4 flex-wrap lg:flex-nowrap '>
                <figure className='bg-light-gray-200 min-w-[25rem] max-h-[35rem] lg:h-[28rem] xl:h-[35rem] xl:w-[40rem] max-w-md rounded'>
                  d
                </figure>
                <article className='flex flex-col gap-8 py-4'>
                    <div className='order-1 flex flex-col gap-3'>
                      <div className='flex gap-2 items-end'>
                        <h2 className='text-4xl xl:text-5xl text-white font-bold '>
                          Guardiões da Galáxia Vol. 2
                        </h2>
                        <span className='hidden lg:inline text-xl xl:text-2xl text-gray-500'>
                          (2017)
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <span className='text-gray-300 text-md xl:text-lg rounded border px-[6px]'>
                          12
                        </span>
                        <Image src='/star.svg' alt='star' height='12' width='12'/>
                        <span className='text-gray-300 text-md xl:text-lg'>
                          Ação, Ficção científica
                        </span>
                        <Image src='/star.svg' alt='star' height='12' width='12'/>
                        <span className='text-gray-500 text-md xl:text-lg'>
                          2h 17m
                        </span>
                      </div>
                    </div>
                    <div className='order-3 lg:order-2 relative grid place-items-center w-max h-max' >
                      <Image src='/star.svg' alt='star' width='76' height='76'/>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1 font-bold text-xl">67</span>
                    </div>
                    <div className='order-4 lg:order-3 '>
                      <h3 className='text-white font-medium text-2xl xl:text-3xl mb-2'>
                        Sinopse
                      </h3>
                      <p className='text-gray-300 text-md xl:text-lg'>
                        Atravessando os confins do cosmos, os Guardiões terão que lutar para manter sua 
                        recém-descoberta família unida enquanto desvendam o mistério da real ascendência 
                        de Peter Quill. Antigos inimigos se tornam aliados durante essa busca.
                      </p>
                    </div>
                    <div className='order-5 lg:order-4 justify-between flex gap-14 lg:justify-start'>
                      <div>
                        <h4 className='font-bold text-xl xl:text-2xl text-white'>James Gunn</h4>
                        <span className='font-light text-base text-gray-300'>Diretor, Escritor</span>
                      </div>
                      <div>
                        <h4 className='font-bold text-xl xl:text-2xl text-white'>Dan Abnett</h4>
                        <span className='font-light text-base text-gray-300'>Escritor</span>
                      </div>
                      <div>
                        <h4 className='font-bold text-xl xl:text-2xl text-white'>Andy Lanning</h4>
                        <span className='font-light text-base text-gray-300'>Escritor</span>
                      </div>
                    </div>
                    <button className='order-2 lg:order-5 justify-center flex gap-3 items-center rounded-md bg-gray-300 py-2 px-6 transition-all font-bold text-xl text-gray-800 lg:self-start hover:bg-gray-400'>
                      <Image src='/play.svg' alt='play' width='18' height='20' className='mt-px'/>
                      Assistir
                    </button>
                </article>
            </div>
        </div>
    </section>
  )
}
