import { useState, SyntheticEvent, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from "../styles/Auth.module.css";
import { RegisterSchema } from "../utils/schemas/user.schema";
import constants from "../utils/constants";

interface input {
    displayName?: string;
    email: string;
    password: string;
}

export default function Signup() {

    const [values, setValues] = useState<input>({
        displayName: '',
        email: '',
        password: ''
    });
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            RegisterSchema.parse(values);
            const response = await axios.post(`${constants.apiUrl}/user`, values);
            if (response?.data?.created) router.push('/login')
        } catch(err) {
            if (err instanceof AxiosError && err?.response?.data?.error) alert(err.response.data.error)
            else console.log(err);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues(prevValues => ({
            ...prevValues, [e.target.name]: e.target.value
        }))
    }

  return (
    <main className={styles.container}>
        <Head>
            <title>VetDiet</title>
            <meta name="description" content="Formulate your patient's diets" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.formContainer}>
            <h3 className={styles.title}>Sign up</h3>
            <form className={styles.form} onSubmit={handleSubmit} >
                <label htmlFor='displayName'>Name:</label>
                <input type="text" maxLength={35} name="displayName" id="displayName" onChange={handleChange} value={values.displayName} />
                <label htmlFor='email'>Email:</label>
                <input type="email" name="email" id="email" required onChange={handleChange} value={values.email}/>
                <label htmlFor='password'>Password:</label>
                <input type="password" name="password" id="password" minLength={6} required onChange={handleChange} value={values.password} />
                <button className="mainActionBtn" type="submit">Sign up</button>
            </form>
            <div className={styles.optNav}>
                <p>Already have an account?</p>
                <Link href="login">Login</Link>
            </div>
        </div>
  </main>
  )
}
