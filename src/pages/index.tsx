import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Layout from '../components/layout'
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
    <Layout>
      <Head>
        <title>TKB</title>
      </Head>
    </Layout>
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
