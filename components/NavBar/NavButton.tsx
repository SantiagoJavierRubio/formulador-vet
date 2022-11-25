import Link from "next/link"

interface NavBtnProps {
    name: string,
    active?: boolean,
    route: string,
    children?: JSX.Element
}

export default function NavButton({ name, active = false,  route, children}: NavBtnProps) {
  return (
    <Link href={route} className="nav-button">
        {name}
        {children}
    </Link>
  )
}
