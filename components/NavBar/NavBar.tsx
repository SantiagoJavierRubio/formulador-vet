import NavButton from "./NavButton"

export default function NavBar() {
  return (
    <div className="navbar">
      <NavButton name="Home" route="/" />
      <NavButton name="Login" route="/login" />
      <NavButton name="About" route="/about" />
    </div>
  )
}
