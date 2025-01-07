import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/Gig.css';

// The YourComponent with navigation logic
const YourComponent = ({ role, id, gig }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/gig-posted/${role}/${id}/details/gig/${gig.title}`);
  };

  return (
    <button onClick={handleNavigation} className="details-btn">
      View Details
    </button>
  );
};

const GigPosted = () => {
  const [gigs, setGigs] = useState([]);
  const { role, id } = useParams();
  const navigate = useNavigate();

  const handlePostNewGig = () => {
    navigate(`/gig-post/${role}/${id}`);
  };

  useEffect(() => {
    const fetchGigs = async () => {
      console.log("fetchGigs invoked");
      try {
        const response = await fetch(`http://localhost:3000/gig?id=${id}`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        });

        const json = await response.json();
        console.log(json);

        if (response.ok) {
          console.log("Gig data fetched successfully:", json);
          setGigs(json);
        } else {
          console.log("Error fetching Gig data:", json);
          setGigs([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setGigs([]);
      }
    };

    fetchGigs();
  }, [id]);
  console.log('-----', gigs);

  return (
    <div className="employee-search-container">
      <div className="header">
        <h1>Posted gigs</h1>
        <button onClick={handlePostNewGig} className="post-new-gig-btn">
          Post New Gig
        </button>
      </div>
      
      <div className="employee-card-container">
        {gigs.length > 0 ? (
          gigs.map((gig) => (
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
          <p>No gigs posted yet</p>
        )}
      </div>
    </div>
  );
};

export default GigPosted;

