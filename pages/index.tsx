import Head from 'next/head'
import Image from 'next/image'

import Landing from '../components/Landing/Landing'
import { sessionWrapper } from '../utils/sessionWrapper'
import type { User } from '../utils/types/User'

import styles from '../styles/Home.module.css'

export default function Home({ user }: { user?: User }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>VetDiet</title>
        <meta name="description" content="Formulate your patient's diets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing user={user} />
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps = sessionWrapper(
  async function({ req }) {
      return {
        props: { user: req.session.user || null }
    }
  }
)