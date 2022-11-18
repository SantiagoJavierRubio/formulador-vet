import NavButton from "./NavButton"

export default function NavBar() {
  return (
    <div className="navbar">
      <NavButton name="Home" route="/" />
      <NavButton name="About" route="/about" />
      <form action="/api/logout">
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}
