import type { Patient } from "../../utils/types/Patient"
import styles from "../../styles/Dashboard.module.css";
import { MdPets } from "react-icons/md";
import Cat from "../../assets/Cat.svg";
import Dog from "../../assets/Dog.svg";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard({ patients }: { patients?: Patient[] }) {
  return (
    <div className={styles.container}>
        {patients && patients.map(patient => {
            return (
                <div className={styles.card} key={patient.id}>
                    <h1 className="z-10 text-3xl relative break-before-auto">{patient.name}</h1>
                    <Image 
                        src={patient.species === "cat" ? Cat : Dog}
                        alt={`${patient.species} logo`}
                        height="100"
                        className={styles.coverImage}
                    />
                </div>
            )
        })}
        <Link href="add-patient" className={styles.card}>
            <div className="flex flex-col justify-center w-full h-full py-3">
                <MdPets size={64} className="m-auto text-2xl"/>
                <h6 className="text-center text-xl">Add new patient</h6>
            </div>
        </Link>
    </div>
  )
}