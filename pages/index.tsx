import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import { NextApiRequest } from 'next'
import type { Patient } from '../utils/types/Patient'
import Dashboard from '../components/Dashboard/Dashboard'
import axios from "axios";

export default function Home({ patients }: { patients?: Patient[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>VetDiet</title>
        <meta name="description" content="Formulate your patient's diets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <form method="POST" action="/api/auth">
          <input type="email" name="email" />
          <input type="password" name="password" />
          <button type="submit">Sign in</button>
        </form>
        <Dashboard patients={patients} />
      </Layout>
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

export async function getServerSideProps({ req }: { req: NextApiRequest}) {
  try {
    const response = await axios.get("http://localhost:8080/patients", { withCredentials: true, headers: {
      Cookie: req.headers.cookie
    } });
    const patients = response.data.patients as Patient[]
    return { props: { patients }}
  } catch(err) {
    console.log(err);
    return { props: {} }
  }
}