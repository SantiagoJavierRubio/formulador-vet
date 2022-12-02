import { useState } from "react";
import Head from "next/head";

import { sessionWrapper } from "../../utils/sessionWrapper";
import { getPatients } from "../../utils/api/requests";
import { DietSchema, Diet } from "../../utils/schemas/diet.schema";
import { useForm } from "../../hooks/useForm";
import FormElement from "../../components/FormElement/FormElement";
import { dailyRequirements } from "../../calculations/calculations";

import type { Patient } from "../../utils/types/Patient";
import type { User } from "../../utils/types/User";

import styles from "../../styles/Formulator.module.css";

export default function Formulate({ patientData, user }: { patientData: Patient | null, user: User | null }) {
  const [stage, setStage] = useState<number>(0);
  const { values, errors, handleChange } = useForm<Diet>({
    initialValues: {
      adjFactor: 0,
      weightPercentage: 0
    },
    validationSchema: DietSchema
  });
  if(!patientData) return <div>Patient not found</div>
  const handleStageChange = (stageNum: number) => {
    setStage(stageNum);
    setTimeout(() => {
      setStage(0)
    }, 200)
  }
  const title = `Formulating for ${patientData.name}`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Formulate your patient's diets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <FormElement title={"Requirements & Goals"} startOpen={true}>
          <div className={styles.reqContainer}>
            <div className={styles.inputGroup}>
              <label htmlFor="adjFactor">Factor de ajuste</label>
              <input type="number" min="0" value={values.adjFactor} step="1" required onChange={handleChange} name="adjFactor" id="adjFactor" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="weightPercentage">% Peso vivo</label>
              <div className={styles.percentage}>
                <input type="number" min="0" value={values.weightPercentage} step="0.1" required onChange={handleChange} name="weightPercentage" id="weightPercentage" />
              </div>
            </div>
          </div>
          <button type="button" onClick={() => handleStageChange(1)}>Continue</button>
        </FormElement>
        <FormElement title={"Formulation"} forceState={stage === 1 || undefined}>
          <p>{dailyRequirements(patientData.weight, patientData.species, values.adjFactor)} kcal / day</p>
          {values.weightPercentage !== undefined && values.weightPercentage !== 0 && <p>{Math.floor(patientData.weight*values.weightPercentage)} g / day</p>}
          <button type="button" onClick={() => handleStageChange(1)}>Continue</button>
        </FormElement>
      </div>
    </>
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