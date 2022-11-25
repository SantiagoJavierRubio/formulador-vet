import React from "react"
import { User } from "../utils/types/User"
import NavBar from "./NavBar/NavBar"
import { sessionWrapper } from '../utils/sessionWrapper'

interface LayoutProps {
  user: User | null;
  children: JSX.Element;
}

export default function Layout({ user, children }: LayoutProps) {
  return (
    <>
        <NavBar username={user?.displayName || user?.email}/>
        <main className="min-h-screen my-16">{children}</main>
    </>
  )
}
