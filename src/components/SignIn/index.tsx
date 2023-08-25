import React from 'react'
import styles from './signIn.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react'

export const SignIn = () => {

  const {data: session} = useSession()

  return session ? 
  (
    <button className={styles.signIn} onClick={() => signOut()}>
        {session.user?.name}
    </button>
  ) : (
      <button className={styles.signIn}  onClick={() => signIn('github')}>
          Entrar
      </button>
    )
}
