import { useState } from "react";
import Subproducts from "./Subproducts";
import { useCheckedProducts } from "../context/CheckedProductsContext";
import { useProductsData } from "../hooks/useProductsData";
import "./Subcategories.css";

export default function Subcategories({ productId }) {
  const { subcategories } = useProductsData();
  const { checkedSubcategories, setCheckedSubcategories } =
    useCheckedProducts();

  const [categoryItems, setCategoryItems] = useState({});
  const [searchText, setSearchText] = useState("");
  const [showSubcategories, setShowSubcategories] = useState(true);

  const toggleSubcategoryVisibility = () => {
    setShowSubcategories(!showSubcategories);
  };

  const handleCategoryChange = (subCategoryId) => {
    setCategoryItems({
      ...categoryItems,
      [subCategoryId]: !categoryItems[subCategoryId],
    });
  };

  const handleAddSubcategory = () => {
    const checkedSubCategoryIds = Object.keys(categoryItems).filter(
      (subCategoryId) => categoryItems[subCategoryId]
    );
    setCheckedSubcategories(checkedSubCategoryIds);
    console.log("checkedSubCategoryIds", checkedSubCategoryIds);
  };

  if (!subcategories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="subcategory-section">
      <div className="subcategory-header">
        <h4 className="subcategory-title">Select subcategories</h4>
        <span className="minimize-btn" onClick={toggleSubcategoryVisibility}>
          {showSubcategories ? (
            <img src="icons/subcat-collapse.png" alt="collapse icon" />
          ) : (
            <img src="icons/subcat-expand.png" alt="expand icon" />
          )}
        </span>
      </div>
      {showSubcategories && (
        <div className="subcategory-list">
          <input
            className="search-bar"
            type="text"
            placeholder="Search subcategories"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {subcategories
            .filter((subCategory) => subCategory.productId === productId)
            .filter((subCategory) =>
              subCategory.subCategoryName
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
            .map((subCategory) => (
              <div className="subcategory-menu" key={subCategory.subCategoryId}>
                <div className="subcategory-item">
                  <label>{subCategory.subCategoryName}</label>
                  <input
                    type="checkbox"
                    checked={categoryItems[subCategory.subCategoryId] || false}
                    onChange={() =>
                      handleCategoryChange(subCategory.subCategoryId)
                    }
                  />
                </div>
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
