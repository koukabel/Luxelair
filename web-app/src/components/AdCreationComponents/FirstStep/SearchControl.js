import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
const SearchControl = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // Call the onSearch callback with the query
    onSearch(query);
  };

  return (
    <div className="input-container">
    <input
      className="searchMap"
      type="text"
      value={query}
      
      placeholder="Search for a location"
    />
    <FaLocationDot className="location-icon" /> {/* Add the icon component */}
  
  <button onClick={handleSearch}>Search</button>
</div>
  );
};

export default SearchControl;
