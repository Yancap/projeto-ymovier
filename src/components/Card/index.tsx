import React from 'react'

export const Card = () => {
  return (
    <div className='card group [scroll-snap-align:center;] [scroll-snap-stop:always;]  hover:scale-105 hover:z-30 select-none'>
        <figure className='h-64 bg-slate-400'>
            
        </figure>
        <div className='p-2 bg-gray-900 flex flex-col justify-between  gap-2'>
            <h3 className='text-white font-bold group-hover:text-red-500'>
              Guardiões da Galáxia Vol. 2
            </h3>
            <span className='text-gray-500/50'>
              2017
            </span>
            <footer className='flex justify-between items-end'>
              <span className='text-[11px] text-gray-500/80 '>
                Ação, Aventura Comédia
              </span>
              <span className='text-gray-500 font-medium text-sm'>
                67/100
              </span>
            </footer>
        </div>
    </div>
  )
}
