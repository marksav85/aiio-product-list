import { useState } from "react";
import { useCheckedProducts } from "../context/CheckedProductsContext";
import { useProductsData } from "../hooks/useProductsData";
import "./Subproducts.css";

export default function Subproducts({ subCategoryId }) {
  const { subproducts } = useProductsData();
  const { checkedSubproducts, setCheckedSubproducts } = useCheckedProducts();

  const [subproductItems, setSubproductItems] = useState({});
  const [searchText, setSearchText] = useState("");
  const [showSubproducts, setShowSubproducts] = useState(true);

  const toggleSubproductVisibility = () => {
    setShowSubproducts(!showSubproducts);
  };

  const handleSubproductChange = (subProductId) => {
    setSubproductItems({
      ...subproductItems,
      [subProductId]: !subproductItems[subProductId],
    });
  };

  const handleAddSubproduct = () => {
    const checkedSubproductIds = Object.keys(subproductItems).filter(
      (subProductId) => subproductItems[subProductId]
    );
    setCheckedSubproducts(checkedSubproductIds);
  };

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
