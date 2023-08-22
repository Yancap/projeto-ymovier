import { NewMoviesDocumentData } from '@/pages/catalog'
import { api } from '@/services/api'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { AllDocumentTypes } from '../../../prismicio-types'
import { useRouter } from 'next/router'


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
    <form className='flex w-full md:w-auto md:order-2 group'
    onSubmit={(event) => {
        event.preventDefault()
        handleSearch()
    }}
    >
        <input ref={input} type="text" placeholder='Pesquisar' className='search-input'/>
        <button type="submit" className='search-button' >
            <Image src='/search.svg' alt='search' height='16' width='16'/>
        </button>
    </form>
  )
}
