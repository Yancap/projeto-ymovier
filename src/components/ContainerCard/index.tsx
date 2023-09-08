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
  
  function handleScrollLeft(event: any, action: string = "none"){
    
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
      if (action !== "no-scroll") {
        container.current.scrollBy({
          left: -150
        })
      }
      
    }
  }
  function handleScrollRight(){
    if (container.current && window.screen.width > 480) {
      if (leftArrow.current) {
        leftArrow.current.style.display = 'flex'
      }
      container.current.scrollBy({
          left: 150
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
            <div>
               <Image src='/arrow.svg' alt='left' height='18' width='18' /> 
            </div>
        </div>
        <div className={`${styles.container_card}`} ref={container} onScroll={(event) => {          
          if(window.innerWidth > 480) handleScrollLeft(event, "no-scroll")
        }}>
           {children} 
        </div>
        <div className={styles.right_arrow} onPointerDown={handleScrollRight}>
            <div>
               <Image src='/arrow.svg' alt='left' height='18' width='18' /> 
            </div>
        </div>
    </div>
  )
}
