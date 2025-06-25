import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo_light.png'
import '../css/Navbar.css';

function Navbar({setIsLoggedIn}) {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false)
    navigate('/');
  };

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
      <FontAwesomeIcon className="logout-icon" icon={faPowerOff} title="Logout" onClick={logOut}/>
    </nav>
  )
}

export default Navbar