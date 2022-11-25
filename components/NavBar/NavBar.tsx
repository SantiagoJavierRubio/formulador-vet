import NavButton from "./NavButton"
import { BiLogOutCircle, BiLogInCircle } from "react-icons/bi";

interface NavBarProps {
  username?: string
}

export default function NavBar({ username }: NavBarProps) {
  return (
    <div className="navbar">
      <NavButton name="Home" route="/" />
      <NavButton name="About" route="/about" />
      {username ?
        <form action="/api/logout">
          <button type="submit">
            {username} <BiLogOutCircle />
          </button>
        </form> : 
      <NavButton name="Login" route="/login">
        <BiLogInCircle />  
      </NavButton>}
    </div>
  )
}
