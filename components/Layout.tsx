import { ReactNode } from "react"
import NavBar from "./NavBar/NavBar"
import type { User } from "../utils/types/User"

interface LayoutProps {
  user: User | null;
  children: ReactNode;
}

export default function Layout({ user, children }: LayoutProps) {
  return (
    <>
        <NavBar username={user?.name || user?.email}/>
        <main className="min-h-screen my-16">{children}</main>
    </>
  )
}
