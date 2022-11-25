import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import type { User } from '../utils/types/User'
import type { Patient } from '../utils/types/Patient'
import Dashboard from '../components/Dashboard/Dashboard'
import { sessionWrapper } from '../utils/sessionWrapper'
import { getPatients } from '../utils/api/requests'

export default function Home({ user, patients }: { patients?: Patient[], user?: User }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>VetDiet - Dashboard</title>
        <meta name="description" content="Formulate your patient's diets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user || null}>
        <Dashboard patients={patients}/>
      </Layout>
      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export const getServerSideProps = sessionWrapper(
  async function({ req }) {
    try {
      const user = req.session.user;
      if(user) {
        const patientsResponse = await getPatients('', user.token);
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
)