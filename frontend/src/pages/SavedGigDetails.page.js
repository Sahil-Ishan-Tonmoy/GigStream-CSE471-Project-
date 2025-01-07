import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import SavedGigDetails from "../components/SavedGigDetails.component";

const SavedGigDetail = () => {
  console.log("Profile component invoked");

  const [Gig, setGig] = useState(null);
  const { role, id, title } = useParams();
  console.log(`Role: ${role}, ID: ${id}`);

  useEffect(() => {
    if (!role || !id) {
      console.log("Role or ID is missing");
      return;
    }

    console.log(`Fetching profile data for role: ${role} and id: ${id} and title: ${title}`);

    const fetchUsers = async () => {
      console.log("fetchUsers invoked");
      const response = await fetch(`http://localhost:4000/search/${role}/${id}/details/gig/${title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        console.log("Profile data fetched successfully:", json);
        setGig(json);
      } else {
        console.log("Error fetching profile data");
      }
    };

    fetchUsers();
  }, [role, id, title]);

  

  return (
    <div className="profile">
      <div className="profile-container">
        {Gig ? (
          <SavedGigDetails key={Gig.title} gig={Gig}  />
        ) : (
          <p>Loading gig data...</p>
        )}
      </div>
    </div>
  );
};

export default SavedGigDetail;
