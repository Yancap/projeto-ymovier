'use client';
import Image from 'next/image';
import React, { Children, PointerEvent, ReactElement, useEffect, useRef } from 'react'
import styles from './containerCard.module.scss'


interface Props {
    children: string | JSX.Element | JSX.Element[] 
}

export const ContainerCard = ({children}: Props) => {
  const container = useRef<HTMLDivElement>(null)
  const leftArrow = useRef<HTMLDivElement>(null)
  function handleScrollLeft(){
    if (container.current) {
      if(container.current.scrollLeft === 0){
        if (leftArrow.current) {
          leftArrow.current.style.display = 'none'
        }
      } else {
        if (leftArrow.current) {
          leftArrow.current.style.display = 'flex'
        }
      }
      container.current.scrollBy({
        left: -0.5
      })
    }
  }
  function handleScrollRight(){
    if (container.current) {
      if (leftArrow.current) {
        leftArrow.current.style.display = 'flex'
      }
      container.current.scrollBy({
          left: 0.5
      })
    }
  }
  useEffect(()=>{
    if(container.current?.scrollLeft === 0){
      if (leftArrow.current) {
        leftArrow.current.style.display = 'none'
      }
    } else {
      if (leftArrow.current) {
        leftArrow.current.style.display = 'flex'
      }
    }
  }, [])
  return (
    <div className={styles.container_main}>
        <div ref={leftArrow} className={styles.left_arrow}  onPointerDown={handleScrollLeft}>
            <div className='p-[2vmin] bg-gray-600/50 rounded-full -ml-2 md:-ml-6 cursor-pointer hover:bg-gray-600/80'>
               <Image src='/arrow.svg' alt='left' height='18' width='18' className='w-[3vmin] rotate-180'/> 
            </div>
        </div>
        <div className={`container-card ${styles.scroll_card} z-10`} ref={container}>
           {children} 
        </div>
        <div className={styles.right_arrow} onPointerDown={handleScrollRight}>
            <div className='p-[2vmin] bg-gray-600/50 rounded-full -mr-2 md:-mr-6 cursor-pointer hover:bg-gray-600/80'>
               <Image src='/arrow.svg' alt='left' height='18' width='18' className='w-[3vmin]'/> 
            </div>
        </div>
    </div>
  )
}
