import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import { NextApiRequest } from 'next'
import type { User } from '../utils/types/User'
import type { Patient } from '../utils/types/Patient'
import Dashboard from '../components/Dashboard/Dashboard'
import axios from 'axios'
import constants from '../utils/constants'

export default function Home({ user, patients }: { user?: User, patients?: Patient[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>VetDiet</title>
        <meta name="description" content="Formulate your patient's diets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {user && <Dashboard patients={patients}/>}
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

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  try {
    const userResponse = await axios.get(`${constants.apiUrl}/user`, { withCredentials: true, headers: {
      Cookie: req.headers.cookie
    } });
    const user = userResponse?.data;
    if(user) {
      const patientsResponse = await axios.get(`${constants.apiUrl}/patients`, { withCredentials: true, headers: {
        Cookie: req.headers.cookie
      } });
      const patients = patientsResponse?.data?.patients as Patient[]
      return { props: { user, patients }}
    }
    return { props: {} }
  } catch(err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}