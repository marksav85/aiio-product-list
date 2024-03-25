import { useState } from "react";
import Subproducts from "./Subproducts";
import { useCheckedProducts } from "../context/CheckedProductsContext";
import { useProductsData } from "../hooks/useProductsData";
import "./Subcategories.css";

// Component for selecting subcategories
export default function Subcategories({ productId }) {
  // Fetch subcategories data using custom hook
  const { subcategories } = useProductsData();
  // Access checked subcategories and setCheckedSubcategories function from context
  const { checkedSubcategories, setCheckedSubcategories } =
    useCheckedProducts();

  // State variables
  const [categoryItems, setCategoryItems] = useState({}); // Store selected subcategories
  const [searchText, setSearchText] = useState(""); // Store search text
  const [showSubcategories, setShowSubcategories] = useState(true); // Toggle visibility of subcategories

  // Function to toggle visibility of subcategories
  const toggleSubcategoryVisibility = () => {
    setShowSubcategories(!showSubcategories);
  };

  // Function to handle changes in subcategory selection
  const handleCategoryChange = (subCategoryId) => {
    setCategoryItems({
      ...categoryItems,
      [subCategoryId]: !categoryItems[subCategoryId],
    });
  };

  // Function to add selected subcategories to checkedSubcategories
  const handleAddSubcategory = () => {
    const checkedSubCategoryIds = Object.keys(categoryItems).filter(
      (subCategoryId) => categoryItems[subCategoryId]
    );
    setCheckedSubcategories(checkedSubCategoryIds);
  };

  // Render loading message if subcategories data is not available
  if (!subcategories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="subcategory-section">
      {/* Subcategories header */}
      <div className="subcategory-header">
        <h4 className="subcategory-title">Select subcategories</h4>
        {/* Button to toggle visibility of subcategories */}
        <span className="minimize-btn" onClick={toggleSubcategoryVisibility}>
          {showSubcategories ? (
            <img src="icons/subcat-collapse.png" alt="collapse icon" />
          ) : (
            <img src="icons/subcat-expand.png" alt="expand icon" />
          )}
        </span>
      </div>
      {/* Display subcategories if showSubcategories is true */}
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
          {/* List of subcategories */}
          {subcategories
            .filter((subCategory) => subCategory.productId === productId)
            .filter((subCategory) =>
              subCategory.subCategoryName
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
            .map((subCategory) => (
              <div className="subcategory-menu" key={subCategory.subCategoryId}>
                {/* Subcategory item */}
                <div className="subcategory-item">
                  <label>{subCategory.subCategoryName}</label>
                  {/* Checkbox to select subcategory */}
                  <input
                    type="checkbox"
                    checked={categoryItems[subCategory.subCategoryId] || false}
                    onChange={() =>
                      handleCategoryChange(subCategory.subCategoryId)
                    }
                  />
                </div>
                {/* Display subproducts if subcategory is selected */}
                {categoryItems[subCategory.subCategoryId] && (
                  <Subproducts subCategoryId={subCategory.subCategoryId} />
                )}
              </div>
            ))}
        </div>
      )}
      {/* Button to add selected subcategories */}
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
