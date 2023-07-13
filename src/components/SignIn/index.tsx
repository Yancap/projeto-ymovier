import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

export const SignIn = () => {

  const {data: session} = useSession()

  return session ? 
  (
    <button className='signIn' onClick={() => signOut()}>
        {session.user?.name}
    </button>
  ) : (
      <button className='signIn'  onClick={() => signIn('github')}>
          Entrar
      </button>
    )
}
