import { useState, useEffect } from "react";
import { useCheckedProducts } from "../context/CheckedProductsContext";
import { useProductsData } from "../hooks/useProductsData";
import "./Subproducts.css";

export default function Subproducts({ subCategoryId, checkedSubcategories }) {
  const { subproducts } = useProductsData();
  const { checkedSubproducts, setCheckedSubproducts } = useCheckedProducts();

  const [checkedSubproductIds, setCheckedSubproductIds] = useState({});
  const [searchText, setSearchText] = useState("");
  const [showSubproducts, setShowSubproducts] = useState(true);

  const toggleSubproductVisibility = () => {
    setShowSubproducts(!showSubproducts);
  };

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

  useEffect(() => {
    console.log("checked Subproducts", checkedSubproducts);
  }, [checkedSubproducts, subproducts]);

  if (!subproducts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="subproduct-section">
      <div className="subproduct-header">
        <h5 className="subproduct-title">Select subproducts</h5>
        <span className="minimize-btn" onClick={toggleSubproductVisibility}>
          {showSubproducts ? (
            <img src="icons/subprod-collapse.png" alt="collapse icon" />
          ) : (
            <img src="icons/subprod-expand.png" alt="expand icon" />
          )}
        </span>
      </div>
      {showSubproducts && (
        <div className="subproduct-list">
          <input
            className="search-bar"
            type="text"
            placeholder="Search subproducts"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {subproducts
            .filter((subproduct) => subproduct.subCategoryId === subCategoryId)
            .filter((subproduct) =>
              subproduct.subProductName
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
            .map((subproduct) => (
              <div className="subproduct-menu" key={subproduct.subProductId}>
                <div className="subproduct-item">
                  <label>{subproduct.subProductName}</label>
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
      {showSubproducts && (
        <div className="product-btn">
          <button className="btn">Add Subproduct</button>
        </div>
      )}
    </div>
  );
}
