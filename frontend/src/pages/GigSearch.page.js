import { useEffect, useState } from "react";

import '../css/EmployeeSearch.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// The YourComponent with navigation logic
const YourComponent = ({ role, id, gig }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/search/${role}/${id}/details/gig/${gig.title}`);
  };

  return (
    <button onClick={handleNavigation} className="details-btn">
      View Details
    </button>
  );
};

const GigSearch = () => {
    const [gigs, setGigs] = useState([]);
    const { role, id } = useParams();

    useEffect(() => {
        const fetchGigs = async () => {
            console.log("fetchGigs invoked");
            try {
                const response = await fetch(`http://localhost:4000/search/gig`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                const json = await response.json();
                console.log(json);
    
                if (response.ok) {
                    console.log("Gig data fetched successfully:", json);
                    setGigs(json); // Ensure this matches the structure, e.g., json.Gigs if necessary
                } else {
                    console.log("Error fetching Gig data:", json);
                    setGigs([]); // Set to an empty array or appropriate error handling state
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setGigs([]); // Handle errors more gracefully
            }
        };
    
        fetchGigs();
    }, []);
    console.log('-----',gigs)


    const [searchQuery, setSearchQuery] = useState('');

    

    const filteredGigs = searchQuery.trim()
    ? gigs.filter(gig => {
        const query = searchQuery.toLowerCase().trim();

        const titleMatch = gig.title? gig.title.toLowerCase().includes(query) : false;
        const durationMatch = gig.duration? gig.duration.toLowerCase().includes(query) : false;
        const employeeRolesMatch = gig.employeeRoles && gig.employeeRoles.some(employeeRole =>
            employeeRole.position.toLowerCase().includes(query)
        );

        return titleMatch || durationMatch || employeeRolesMatch;
    })
    : gigs;


    return (
        <div className="employee-search-container">
            <h1>Search gigs</h1>
            <input
                type="text"
                placeholder="Search by title, duration, or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value) }
                   
                className="search-input"
            />
            <div className="employee-card-container">
                {filteredGigs.length > 0 ? (
                    filteredGigs.map((gig) => (
                        <div key={gig.title} className="employee-card">
                            <div className="employee-info">
                                <h2>{gig.title    || "No Title Provided"}</h2>
                                <span className="employee-role">{gig.duration || "No Duration Provided"}</span>
                                <div className="employee-skills">
                                    {gig.employeeRoles?.map((employeeRole, index) => (
                                        <span key={index} className="skill-tag">{employeeRole.position}</span>
                                    ))}
                                </div>
                                
                            </div>
                            <YourComponent role={role} id={id} gig={gig} />
                        </div>
                    ))
                ) : (
                    <p>No gigs found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default GigSearch;