import { ReactNode } from "react"
import Head from "next/head";
import NavBar from "./NavBar/NavBar"
import type { User } from "../utils/types/User"

interface LayoutProps {
  user: User | null;
  title?: string;
  children: ReactNode;
}

export default function Layout({ user, title, children }: LayoutProps) {
  return (
    <>
        <Head>
        <title>{title || 'VetDiet'}</title>
        <meta name="description" content="Formulate your patient's diets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <NavBar username={user?.name || user?.email}/>
        <main className="min-h-screen my-16">{children}</main>
    </>
  )
}
