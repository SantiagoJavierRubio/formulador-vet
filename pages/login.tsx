import Head from 'next/head'
import Link from 'next/link'

import styles from "../styles/Auth.module.css";

export default function Login() {
  return (
    <main className={styles.container}>
        <Head>
            <title>VetDiet</title>
            <meta name="description" content="Formulate your patient's diets" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.formContainer}>
            <h3 className={styles.title}>Login</h3>
            <form className={styles.form} method="POST" action="/api/login">
                <label htmlFor='email'>Email:</label>
                <input type="email" name="email" required />
                <label htmlFor='password'>Password:</label>
                <input type="password" name="password" required />
                <button className="mainActionBtn" type="submit">Login</button>
            </form>
            <div className={styles.optNav}>
                <p>No account?</p>
                <Link href="signup">Sign up</Link>
            </div>
        </div>
  </main>
  )
}
