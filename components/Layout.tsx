import React from "react"
import NavBar from "./NavBar/NavBar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <NavBar />
        <main className="min-h-screen my-16">{children}</main>
    </>
  )
}
