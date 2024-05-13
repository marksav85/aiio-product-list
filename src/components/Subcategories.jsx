import { useState } from "react";
import Subproducts from "./Subproducts";
import { useCheckedProducts } from "../context/CheckedProductsContext";
import { useProductsData } from "../hooks/useProductsData";
import "./Subcategories.css";

export default function Subcategories({ productId, productSelectionState }) {
  const { subcategories } = useProductsData();
  const { checkedSubcategories, setCheckedSubcategories } =
    useCheckedProducts();
  const { checkedSubproducts, setCheckedSubproducts } = useCheckedProducts();

  const [checkedCategoryIds, setCheckedCategoryIds] = useState({});
  const [searchText, setSearchText] = useState("");
  const [showSubcategories, setShowSubcategories] = useState(true);

  const toggleSubcategoryVisibility = () => {
    setShowSubcategories(!showSubcategories);
  };

  const handleCategoryChange = (subCategoryId) => {
    const isChecked = checkedCategoryIds[subCategoryId]; // Get the current checked state of the checkbox

    // Update checkedCategoryIds to toggle the checked state of the checkbox
    setCheckedCategoryIds((prevcheckedCategoryIds) => ({
      ...prevcheckedCategoryIds,
      [subCategoryId]: !isChecked,
    }));

    // Update checkedSubcategories based on whether the checkbox is checked or not
    setCheckedSubcategories((prevCheckedSubCategories) => {
      let updatedCheckedSubCategories = [...prevCheckedSubCategories];

      // Check if the item already added
      const alreadyAdded = updatedCheckedSubCategories.some(
        (item) => item.subCategoryId === subCategoryId
      );

      if (!alreadyAdded && !isChecked) {
        // If the item isn't already added and the checkbox is checked, add the item
        updatedCheckedSubCategories.push(
          subcategories.find((item) => item.subCategoryId === subCategoryId)
        );
      } else if (alreadyAdded && isChecked) {
        // If the item is already added and the checkbox is unchecked, remove the item
        updatedCheckedSubCategories = updatedCheckedSubCategories.filter(
          (item) => item.subCategoryId !== subCategoryId
        );

        // Remove corresponding items from checkedSubproducts
        setCheckedSubproducts((prevCheckedSubproducts) =>
          prevCheckedSubproducts.filter(
            (item) => item.subCategoryId !== subCategoryId
          )
        );
      }

      return updatedCheckedSubCategories;
    });
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
                    checked={
                      checkedCategoryIds[subCategory.subCategoryId] || false
                    }
                    onChange={() =>
                      handleCategoryChange(subCategory.subCategoryId)
                    }
                  />
                </div>
                {checkedCategoryIds[subCategory.subCategoryId] && (
                  <Subproducts
                    subCategoryId={subCategory.subCategoryId}
                    checkedSubcategories={checkedSubcategories} // Pass checkedSubcategories
                  />
                )}
              </div>
            ))}
        </div>
      )}
      {showSubcategories && (
        <div className="product-btn">
          <button className="btn">Add Subcategory</button>
        </div>
      )}
    </div>
  );
}
