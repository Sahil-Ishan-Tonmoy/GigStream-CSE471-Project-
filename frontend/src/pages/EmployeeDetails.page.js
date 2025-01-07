import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import EmployeeDetails from "../components/EmployeeDetails.component";

const EmployeeDetail = () => {
  console.log("Profile component invoked");

  const [Employee, setEmployee] = useState(null);
  const { role, id, employeeId } = useParams();
  console.log(`Role: ${role}, ID: ${id}`);

  useEffect(() => {
    if (!role || !id) {
      console.log("Role or ID is missing");
      return;
    }

    console.log(`Fetching profile data for role: ${role} and id: ${id} and employeeId: ${employeeId}`);

    const fetchUsers = async () => {
      console.log("fetchUsers invoked");
      const response = await fetch(`http://localhost:4000/search/${role}/${id}/details/employee/${employeeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        console.log("Profile data fetched successfully:", json);
        setEmployee(json);
      } else {
        console.log("Error fetching profile data");
      }
    };

    fetchUsers();
  }, [role, id, employeeId]);

  

  return (
    <div className="profile">
      <div className="profile-container">
        {Employee ? (
          <EmployeeDetails key={Employee._id} employee={Employee}  />
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;
