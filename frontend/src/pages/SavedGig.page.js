import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/Gig.css';

// The YourComponent with navigation logic
const YourComponent = ({ role, id, gig }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/saved-gigs/${role}/${id}/details/gig/${gig.title}`);
  };

  return (
    <button onClick={handleNavigation} className="details-btn">
      View Details
    </button>
  );
};

const SavedGig = () => {
    const [savedGigs, setSavedGigs] = useState([]);
    const { role, id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchSavedGigs = async () => {
        console.log("fetchSavedGigs invoked");
        try {
          // Fetch the gigs saved by the user (only saved gigs)
          const response = await fetch(`http://localhost:4000/saved-gigs/${id}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
          });
  
          const json = await response.json();
          console.log(json);
  
          if (response.ok) {
            console.log("Saved gigs fetched successfully:", json);
            setSavedGigs(json); // Set only the saved gigs
          } else {
            console.log("Error fetching saved gigs data:", json);
            setSavedGigs([]); // Empty array if no saved gigs
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setSavedGigs([]); // Empty array on error
        }
      };
  
      fetchSavedGigs();
    }, [id]);
  
    console.log('-----', savedGigs);
  
    return (
      <div className="employee-search-container">
        <div className="header">
          <h1>Saved Gigs</h1>
        </div>
        
        <div className="employee-card-container">
          {savedGigs.length > 0 ? (
            savedGigs.map((gig) => (
              <div key={gig.title} className="employee-card">
                <div className="employee-info">
                  <h2>{gig.title || "No Title Provided"}</h2>
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
            <p>No saved gigs</p>
          )}
        </div>
      </div>
    );
  };
export default SavedGig;
