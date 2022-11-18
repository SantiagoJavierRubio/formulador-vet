import Layout from "../components/Layout"
import Head from "next/head";
import type { Patient } from "../utils/types/Patient";
import { ChangeEvent, SyntheticEvent, useState } from "react"
import { PatientSchema } from "../utils/schemas/patient.schema";
import { ZodError } from "zod"
import { useRouter } from "next/router";
import styles from "../styles/AddPatient.module.css"
import { sessionWrapper } from "../utils/sessionWrapper";
import type { User } from "../utils/types/User";
import { createPatient } from "../utils/api/requests";

interface inputs {
    name: Patient["name"];
    species: Patient["species"];
    DoB: string | undefined;
    weight: Patient["weight"];
    idealWeight?: Patient["idealWeight"];
}

interface errors {
    name?: string;
    species?: string;
    DoB?: string;
    weight?: string;
    idealWeight?: string;
}

export default function AddPatient({ user }: { user?: User }) {

    const [values, setValues] = useState<inputs>({
        name: "",
        species: "dog",
        DoB: undefined,
        weight: 0,
        idealWeight: undefined,
    });
    const [isIdeal, setIdeal] = useState(true);
    const [errors, setErrors] = useState<errors>({});
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setErrors({});
        const data = {
            ...values,
            DoB: new Date(values.DoB || ''),
            idealWeight: !isIdeal ? values.idealWeight : undefined
        }
        try {
            PatientSchema.parse(data)
            const response = await createPatient(data, user?.token)
            console.log(response)
            if(response?.data) router.push('/')
        } catch(err) {
            if (err instanceof ZodError) {
                const newErrors: {[key: string]: string} = {}
                err.issues.forEach(error => {
                    newErrors[error.path[0]] = error.message
                })
                setErrors(newErrors);
            }
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues(prevValues => ({
            ...prevValues, [e.target.name]: e.target.type === "number" ? parseFloat(e.target.value) : e.target.value
        }))
    }
    const toggleIdeal = () => {
        setValues(prevValues => ({...prevValues, idealWeight: isIdeal ? values.weight : undefined}))
        setIdeal(i => !i)
    }
  return (
    <>
    <Head>
        <title>Add a new patient</title>
    </Head>
    <Layout>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
            <div className={styles.inputGroup}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={values.name} onChange={handleChange} required/>
                <p>{errors.name}</p>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="species">Species:</label>
                <select name="species" title="species" value={values.species} onChange={handleChange} required>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                </select>
                <p>{errors.species}</p>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="DoB">Age:</label>
                <input type="date" name="DoB" value={values.DoB} onChange={handleChange} required/>
                <p>{errors.DoB}</p>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="weight">Weight:</label>
                <input type="number" step="0.01" min="0" name="weight" value={values.weight} onChange={handleChange} required/>
                <p>{errors.weight}</p>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="isIdealWeight">Is on it&apos;s ideal weight</label>
                <input type="checkbox" name="isIdealWeight" checked={isIdeal} onChange={toggleIdeal} />
            </div>
            <div className={`inputGroup ${isIdeal && 'invisible'}`}>
                <label htmlFor="idealWeight">Ideal weight:</label>
                <input type="number" step="0.01" min="0" name="idealWeight" value={values.idealWeight || 0} onChange={handleChange} disabled={isIdeal}/>
                <p>{errors.idealWeight}</p>
            </div>
            <button className="mainActionBtn w-full max-w-xs" type="submit">Send</button>
        </form>
    </Layout>
    </>
  )
}

export const getServerSideProps = sessionWrapper(
    async function({ req }) {
        return {
            props: { user: req.session.user }
        }
    }
)
