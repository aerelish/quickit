// packages
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

// components
import SectionWrapper from "./SectionWrapper";

// context
import { useAuthContext } from "../context/AuthContext";

// others
import Logo from '../assets/logo_light.png'

function Navbar() {

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthContext();

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false)
    navigate('/');
  };

  return (
    <nav className="top-1 z-40">
      <SectionWrapper>
        <div className="flex justify-between items-center">
          <Link className="flex items-center gap-2" to="/">
            <img className="w-6 h-6" src={Logo} alt="ejrLogo"/>
            <h1 className="text-2xl font-semibold">Quickit</h1>
          </Link>
          {/* <div className="">
            <Link to="/">TODO</Link>
            <Link to="/water">WATER</Link>
          </div> */}
          <FontAwesomeIcon className="text-2xl pt-1 h-full cursor-pointer transition-all duration-200 hover:text-red-500" icon={faPowerOff} title="Logout" onClick={logOut}/>
        </div>
      </SectionWrapper>
    </nav>
  )
}

export default Navbar