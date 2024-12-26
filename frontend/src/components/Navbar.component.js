import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/Navbar.css"

const Navbar = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const role = pathSegments[2]; // Extract role from the URL

    const handleLogout = () => {
        console.log("Logged out");
        window.location.href = '/login'; // Redirect to login page
    };

    const renderNavbarContent = () => {
        if (role === 'Employee') {
            return (
                <>
                    <Link to={`/search-employee/Employer/${pathSegments[3]}`}>
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                    </Link>
                    <Link to={`/notifications/Employee/${pathSegments[3]}`}>Notifications</Link>
                    <Link to={`/profile/Employee/${pathSegments[3]}`}>Profile</Link>
                </>
            );
        } else if (role === 'Employer') {
            return (
                <>
                    <Link to={`/search-employee/Employer/${pathSegments[3]}`}>
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                    </Link>
                    <Link to={`/post-gig/Employer/${pathSegments[3]}`}>Post Gig</Link>
                    <Link to={`/notifications/Employer/${pathSegments[3]}`}>Notifications</Link>
                    <Link to={`/profile/Employer/${pathSegments[3]}`}>Profile</Link>
                </>
            );
        } else {
            return null; // For unauthenticated users or undefined roles
        }
    };

    return (
        <header className="navbar-container">
            <div className="navbar">
                <Link to="/login" className="navbar-logo">
                    <h1>GigStream</h1>
                </Link>
                <nav>
                    {renderNavbarContent()}
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
