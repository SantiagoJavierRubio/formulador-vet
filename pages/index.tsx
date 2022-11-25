import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import type { User } from '../utils/types/User'
import { sessionWrapper } from '../utils/sessionWrapper'
import Link from 'next/link'

export default function Home({ user }: { user?: User }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>VetDiet</title>
        <meta name="description" content="Formulate your patient's diets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to VetDiet</h1>
        <h3>Landing page data, info, etc...</h3>
        <Link href="/dashboard">{user ? "My patients" : "Try it out"}</Link>
        {!user && <Link href="/login">Sign in</Link>}
      </main>
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