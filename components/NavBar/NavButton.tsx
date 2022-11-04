import Link from "next/link"

interface NavBtnProps {
    name: string,
    active?: boolean,
    route: string,
}

export default function NavButton({ name, active = false,  route}: NavBtnProps) {
  return (
    <Link href={route} className="nav-button">
        {name}
    </Link>
  )
}
