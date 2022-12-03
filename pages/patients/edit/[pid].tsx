import { useCallback } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

import { sessionWrapper } from "../../../utils/sessionWrapper";
import { getPatients, editPatient } from "../../../utils/api/requests";
import PatientForm from "../../../components/PatientForm/PatientForm";
import { PatientInput } from "../../../utils/schemas/patient.schema";

import type { Patient } from "../../../utils/types/Patient";
import type { User } from "../../../utils/types/User";


export default function Formulate({ patientData, user }: { patientData: Patient | null, user: User | null }) {
    const router = useRouter();
    const handleSubmit = useCallback(
        async(data: PatientInput) => {
            if(!patientData?.id) return;
            if(user) {
                const response = await editPatient(data, patientData?.id.toString(), user.token)
                if(response?.data) router.push('/dashboard')
            } else {
                localStorage.setItem("patient", JSON.stringify(data))
                router.push('/dashboard')
            }
        }, [user, patientData, router]
    )

    if(!patientData) return <div>Patient not found</div>
    const title = `Edit ${patientData.name}`
    const initialValues = {
        name: patientData?.name || '',
        DoB: new Date(patientData?.DoB || ''),
        weight: patientData?.weight || 0,
        idealWeight: patientData?.idealWeight,
        species: patientData?.species || "dog"
    }


  return (
    <Layout user={user} title={title}>
        <PatientForm 
            initialValues={initialValues} 
            handleSubmit={handleSubmit} 
        />
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