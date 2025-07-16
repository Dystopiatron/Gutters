import "./NavBar.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { logout } from "../auth/logout"

export const NavBar = () => {
  const navigate = useNavigate()

  const handleLogout = (event) => {
    event.preventDefault()
    logout(navigate)
  }

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/comics">Comics</Link>
      </li>
      <li className="navbar-item">
        <Link to="/user">Users</Link>
      </li>
      <li className="navbar-item">
        <Link to="/clubs">Clubs</Link>
      </li>
      <li className="navbar-item">
        <Link to="/profile">Profile</Link>
      </li>
      <li className="navbar-item">
        <a href="#" onClick={handleLogout}>
          Log Out
        </a>
      </li>
    </ul>
  )
}