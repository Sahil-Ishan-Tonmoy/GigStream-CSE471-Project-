import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MyGigDetails = ({ gig }) => {
  const { role, id, title } = useParams();
  const navigate = useNavigate();
  
  const [applicants, setApplicants] = useState([]); // List of applicants

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(`/gig/applicants/${title}`); // Using path parameter
        if (response.ok) {
          const data = await response.json();
          setApplicants(data);
        } else {
          console.error("Failed to fetch applicants");
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    // Fetch the list of applicants
    fetchApplicants();
  }, [title]);

  // Function to handle navigation to the details page
  const handleDetailsClick = (role, id, applicationID) => {
    navigate(`/gig-posted/${role}/${id}/details/gig/${gig.title}/application/${applicationID}`);
  };

  return (
    <div className="gig-details" style={styles.card}>
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

      {/* Applicants Tab */}
      <div className="applicants-tab" style={styles.applicantsTab}>
        <h3>Applicants</h3>
        {applicants.length > 0 ? (
          applicants.map((applicant, index) => (
            <div key={index} style={styles.applicantItem}>
              <p><strong>User ID:</strong> {applicant.employeeUserId}</p>
              <p><strong>Position Applied:</strong> {applicant.roleApplied}</p>
              <p><strong>Status:</strong> {applicant.status}</p>

              {/* Details Button */}
              <button
                style={styles.detailsButton}
                onClick={() => handleDetailsClick(role, id, applicant._id)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No applicants yet.</p>
        )}
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
  applicantsTab: {
    marginTop: "30px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f7f7f7",
  },
  applicantItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  detailsButton: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default MyGigDetails;
