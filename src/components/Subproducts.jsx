import { useState } from "react";
import "./Subproducts.css"; // Import CSS file for styling

// Define the JSON data for subproducts
const subproductData = {
  subproducts: [
    { subCategoryId: 1, subProductId: 1, subProductName: "Blue Collectors" },
    { subCategoryId: 1, subProductId: 2, subProductName: "Red Collectors" },
    { subCategoryId: 2, subProductId: 3, subProductName: "Yellow Collectors" },
    { subCategoryId: 2, subProductId: 4, subProductName: "White Collectors" },
    { subCategoryId: 3, subProductId: 5, subProductName: "Black Collectors" },
    { subCategoryId: 3, subProductId: 6, subProductName: "Green Collectors" },
    { subCategoryId: 4, subProductId: 7, subProductName: "Orange Collectors" },
    { subCategoryId: 4, subProductId: 8, subProductName: "Purple Collectors" },
    { subCategoryId: 5, subProductId: 9, subProductName: "Wheat Collectors" },
    {
      subCategoryId: 5,
      subProductId: 10,
      subProductName: "Current Collectors",
    },
    { subCategoryId: 6, subProductId: 11, subProductName: "Blaue Sammler" },
    { subCategoryId: 6, subProductId: 12, subProductName: "Rote Sammler" },
    { subCategoryId: 7, subProductId: 13, subProductName: "Gelbe Sammler" },
    { subCategoryId: 7, subProductId: 14, subProductName: "Weiße Sammler" },
    { subCategoryId: 8, subProductId: 15, subProductName: "Schwarze Sammler" },
    { subCategoryId: 8, subProductId: 16, subProductName: "Grüne Sammler" },
    {
      subCategoryId: 9,
      subProductId: 17,
      subProductName: "Orangefarbene Sammler",
    },
    { subCategoryId: 9, subProductId: 18, subProductName: "Lila Sammler" },
    { subCategoryId: 10, subProductId: 19, subProductName: "Weizen Sammler" },
    { subCategoryId: 10, subProductId: 20, subProductName: "Stromsammler" },
  ],
};

export default function Subproducts({ subCategoryId }) {
  // State to keep track of checked status for each subproduct
  const [subproductItems, setsubproductItems] = useState({});

  // Function to handle checkbox changes for each subproduct
  const handleSubproductChange = (subProductId) => {
    // Toggle the checked status for the subproduct
    setsubproductItems({
      ...subproductItems,
      [subProductId]: !subproductItems[subProductId],
    });
  };

  // Filter subproducts based on subcategoryId
  const filteredSubproducts = subproductData.subproducts.filter(
    (subProduct) => subProduct.subCategoryId === subCategoryId
  );

  return (
    <div className="subproduct-section">
      {/* Subproduct title */}
      <h5 className="subproduct-title">Select subproducts</h5>
      {/* Container for subproduct list */}
      <div className="subproduct-list">
        {/* Map through subproducts and render each subproduct */}
        {filteredSubproducts.map((subproduct) => (
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
                onChange={() => handleSubproductChange(subproduct.subProductId)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
