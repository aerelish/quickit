import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Logo from '../assets/logo_light.png'
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/">
        <img src={Logo} alt="ejrLogo"/>
        <h1>Quickit</h1>
      </Link>
      <div className="nav-links">
        <Link to="/">TODO</Link>
        <Link to="/water">WATER</Link>
      </div>
      <FontAwesomeIcon className="user-icon" icon={faUser}/>
    </nav>
  )
}

export default Navbar