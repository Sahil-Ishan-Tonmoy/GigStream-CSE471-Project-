import { useState } from "react";
import moment from "moment";

const UserDetails = ({ User, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ ...User, skills: User.skills || [""] });
  const [profilePicture, setProfilePicture] = useState(User.profilePicture || "");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle skill change
  const handleSkillChange = (index, value) => {
    const newSkills = [...userData.skills];
    newSkills[index] = value;
    setUserData({ ...userData, skills: newSkills });
  };

  // Add a new skill field
  const addSkill = () => {
    setUserData({ ...userData, skills: [...userData.skills, ""] });
  };

  // Remove a skill field
  const removeSkill = (index) => {
    const newSkills = userData.skills.filter((_, i) => i !== index);
    setUserData({ ...userData, skills: newSkills });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save updated data
  const handleSave = () => {
    updateUser({ ...userData, profilePicture });
    setIsEditing(false);
  };

  // Handle profile picture upload
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle profile picture removal
  const removePicture = () => {
    setProfilePicture("");
  };

  return (
    <div className="user-details" style={styles.card}>
      <h2 style={styles.heading}>User Profile</h2>

      {/* Profile Picture */}
      <div style={styles.profilePictureContainer}>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" style={styles.profilePicture} />
        ) : (
          <div style={styles.placeholder}>No Profile Picture</div>
        )}
        {isEditing && (
          <div style={styles.pictureControls}>
            <input type="file" onChange={handlePictureUpload} style={styles.fileInput} />
            <button onClick={removePicture} style={styles.removePictureButton}>
              Remove Picture
            </button>
          </div>
        )}
      </div>

      {/* User Information */}
      <div style={styles.detailRow}>
        <h4>User ID: {userData.userId}</h4>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Name: </strong></p>
        {isEditing ? (
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{userData.firstName} {userData.lastName}</span>
        )}
      </div>

      <div style={styles.detailRow}>
        <p><strong>Date of Birth: </strong></p>
        {isEditing ? (
          <input
            type="date"
            name="birthDate"
            value={moment(userData.birthDate).format("YYYY-MM-DD")}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{moment(userData.birthDate).format("YYYY-MM-DD")}</span>
        )}
      </div>

      <div style={styles.detailRow}>
        <p><strong>Email: </strong></p>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{userData.email}</span>
        )}
      </div>

      <div style={styles.detailRow}>
        <p><strong>Phone: </strong></p>
        {isEditing ? (
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{userData.phone}</span>
        )}
      </div>

      {/* Skills Section */}
      <div style={styles.detailRow}>
        <p><strong>Skills: </strong></p>
      </div>
      {userData.skills.map((skill, index) => (
        <div key={index} style={styles.detailRow}>
          {isEditing ? (
            <>
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                style={styles.input}
              />
              <button
                onClick={() => removeSkill(index)}
                style={styles.removeSkillButton}
              >
                Remove
              </button>
            </>
          ) : (
            <span>{skill}</span>
          )}
        </div>
      ))}
      {isEditing && (
        <button onClick={addSkill} style={styles.addSkillButton}>
          Add Skill
        </button>
      )}

      {/* Edit and Save Buttons */}
      <div style={styles.buttonContainer}>
        <button onClick={toggleEdit} style={styles.button}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button onClick={handleSave} style={styles.saveButton}>
            Save
          </button>
        )}
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
};

export default UserDetails;
