import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import MyGigDetails from "../components/MyGigDetails.component";

const MyGigDetail = () => {
  console.log("Profile component invoked");

  const [Gig, setGig] = useState(null);
  const { role, id, title } = useParams();
  console.log(`Role: ${role}, ID: ${id}`);

  useEffect(() => {
    if (!role || !id) {
      console.log("Role or ID is missing");
      return;
    }

    console.log(`Fetching gig data for role: ${role} and id: ${id} and title: ${title}`);

    const fetchGigs = async () => {
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
        console.log("Gig data fetched successfully:", json);
        setGig(json);
      } else {
        console.log("Error fetching Gig data");
      }
    };

    fetchGigs();
  }, [role, id, title]);

  

  return (
    <div className="profile">
      <div className="profile-container">
        {Gig ? (
          <MyGigDetails key={Gig.title} gig={Gig}  />
        ) : (
          <p>Loading gig data...</p>
        )}
      </div>
    </div>
  );
};

export default MyGigDetail;
