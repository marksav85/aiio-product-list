import { useState } from "react";
import { useCheckedProducts } from "../context/CheckedProductsContext";
import { useProductsData } from "../hooks/useProductsData";
import "./Subproducts.css";

// Component for selecting subproducts
export default function Subproducts({ subCategoryId }) {
  // Fetch subproducts data using custom hook
  const { subproducts } = useProductsData();
  // Access checked subproducts and setCheckedSubproducts function from context
  const { checkedSubproducts, setCheckedSubproducts } = useCheckedProducts();

  // State variables
  const [subproductItems, setSubproductItems] = useState({}); // Store selected subproducts
  const [searchText, setSearchText] = useState(""); // Store search text
  const [showSubproducts, setShowSubproducts] = useState(true); // Toggle visibility of subproducts

  // Function to toggle visibility of subproducts
  const toggleSubproductVisibility = () => {
    setShowSubproducts(!showSubproducts);
  };

  // Function to handle changes in subproduct selection
  const handleSubproductChange = (subProductId) => {
    setSubproductItems({
      ...subproductItems,
      [subProductId]: !subproductItems[subProductId],
    });
  };

  // Function to add selected subproducts to checkedSubproducts
  const handleAddSubproduct = () => {
    const checkedSubproductIds = Object.keys(subproductItems).filter(
      (subProductId) => subproductItems[subProductId]
    );
    setCheckedSubproducts(checkedSubproductIds);
  };

  // Render loading message if subproducts data is not available
  if (!subproducts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="subproduct-section">
      {/* Subproducts header */}
      <div className="subproduct-header">
        <h5 className="subproduct-title">Select subproducts</h5>
        {/* Button to toggle visibility of subproducts */}
        <span className="minimize-btn" onClick={toggleSubproductVisibility}>
          {showSubproducts ? (
            <img src="icons/subprod-collapse.png" alt="collapse icon" />
          ) : (
            <img src="icons/subprod-expand.png" alt="expand icon" />
          )}
        </span>
      </div>
      {/* Display subproducts if showSubproducts is true */}
      {showSubproducts && (
        <div className="subproduct-list">
          {/* Search bar */}
          <input
            className="search-bar"
            type="text"
            placeholder="Search subproducts"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* List of subproducts */}
          {subproducts
            .filter((subproduct) => subproduct.subCategoryId === subCategoryId)
            .filter((subproduct) =>
              subproduct.subProductName
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
            .map((subproduct) => (
              <div className="subproduct-menu" key={subproduct.subProductId}>
                {/* Subproduct item */}
                <div className="subproduct-item">
                  <label>{subproduct.subProductName}</label>
                  {/* Checkbox to select subproduct */}
                  <input
                    type="checkbox"
                    checked={subproductItems[subproduct.subProductId] || false}
                    onChange={() =>
                      handleSubproductChange(subproduct.subProductId)
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      )}
      {/* Button to add selected subproducts */}
      {showSubproducts && (
        <div className="product-btn">
          <button className="btn" onClick={handleAddSubproduct}>
            Add Subproduct
          </button>
        </div>
      )}
    </div>
  );
}
