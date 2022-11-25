import { sessionWrapper } from "../../utils/sessionWrapper";
import { getPatients } from "../../utils/api/requests";
import type { Patient } from "../../utils/types/Patient";
import type { User } from "../../utils/types/User";

export default function Formulate({ patientData, user }: { patientData: Patient | null, user: User | null }) {
  if(!patientData) return <div>Patient not found</div>
  return (
    <div>Formulating for {patientData.name}</div>
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