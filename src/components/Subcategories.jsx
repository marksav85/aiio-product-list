import { useState } from "react";
import Subproducts from "./Subproducts"; // Import Subproducts component
import "./Subcategories.css"; // Import CSS file for styling

// Define the JSON data for subcategories
const categoryData = {
  subcategories: [
    { productId: 1, subCategoryId: 1, subCategoryName: "Bearings" },
    { productId: 1, subCategoryId: 2, subCategoryName: "Current Collectors" },
    {
      productId: 1,
      subCategoryId: 3,
      subCategoryName: "Fans and Fan impellers",
    },
    { productId: 1, subCategoryId: 4, subCategoryName: "Insulators" },
    { productId: 1, subCategoryId: 5, subCategoryName: "Rotars and Stators" },
    { productId: 2, subCategoryId: 6, subCategoryName: "Lager" },
    { productId: 2, subCategoryId: 7, subCategoryName: "Stromkollektoren" },
    {
      productId: 2,
      subCategoryId: 8,
      subCategoryName: "Lüfter und Lüfterflügel",
    },
    { productId: 2, subCategoryId: 9, subCategoryName: "Isolatoren" },
    {
      productId: 2,
      subCategoryId: 10,
      subCategoryName: "Rotoren und Stator",
    },
  ],
};

export default function Subcategories({ productId }) {
  // State to keep track of checked status for each subcategory
  const [categoryItems, setcategoryItems] = useState({});
  // State to keep track of search text
  const [searchText, setSearchText] = useState("");

  // Function to handle checkbox changes for each subcategory
  const handleCategoryChange = (subCategoryId) => {
    // Toggle the checked status for the subcategory
    setcategoryItems({
      ...categoryItems,
      [subCategoryId]: !categoryItems[subCategoryId],
    });
  };

  // Filter subcategories based on productId
  const filteredSubcategories = categoryData.subcategories.filter(
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
      {/* Subcategory title */}
      <h4 className="subcategory-title">Select subcategories</h4>
      {/* Container for subcategory list */}
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
                onChange={() => handleCategoryChange(subCategory.subCategoryId)}
              />
            </div>
            {/* Conditionally render Subproducts component if subcategory is checked */}
            {categoryItems[subCategory.subCategoryId] && (
              <Subproducts subCategoryId={subCategory.subCategoryId} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
