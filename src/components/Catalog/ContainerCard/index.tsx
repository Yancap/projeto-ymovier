'use client';
import Image from 'next/image';
import React, { Children, PointerEvent, ReactElement, useEffect, useRef } from 'react'
import styles from './scroll.module.css'


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
    <div className="relative flex justify-between">
        <div ref={leftArrow} className='absolute h-full z-20 bg-gradient-to-r from-gray-700/50 to-transparent w-24 flex items-center select-none' onPointerDown={handleScrollLeft}>
            <div className='p-4 bg-gray-600/50 rounded-full -ml-6 cursor-pointer hover:bg-gray-600/80'>
               <Image src='/arrow.svg' alt='left' height='18' width='18' className='t rotate-180'/> 
            </div>
        </div>
        <div className={`container-card ${styles.scroll_card} z-10`} ref={container}>
           {children} 
        </div>
        <div className='absolute h-full z-20 right-0 bg-gradient-to-r from-transparent to-gray-700/50 w-24 flex items-center justify-end select-none' onPointerDown={handleScrollRight}>
            <div className='p-4 bg-gray-600/50 rounded-full -mr-6 cursor-pointer hover:bg-gray-600/80'>
               <Image src='/arrow.svg' alt='left' height='18' width='18' /> 
            </div>
        </div>
    </div>
  )
}
