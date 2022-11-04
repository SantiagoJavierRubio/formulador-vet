import type { Patient } from "../../utils/types/Patient"
import styles from "../../styles/Dashboard.module.css";
import { MdPets } from "react-icons/md"
import Link from "next/link";

export default function Dashboard({ patients }: { patients?: Patient[] }) {
  return (
    <div className={styles.container}>
        {patients && patients.map(patient => {
            return (
                <div className={styles.card} key={patient.id}>{patient.name} - {patient.species}</div>
            )
        })}
        <Link href="add-patient" className={styles.card}>
            <div className="flex flex-col justify-center w-full h-full py-3">
                <MdPets className="m-auto text-2xl"/>
                <h6 className="text-center">Add new patient</h6>
            </div>
        </Link>
    </div>
  )
}