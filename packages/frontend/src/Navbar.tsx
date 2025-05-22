import { Link } from "react-router";
import "./styles/index.css";

function Navbar() {
  return (
    <div className="bottom-navbar">
      <Link to="/">Home</Link>
      <Link to="/discover">Discover</Link>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
    </div>
  )
}

export default Navbar;