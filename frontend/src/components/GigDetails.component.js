import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// The YourComponent with navigation logic
const Navigate = ({ id, title, position, role }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/search/${role}/${id}/gig/${title}/apply/${position}`);
  };

  return (
    <button onClick={handleNavigation} className="details-btn">
      Apply
    </button>
  );
};

const GigDetails = ({ gig }) => {
  const { role, id } = useParams();
  const [userRole, setUserRole] = useState(""); // Role can be "employee" or "employer"
  const [isFavorite, setIsFavorite] = useState(false); // Tracks if the gig is saved

  useEffect(() => {
    // Extract the role from the URL path
    const path = window.location.pathname;
    const pathParts = path.split("/");
    if (pathParts.includes("Employee")) {
      setUserRole("employee");
    } else if (pathParts.includes("Employer")) {
      setUserRole("employer");
    }

    // Fetch the saved gig status for the user
    const fetchSavedGigStatus = async () => {
      try {
        const response = await fetch(`http://localhost:4000/set-favourite/${gig._id}/${id}`);
        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.status); // Set the isFavorite state based on the response
        } else {
          setIsFavorite(false); // Default to false if the gig is not found
        }
      } catch (error) {
        console.error("Error fetching saved gig status:", error);
        setIsFavorite(false); // Default to false in case of an error
      }
    };

    fetchSavedGigStatus();
  }, [gig._id, id]); // Runs when gig._id or id changes

  const toggleFavorite = async () => {
    const currentFavoriteStatus = !isFavorite; // Toggle favorite status
    setIsFavorite(currentFavoriteStatus); // Update the state
    
    try {
      const response = await fetch(
        `http://localhost:4000/set-favourite/${gig._id}/${id}/${currentFavoriteStatus}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  return (
    <div className="gig-details" style={styles.card}>
      {/* Favorite Button */}
      <button style={styles.favoriteButton} onClick={toggleFavorite}>
        {isFavorite ? (
          <FontAwesomeIcon icon={solidHeart} size="lg" />
        ) : (
          <FontAwesomeIcon icon={regularHeart} size="lg" />
        )}
      </button>

      <h2 style={styles.heading}>Gig Details</h2>

      {/* Gig Title */}
      <div style={styles.detailRow}>
        <h4>
          <strong>Title:</strong> {gig.title || "No Title Provided"}
        </h4>
      </div>

      {/* Gig Description */}
      <div style={styles.detailRow}>
        <p>
          <strong>Description:</strong> {gig.description || "No Description Provided"}
        </p>
      </div>

      {/* Available Positions and Payment */}
      <div style={styles.detailRow}>
        <p><strong>Available Positions:</strong></p>
        {gig.employeeRoles && gig.employeeRoles.length > 0 ? (
          gig.employeeRoles.map((erole, index) => (
            <div key={index} style={styles.positionItem}>
              <span><strong>Position:</strong> {erole.position}</span>
              <span style={styles.payment}>
                <strong>Payment:</strong> {erole.payment}
              </span>
              {userRole === "employee" && (
                <Navigate id={id} title={gig.title} position={erole.position} role={role} />
              )}
            </div>
          ))
        ) : (
          <p>No Positions Available</p>
        )}
      </div>

      {/* Gig Duration */}
      <div style={styles.detailRow}>
        <p><strong>Duration:</strong> {gig.duration || "No Duration Provided"}</p>
      </div>

      {/* Gig Active Status */}
      <div style={styles.detailRow}>
        <p>
          <strong>Status:</strong> {gig.isActive ? "Active" : "Inactive"}
        </p>
      </div>

      {/* Creation Date */}
      <div style={styles.detailRow}>
        <p><strong>Created At:</strong> {new Date(gig.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    position: "relative",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "10px",
    width: "50%",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  detailRow: {
    margin: "15px 0",
    fontSize: "1rem",
  },
  positionItem: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f1f1f1",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  payment: {
    marginLeft: "20px",
    color: "#28a745",
    fontWeight: "bold",
  },
  applyButton: {
    marginLeft: "20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  favoriteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#f1f1f1",
    border: "none",
    padding: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s, transform 0.3s",
  },
  favoriteButtonSaved: {
    backgroundColor: "#ffcc00",
  },
  applicantItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f0f8ff",
    marginBottom: "10px",
  },
  status: {
    fontWeight: "bold",
    color: "#007BFF",
  },
};

export default GigDetails;
