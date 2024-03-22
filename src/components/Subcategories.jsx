import { useState } from "react";
// Import Subproducts component
import Subproducts from "./Subproducts";
// Import context hook for managing checked products
import { useCheckedProducts } from "../context/CheckedProductsContext";
// Import JSON database
import db from "../assets/json_data/db";
// Import CSS
import "./Subcategories.css";

export default function Subcategories({ productId }) {
  // Get the JSON data for products
  const productsData = db;
  // State to keep track of checked status for each subcategory
  const [categoryItems, setcategoryItems] = useState({});
  // State to keep track of search text
  const [searchText, setSearchText] = useState("");
  // State to track visbility of subcategory lists
  const [showSubcategories, setShowSubcategories] = useState(true);

  // State to hold the checked categories
  const { checkedSubcategories, setCheckedSubcategories } =
    useCheckedProducts();

  const toggleSubcategoryVisibility = () => {
    setShowSubcategories(!showSubcategories);
  };

  // Function to handle checkbox changes for each subcategory
  const handleCategoryChange = (subCategoryId) => {
    // Toggle the checked status for the subcategory
    setcategoryItems({
      ...categoryItems,
      [subCategoryId]: !categoryItems[subCategoryId],
    });
  };

  // Function to handle click event on "Add Category" button
  const handleAddSubcategory = () => {
    // Filter checked categories and get their IDs
    const checkedsubCategoryIds = Object.keys(categoryItems).filter(
      (subCategoryId) => categoryItems[subCategoryId]
    );
    // Update the state with the checked category IDs using the context function
    setCheckedSubcategories(checkedsubCategoryIds);
    // Pass the array of checked category IDs to another component
  };

  // Filter subcategories based on productId
  const filteredSubcategories = productsData.subcategories.filter(
    (subCategory) => subCategory.productId === productId
  );

  // Filter subcategories based on search text
  const searchFilteredSubcategories = filteredSubcategories.filter(
    (subCategory) =>
      subCategory.subCategoryName
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  return (
    <div className="subcategory-section">
      <div className="subcategory-header">
        {/* Subcategory title */}
        <h4 className="subcategory-title">Select subcategories</h4>
        <span className="minimize-btn" onClick={toggleSubcategoryVisibility}>
          {showSubcategories ? (
            <img src="icons/subcat-collapse.png" alt="collapse icon" />
          ) : (
            <img src="icons/subcat-expand.png" alt="expand icon" />
          )}
        </span>
      </div>
      {/* Container for subcategory list */}
      {showSubcategories && (
        <div className="subcategory-list">
          {/* Search bar */}
          <input
            className="search-bar"
            type="text"
            placeholder="Search subcategories"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* Map through searched subcategories and render each subcategory */}
          {searchFilteredSubcategories.map((subCategory) => (
            <div className="subcategory-menu" key={subCategory.subCategoryId}>
              {/* Individual subcategory item */}
              <div className="subcategory-item">
                {/* Label for subcategory */}
                <label>{subCategory.subCategoryName}</label>
                {/* Checkbox for subcategory */}
                <input
                  type="checkbox"
                  // Set checked status based on categoryItems state
                  checked={categoryItems[subCategory.subCategoryId] || false}
                  // Handle checkbox change
                  onChange={() =>
                    handleCategoryChange(subCategory.subCategoryId)
                  }
                />
              </div>
              {/* Conditionally render Subproducts component if subcategory is checked */}
              {categoryItems[subCategory.subCategoryId] && (
                <Subproducts subCategoryId={subCategory.subCategoryId} />
              )}
            </div>
          ))}
        </div>
      )}
      {showSubcategories && (
        <div className="product-btn">
          <button className="btn" onClick={handleAddSubcategory}>
            Add Subcategory
          </button>
        </div>
      )}
    </div>
  );
}
