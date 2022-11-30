import React from 'react'
import type { User } from '../../utils/types/User'
import Link from 'next/link'
import Image from 'next/image'
import VetImage from "../../public/landing_img1.jpg"
import styles from "../../styles/LandingPage.module.css";
import { FiChevronRight } from "react-icons/fi";

export default function Landing({ user }: { user?: User }) {
  return (
    <main className={styles.container}>
        <nav className={styles.menu}>
            <div className={styles.logo}>LOGO</div>
            {user ? <Link className={styles.dbLink} href="/dashboard">My patients <FiChevronRight size={20}/></Link>
            : <Link className={styles.dbLink} href="/login">Sign in <FiChevronRight size={20}/></Link>}
        </nav>
        <article className={styles.info}>
            <h1 className={styles.title}>VetDiet</h1>
            <h2 className={styles.subtitle}>A veterinarian&apos;s tool to create awesome & balanced diets</h2>
        </article>
        <div className={styles.imgContainer}>
            <Image className={styles.image} src={VetImage} alt="Vet feeding dog" priority placeholder='blur' />
        </div>
    </main>
  )
}
