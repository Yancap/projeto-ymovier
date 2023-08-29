import { api } from '@/services/api'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { AllDocumentTypes } from '../../../prismicio-types'
import { useRouter } from 'next/router'
import styles from './search.module.scss'
import { NewMoviesDocumentData } from '@/pages/catalog/catalog'


export const Search = () => {
  const input = useRef<HTMLInputElement>(null)
  const [result, setResult] = useState<NewMoviesDocumentData>()
  const router = useRouter()
  async function handleSearch(){
    const search = input.current?.value.toLowerCase()
    router.push(`/search?query=${search}`)
    //const { data } = await api.post('/search', {search})
    //setResult(data.movies)
  }
  console.log(result);
  
  return (
    <form className={styles.form}
      onSubmit={(event) => {
          event.preventDefault()
          handleSearch()
      }}>
        <input ref={input} type="text" placeholder='Pesquisar' className={styles.input}/>
        <button type="submit" className={styles.button} >
            <Image src='/search.svg' alt='search' height='16' width='16'/>
        </button>
    </form>
  )
}
