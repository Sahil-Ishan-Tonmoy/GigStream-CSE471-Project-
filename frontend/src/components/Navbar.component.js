import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser, faSignOutAlt, faHistory,faHeart } from "@fortawesome/free-solid-svg-icons";
import "../css/Navbar.css"
import logo from "../static/GigStream Logo.png"


const Navbar = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const role = pathSegments[2]; // Extract role from the URL
    const id = pathSegments[3]; // Extract ID from the URL

    const handleLogout = () => {
        console.log("Logged out");
        window.location.href = '/login'; // Redirect to login page
    };

    const renderNavbarContent = () => {
        const common =() =>{
            let history; 
            if (role === 'Employee') {
                history = "gig-history";
            } else {
                history = "gig-posted";
            }
            return(<>
                    <Link to={`/search/${role}/${id}`}>
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                    </Link>
                    <Link to={`/notifications/${role}/${id}`}>
                        <FontAwesomeIcon icon={faBell} size="lg" />
                    </Link>
                    <Link to={`/saved-gigs/${role}/${id}`}><FontAwesomeIcon icon={faHeart} size="lg" /></Link>
                    <Link to={`/${history}/${role}/${id}`}><FontAwesomeIcon icon={faHistory} size="lg" /></Link>
                    <Link to={`/profile/${role}/${id}`}><FontAwesomeIcon icon={faUser} size="lg" /></Link>
                    <button onClick={handleLogout} className="logout-button"><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></button>
                </>)
        }
        if (role === 'Employee') {
            return common()
            ;
        } else if (role === 'Employer') {
            return (
                
                <>
        
                    {common()}
                    
                    
                </>
            );
        } else {
            return null; // For unauthenticated users or undefined roles
        }
    };

    return (
        <header className="navbar-container">
            <div className="navbar">
                <Link to="/login" className="logo">
                <img src={logo} alt="GigStream Logo" style={{ height: "50px" }} />
                </Link>
                <nav>
                    {renderNavbarContent()}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
