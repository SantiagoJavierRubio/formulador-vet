import { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

import { sessionWrapper } from "../../utils/sessionWrapper";
import { getPatients, deletePatient } from "../../utils/api/requests";
import Cat from "../../assets/Cat.svg";
import Dog from "../../assets/Dog.svg";
import { FaWeightHanging, FaRegCalendarAlt, FaWeight } from "react-icons/fa"
import { MdPets, MdOutlineEditNote, MdEdit } from "react-icons/md";
import type { Patient } from "../../utils/types/Patient";
import type { User } from "../../utils/types/User";

import styles from "../../styles/Patient.module.css";

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
    const speciesImg = (function(){
        if(species === "dog") return Dog;
        if(species === "cat") return Cat;
        return <MdPets size={20} />;
    })()
    const age = (function(){
        const dob = new Date(DoB);
        const now = new Date();
        let age = now.getFullYear() - dob.getFullYear();
        if (now.getMonth() > dob.getMonth() && now.getDate() > dob.getDate()) age--;
        return age;
    })()
    const birthDate = new Date(DoB).toLocaleDateString()

  return (
    <Layout user={user} title={name}>
        <div className={styles.title}>
            <h1 className={styles.name}>{name}</h1>
            <Link href={`/patients/edit/${id}`} className={styles.editBtn}><MdEdit size={20} /></Link>
        </div>
        <div className={styles.species}>
            <Image src={speciesImg} alt="species" fill={true} priority/>
        </div>
        <p className={styles.infoElement}>
            <FaRegCalendarAlt size={20} />
            {age} years old
            {' '}
            <span className="text-sm tracking-widest">
                {`(${birthDate})`}
            </span>
        </p>
        <p className={styles.infoElement}>
            <FaWeightHanging size={20} /> {weight} kg
        </p>
        {idealWeight && <p className={styles.infoElement}>
            <FaWeight size={20} /> {idealWeight} kg
        </p>}
        <Link href={`/formulate/${id}`} className={styles.formulateBtn}>Formulate <MdOutlineEditNote size={28} /></Link>
        <div className={styles.deletePatient}>
            <label htmlFor="patient-name">Enter patient name to delete</label>
            <input type="text" id="patient-name" onChange={handleName} value={inputName} />
            <button disabled={!(inputName.toLowerCase() === name.toLowerCase())} onClick={handleDelete}>
                Delete this patient
            </button>
        </div>
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