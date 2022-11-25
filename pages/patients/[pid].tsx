import { ChangeEvent, useState } from "react";
import { sessionWrapper } from "../../utils/sessionWrapper";
import { getPatients, deletePatient } from "../../utils/api/requests";
import type { Patient } from "../../utils/types/Patient";
import type { User } from "../../utils/types/User";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function Patient({ patientData, user }: { patientData: Patient | null, user: User | null }) {
    const [inputName, setInputName] = useState<string>('');
    const router = useRouter()
    if(!patientData) return <div>Patient not found</div>
    const {
        id,
        name,
        species,
        DoB,
        weight,
        idealWeight,
    } = patientData

    const handleName = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputName(e.target.value)
    }
    const handleDelete = () => {
        if (inputName !== name) return;
        deletePatient(id.toString(), user?.token).then(res => {
            if(res?.status === 200) router.push('/dashboard')
        })
    }
  return (
    <Layout user={user}>
        <>
            <h1>{name}</h1>
            <h6>({species})</h6>
            <p>{new Date(DoB).toLocaleDateString()}</p>
            <p>{weight} kg</p>
            {idealWeight && <p>{idealWeight} kg</p>}
            <div>
                <label htmlFor="patient-name">Enter patient name to delete</label>
                <input type="text" id="patient-name" onChange={handleName} value={inputName} />
                <button disabled={!(inputName === name)} onClick={handleDelete}>Delete this patient</button>
            </div>
        </>
    </Layout>
  )
}


export const getServerSideProps = sessionWrapper(
    async function({ req, query }) {
        try {
            const response = await getPatients(query.pid?.toString(), req.session.user?.token);
            return {
                props: { patientData: response?.data || null, user: req.session.user || null}
              }
        } catch (err) {
            return {
              props: { patientData: null, user: null }
            }
        }
    }
  )