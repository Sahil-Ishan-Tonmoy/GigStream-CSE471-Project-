import { useEffect, useState } from "react";

import '../css/EmployeeSearch.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// The YourComponent with navigation logic
const YourComponent = ({ role, id, employee }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/search/${role}/${id}/details/employee/${employee.userId}`);
  };

  return (
    <button onClick={handleNavigation} className="details-btn">
      View Details
    </button>
  );
};

const EmployeeSearch = () => {
    const [employees, setEmployees] = useState([]);
    const { role, id } = useParams();

    useEffect(() => {
        const fetchEmployees = async () => {
            console.log("fetchEmployees invoked");
            try {
                const response = await fetch(`http://localhost:4000/search/employee`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                const json = await response.json();
                console.log(json);
    
                if (response.ok) {
                    console.log("Profile data fetched successfully:", json);
                    setEmployees(json); // Ensure this matches the structure, e.g., json.employees if necessary
                } else {
                    console.log("Error fetching profile data:", json);
                    setEmployees([]); // Set to an empty array or appropriate error handling state
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setEmployees([]); // Handle errors more gracefully
            }
        };
    
        fetchEmployees();
    }, []);
    console.log('-----',employees)


    const [searchQuery, setSearchQuery] = useState('');

    

    const filteredEmployees = searchQuery.trim() ? employees.filter(employee => {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = employee.firstName ? employee.firstName.toLowerCase().includes(query) : false;
        const skillsMatch = employee.skills && employee.skills.some(skill => skill.toLowerCase().includes(query));
        const positionsMatch = employee.positions && employee.positions.some(position => position.toLowerCase().includes(query));
        return nameMatch || skillsMatch || positionsMatch;
    }) : employees;

    return (
        <div className="employee-search-container">
            <h1>Search Employees</h1>
            <input
                type="text"
                placeholder="Search by name, skills, or positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <div className="employee-card-container">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                        <div key={employee.userId} className="employee-card">
                            <div className="employee-info">
                                <h2>{employee.firstName.concat(' ').concat(employee.lastName)    || "No Name Provided"}</h2>
                                <span className="employee-role">{employee.role || "No Role Provided"}</span>
                                <div className="employee-skills">
                                    {employee.skills?.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                                <div className="employee-positions">
                                    {employee.positions?.map((position, index) => (
                                        <span key={index} className="position-tag">{position}</span>
                                    ))}
                                </div>
                            </div>
                            <YourComponent role={role} id={id} employee={employee} />
                        </div>
                    ))
                ) : (
                    <p>No employees found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default EmployeeSearch;