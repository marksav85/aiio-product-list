import { useState } from "react";
import { useCheckedProducts } from "../context/CheckedProductsContext";
import "./Subproducts.css";

export default function Subproducts({ subCategoryId }) {
  const { subproducts } = useCheckedProducts();
  // Access checked subproducts and setCheckedSubproducts function from context
  const { checkedSubproducts, setCheckedSubproducts } = useCheckedProducts();
  const [checkedSubproductIds, setCheckedSubproductIds] = useState({});
  // State variable to store the search text
  const [searchText, setSearchText] = useState("");
  // State variable to manage the visibility of subproducts
  const [showSubproducts, setShowSubproducts] = useState(true);
  // Access toggleNewProduct function from context
  const { toggleNewProduct } = useCheckedProducts();

  // Function to toggle the visibility of subproducts
  const toggleSubproductVisibility = () => {
    setShowSubproducts(!showSubproducts);
  };

  // Function to handle changes in the checkbox state
  const handleSubproductChange = (subProductId) => {
    const isChecked = checkedSubproductIds[subProductId]; // Get the current checked state of the checkbox

    // Update subproductItems to toggle the checked state of the checkbox
    setCheckedSubproductIds((prevCheckedSubproductIds) => ({
      ...prevCheckedSubproductIds,
      [subProductId]: !isChecked,
    }));

    // Update checkedSubproducts based on whether the checkbox is checked or not
    setCheckedSubproducts((prevCheckedSubproductIds) => {
      let updatedCheckedSubProducts = [...prevCheckedSubproductIds];

      // Check if the item already added
      const alreadyAdded = updatedCheckedSubProducts.some(
        (item) => item.subProductId === subProductId
      );

      if (!alreadyAdded && !isChecked) {
        // If the item isn't already added and the checkbox is checked, add the item
        updatedCheckedSubProducts.push(
          subproducts.find((item) => item.subProductId === subProductId)
        );
      } else if (alreadyAdded && isChecked) {
        // If the item is already added and the checkbox is unchecked, remove the item
        updatedCheckedSubProducts = updatedCheckedSubProducts.filter(
          (item) => item.subProductId !== subProductId
        );
      }

      return updatedCheckedSubProducts;
    });
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
                    checked={
                      checkedSubproductIds[subproduct.subProductId] || false
                    }
                    onChange={() =>
                      handleSubproductChange(subproduct.subProductId)
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      )}
      {/* Button to toggle ModalNewProduct */}
      {showSubproducts && (
        <div className="product-btn">
          <button
            className="btn"
            onClick={() => {
              toggleNewProduct(subCategoryId);
            }}
          >
            Add Subproduct
          </button>
        </div>
      )}
    </div>
  );
}
