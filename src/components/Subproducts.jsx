import { useState } from "react";
// Import context hook for managing checked products
import { useCheckedProducts } from "../context/CheckedProductsContext";
// Import JSON database
import db from "../assets/json_data/db";
// Import CSS file for styling
import "./Subproducts.css";

export default function Subproducts({ subCategoryId }) {
  // Get the JSON data for products
  const productsData = db;
  // State to keep track of checked status for each subproduct
  const [subproductItems, setsubproductItems] = useState({});
  // State to keep track of search text
  const [searchText, setSearchText] = useState("");
  // State to track visbility of subproduct lists
  const [showSubproducts, setShowSubproducts] = useState(true);
  // State to hold the checked subproducts
  const { checkedSubproducts, setCheckedSubproducts } = useCheckedProducts();

  const toggleSubproductVisibility = () => {
    setShowSubproducts(!showSubproducts);
  };

  // Function to handle checkbox changes for each subproduct
  const handleSubproductChange = (subProductId) => {
    // Toggle the checked status for the subproduct
    setsubproductItems({
      ...subproductItems,
      [subProductId]: !subproductItems[subProductId],
    });
  };

  // Function to handle click event on "Add Sub-Product" button
  const handleAddSubproduct = () => {
    // Filter checked subproducts and get their IDs
    const checkedSubproductIds = Object.keys(subproductItems).filter(
      (subproductId) => subproductItems[subproductId]
    );
    // Update the state with the checked subproduct IDs using the context function
    setCheckedSubproducts(checkedSubproductIds);
    // Pass the array of checked subproduct IDs to another component
  };

  // Filter subproducts based on subCategoryId
  const filteredSubproducts = productsData.subproducts.filter(
    (subProduct) => subProduct.subCategoryId === subCategoryId
  );

  // Filter subproducts based on search text
  const searchFilteredSubproducts = filteredSubproducts.filter((subProduct) =>
    subProduct.subProductName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="subproduct-section">
      <div className="subproduct-header">
        {/* Subproduct title */}
        <h5 className="subproduct-title">Select subproducts</h5>
        <span className="minimize-btn" onClick={toggleSubproductVisibility}>
          {showSubproducts ? (
            <img src="icons/subprod-collapse.png" alt="collapse icon" />
          ) : (
            <img src="icons/subprod-expand.png" alt="expand icon" />
          )}
        </span>
      </div>
      {/* Container for subproduct list */}
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
          {/* Map through searched subproducts and render each subproduct */}
          {searchFilteredSubproducts.map((subproduct) => (
            <div className="subproduct-menu" key={subproduct.subProductId}>
              {/* Individual subproduct item */}
              <div className="subproduct-item">
                {/* Label for subproduct */}
                <label>{subproduct.subProductName}</label>
                {/* Checkbox for subproduct */}
                <input
                  type="checkbox"
                  // Set checked status based on subproductItems state
                  checked={subproductItems[subproduct.subProductId] || false}
                  // Handle checkbox change
                  onChange={() =>
                    handleSubproductChange(subproduct.subProductId)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Button to add subproducts */}
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
