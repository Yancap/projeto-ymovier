import { api } from '@/services/api'
import { getPrismicClient } from '@/services/prismic'
import Image from 'next/image'
import React, { useRef, useState } from 'react'


export const Search = () => {
  const input = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState<string>()
  console.log(search);

  async function handleSearch(){
    const search = input.current?.value.toLowerCase()
    const response = await api.post('/search', {search})
    console.log(response);
    
  }

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
