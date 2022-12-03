import { useState, FormEvent } from 'react'

import { useForm } from "../../hooks/useForm";
import { PatientSchema, PatientInput } from "../../utils/schemas/patient.schema";

import styles from "../../styles/AddPatient.module.css";

interface IPatientFormProps {
    initialValues?: PatientInput,
    handleSubmit: (values: PatientInput) => Promise<void>
}

export default function PatientForm({ initialValues, handleSubmit }: IPatientFormProps) {
    const [isIdeal, setIdeal] = useState<boolean>(initialValues?.idealWeight === undefined);
    const { values, errors, handleChange } = useForm<PatientInput>({
        initialValues: {
            name: initialValues?.name || '',
            DoB: new Date(initialValues?.DoB || ''),
            weight: initialValues?.weight || 0,
            idealWeight: initialValues?.idealWeight,
            species: initialValues?.species || "dog"
        },
        validationSchema: PatientSchema
      });
      const getDateValue = (date: Date) => {
        if(!(date instanceof Date) || !date?.toJSON()) return undefined;
        return date.toJSON().split('T', 1)[0]
      }

      const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const parsedValues = {
                ...values,
                DoB: new Date(values.DoB)
            }
            PatientSchema.parse(parsedValues)
            await handleSubmit(parsedValues);
        } catch (err) {
            console.log(err);
        }
      }
  return (
    <form className="flex flex-col justify-center items-center gap-4" onSubmit={onSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={values.name} onChange={handleChange} required/>
                {/* <p>{errors.name}</p> */}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="species">Species:</label>
                <select name="species" title="species" value={values.species} onChange={handleChange} required>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                </select>
                {/* <p>{errors.species}</p> */}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="DoB">Age:</label>
                <input type="date" name="DoB" value={getDateValue(values.DoB)} onChange={handleChange} required/>
                {/* <p>{errors.DoB}</p> */}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="weight">Weight:</label>
                <input type="number" step="0.01" min="0" name="weight" value={values.weight} onChange={handleChange} required/>
                {/* <p>{errors.weight}</p> */}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="isIdealWeight">Is on ideal weight</label>
                <input type="checkbox" name="isIdealWeight" checked={isIdeal} onChange={() => setIdeal(i => !i)} />
            </div>
            <div className={`${styles.inputGroup} ${isIdeal && 'invisible'}`}>
                <label htmlFor="idealWeight">Ideal weight:</label>
                <input type="number" step="0.01" min="0" name="idealWeight" value={values.idealWeight || 0} onChange={handleChange} disabled={isIdeal}/>
                {/* <p>{errors.idealWeight}</p> */}
            </div>
            <button className="mainActionBtn w-full max-w-xs" type="submit">Send</button>
        </form>
  )
}
