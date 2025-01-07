import { useState } from "react";
import GigSearch from "./GigSearch.page";
import EmployeeSearch from "./EmployeeSearch.page";
import "../css/Search.css";


const CombinedSearchPage = () => {
  const [isGigView, setIsGigView] = useState(true);

  return (
    <div className="combined-search-page-container">
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${isGigView ? "active" : ""}`}
          onClick={() => setIsGigView(true)}
        >
          Gigs
        </button>
        <button
          className={`toggle-btn ${!isGigView ? "active" : ""}`}
          onClick={() => setIsGigView(false)}
        >
          Employees
        </button>
      </div>
      <div className="search-content">
        {isGigView ? <GigSearch /> : <EmployeeSearch />}
      </div>
    </div>
  );
};

export default CombinedSearchPage;
