import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { prisma } from './db'

const Home: NextPage = ({posts}) => {
  return (
    <div>
      <Head>
        <title>TKB</title>
      </Head>

      <main>
        <h1>
          Welcome to The Kneeboard
        </h1>

        <p>
          The purpose of the page is to create a resource page for flight simulator enthusiasts.
        </p>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

export const getServerSideProps = async ({ req }) => {
  const token = req.headers.AUTHORIZATION
  const userId = await getUserId(token)
  const posts = await prisma.post.findMany({
    where: {
      author: { id: userId },
    },
  })
  return { props: { posts } }
}
