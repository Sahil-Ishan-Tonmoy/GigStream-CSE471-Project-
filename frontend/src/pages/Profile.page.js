import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import UserDetails from "../components/UserDetails.component";

const Profile = () => {
  console.log("Profile component invoked");

  const [Users, setUsers] = useState(null);
  const { role, id } = useParams();
  console.log(`Role: ${role}, ID: ${id}`);

  useEffect(() => {
    if (!role || !id) {
      console.log("Role or ID is missing");
      return;
    }

    console.log(`Fetching profile data for role: ${role} and id: ${id}`);

    const fetchUsers = async () => {
      console.log("fetchUsers invoked");
      const response = await fetch(`http://localhost:4000/profile/${role}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        console.log("Profile data fetched successfully:", json);
        setUsers(json);
      } else {
        console.log("Error fetching profile data");
      }
    };

    fetchUsers();
  }, [role, id]);

  // Function to update user data via PATCH request
  const updateUser = async (updatedData) => {
    console.log("Updating user data:", updatedData);
    const response = await fetch(`http://localhost:4000/profile/${role}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      console.log("User updated successfully:", updatedUser);
      setUsers(updatedUser); // Update local state with new data
    } else {
      console.log("Error updating user data");
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        {Users ? (
          <UserDetails key={Users._id} User={Users} updateUser={updateUser} />
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
