import { useCallback } from "react"
import Layout from "../components/Layout"
import { useRouter } from "next/router";

import { sessionWrapper } from "../utils/sessionWrapper";
import { createPatient } from "../utils/api/requests";
import { PatientInput } from "../utils/schemas/patient.schema";
import type { Patient } from "../utils/types/Patient";
import type { User } from "../utils/types/User";
import PatientForm from "../components/PatientForm/PatientForm";


export interface inputs {
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

export default function AddPatient({ user }: { user: User | null }) {
    const router = useRouter();

    const handleSubmit = useCallback(async (data: PatientInput) => {
        if(user) {
            const response = await createPatient(data, user.token)
            if(response?.data) router.push('/dashboard')
        } else {
            localStorage.setItem("patient", JSON.stringify(data))
            router.push('/dashboard')
        }
    }, [user, router])

  return (
    <Layout user={user} title={'Add patient'}>
        <PatientForm handleSubmit={handleSubmit} />
    </Layout>
  )
}

export const getServerSideProps = sessionWrapper(
    async function({ req }) {
        return {
            props: { user: req.session.user || null }
        }
    }
)
