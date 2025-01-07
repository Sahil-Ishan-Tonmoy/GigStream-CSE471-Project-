import React, { useState, useEffect } from "react";
import moment from "moment";
import StarRating from "react-star-rating-component";
import { useParams } from "react-router-dom";

const EmployeeDetails = ({ employee, apiEndpoint }) => {
  const { role, id, employeeId } = useParams();
  const [userReview, setUserReview] = useState({
    rating: 0,
    text: "",
  });

  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRatingChange = (nextValue) => {
    setUserReview({ ...userReview, rating: nextValue });
  };

  const handleReviewChange = (e) => {
    setUserReview({ ...userReview, text: e.target.value });
  };

  const handleSaveReview = async () => {
    const newReview = {
      userId: employee.userId,
      name: `${employee.firstName} ${employee.lastName}`,
      rating: userReview.rating,
      text: userReview.text,
    };

    try {
      const response = await fetch(`/create-review/${id}/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const savedReview = await response.json();
        setReviewList((prev) => [...prev.filter(r => r.userId !== employee.userId), savedReview]);
        setUserReview({ rating: 0, text: "" }); // Reset the user's review input
      } else {
        console.error("Failed to save review");
      }
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/reviews/${id}/${employeeId}`);
        if (response.ok) {
          const { reviews } = await response.json();
          setReviewList(reviews);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviews();
  }, [id, employeeId]);

  const averageRating =
    reviewList.length > 0
      ? (
          reviewList.reduce((sum, review) => sum + review.rating, 0) /
          reviewList.length
        ).toFixed(1)
      : 0;

  return (
    <div className="user-details" style={styles.card}>
      <h2 style={styles.heading}>Employee Profile</h2>

      {/* Profile Picture */}
      <div style={styles.profilePictureContainer}>
        {employee.profilePicture ? (
          <img src={employee.profilePicture} alt="Profile" style={styles.profilePicture} />
        ) : (
          <div style={styles.placeholder}>No Profile Picture</div>
        )}
      </div>

      {/* Employee Information */}
      <div style={styles.detailRow}>
        <h4>User ID: {employee.userId}</h4>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Name: </strong> {employee.firstName} {employee.lastName || ""}</p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Date of Birth: </strong> {moment(employee.birthDate).format("YYYY-MM-DD")}</p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Email: </strong> {employee.email || "Not Provided"}</p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Phone: </strong> {employee.phone || "Not Provided"}</p>
      </div>

      {/* Skills Section */}
      <div style={styles.detailRow}>
        <p><strong>Skills: </strong></p>
        {employee.skills?.length > 0 ? (
          employee.skills.map((skill, index) => (
            <div key={index} style={styles.skillItem}>
              <span>{skill}</span>
            </div>
          ))
        ) : (
          <p>No skills provided</p>
        )}
      </div>

      {/* Rating and Reviews Section */}
      <div style={styles.ratingSection}>
        <h3>Ratings and Reviews</h3>

        {/* Cumulative Rating */}
        <div style={styles.cumulativeRating}>
          <p><strong>Average Rating:</strong> {averageRating} / 5</p>
          <StarRating
            name="averageRating"
            starCount={5}
            value={parseFloat(averageRating)}
            editing={false}
          />
        </div>

        {/* Reviews */}
        <div style={styles.reviewList}>
          <h4>Reviews:</h4>
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviewList.length > 0 ? (
            reviewList.map((review, index) => (
              <div key={index} style={styles.reviewItem}>
                <p><strong>{review.name || "Anonymous"}:</strong></p>
                <StarRating
                  name={`rating-${index}`}
                  starCount={5}
                  value={review.rating}
                  editing={false}
                />
                <p>{review.text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* User's Review */}
        <div style={styles.userReview}>
          <h4>Your Review:</h4>
          <StarRating
            name="userRating"
            starCount={5}
            value={userReview.rating}
            onStarClick={handleRatingChange}
          />
          <textarea
            style={styles.textarea}
            value={userReview.text}
            onChange={handleReviewChange}
            placeholder="Write your review here"
          ></textarea>
          <button style={styles.saveButton} onClick={handleSaveReview}>Save Review</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
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
  profilePictureContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  profilePicture: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  placeholder: {
    width: "150px",
    height: "150px",
    lineHeight: "150px",
    border: "1px dashed #ccc",
    borderRadius: "50%",
    textAlign: "center",
    color: "#aaa",
  },
  pictureControls: {
    marginTop: "10px",
  },
  fileInput: {
    marginBottom: "10px",
  },
  removePictureButton: {
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
    fontSize: "1rem",
  },
  input: {
    width: "60%",
    padding: "5px",
    fontSize: "1rem",
  },
  addSkillButton: {
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  removeSkillButton: {
    padding: "5px",
    marginLeft: "10px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  button: {
    marginRight: "10px",
    padding: "8px 15px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  saveButton: {
    padding: "8px 15px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  ratingSection: {
    marginTop: "20px",
    padding: "10px 0",
    borderTop: "1px solid #ccc",
  },
  cumulativeRating: {
    marginBottom: "20px",
  },
  reviewList: {
    marginBottom: "20px",
  },
  reviewItem: {
    marginBottom: "15px",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
  },
  userReview: {
    marginTop: "20px",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  saveButton: {
    marginTop: "10px",
    padding: "8px 15px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default EmployeeDetails;
