import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { prisma } from '../db/client'
import { trpc } from '../utils/trpc' 

const Home: NextPage = (props: any) => {
  const { data: session, status } = useSession()
  const hello = trpc.useQuery(['hello', { text: 'client'}])

  if (!hello.data) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <Head>
        <title>TKB</title>
      </Head>
      {!session && (
        <>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}

      {session?.user && (
        <>
          <h4>You are signed in as: {session.user.name}</h4>
          <div>
            <p>{hello.data.greeting}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const aircrafts = await prisma.aircrafts.findMany()
  return {
    props: {
      aircrafts: JSON.stringify(aircrafts),
    }
  }
}
