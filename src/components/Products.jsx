import { useState } from "react";
import Subcategories from "./Subcategories";
import { useCheckedProducts } from "../context/CheckedProductsContext";
import { useProductsData } from "../hooks/useProductsData";
import "./Products.css";

// Component for displaying products and their associated subcategories
export default function Products() {
  // Fetch products data using custom hook
  const { products, isLoading, error } = useProductsData();
  // Access checked products and setCheckedProducts function from context
  const { checkedProducts, setCheckedProducts } = useCheckedProducts();
  // State variable to store IDs of checked products
  const [checkedProductIds, setCheckedProductIds] = useState([]);
  const { checkedSubcategories, setCheckedSubcategories } =
    useCheckedProducts();
  const { checkedSubproducts, setCheckedSubproducts } = useCheckedProducts();
  const [productSelectionState, setProductSelectionState] = useState({});

  // Function to handle changes in product selection
  const handleProductChange = (productId) => {
    const isChecked = checkedProductIds[productId]; // Get the current checked state of the checkbox

    // Update checkedProductIds to toggle the checked state of the checkbox
    setCheckedProductIds((prevCheckedProductIds) => ({
      ...prevCheckedProductIds,
      [productId]: !isChecked,
    }));

    // Update checkedProducts based on whether the checkbox is checked or not
    setCheckedProducts((prevCheckedProducts) => {
      let updatedCheckedProducts = [...prevCheckedProducts];

      // Check if the item already added
      const alreadyAdded = updatedCheckedProducts.some(
        (item) => item.productId === productId
      );

      if (!alreadyAdded && !isChecked) {
        // If the item isn't already added and the checkbox is checked, add the item
        updatedCheckedProducts.push(
          products.find((item) => item.productId === productId)
        );
      } else if (alreadyAdded && isChecked) {
        // If the item is already added and the checkbox is unchecked, remove the item
        updatedCheckedProducts = updatedCheckedProducts.filter(
          (item) => item.productId !== productId
        );

        // Remove corresponding items from checkedSubcategories
        setCheckedSubcategories((prevCheckedSubCategories) =>
          prevCheckedSubCategories.filter(
            (item) => item.productId !== productId
          )
        );

        // Remove corresponding items from checkedSubproducts
        setCheckedSubproducts((prevCheckedSubproducts) =>
          prevCheckedSubproducts.filter((item) => item.productId !== productId)
        );

        if (checkedSubcategories && checkedSubproducts) {
          // Extract subCategoryIds from checkedSubcategories with matching productId
          const subCategoryIdsToRemove = [];
          for (const category of checkedSubcategories) {
            if (category.productId === productId) {
              subCategoryIdsToRemove.push(category.subCategoryId);
            }
          }

          // Remove properties from checkedSubproducts where subCategoryId matches
          setCheckedSubproducts((prevCheckedSubproducts) =>
            prevCheckedSubproducts.filter(
              (item) => !subCategoryIdsToRemove.includes(item.subCategoryId)
            )
          );
        }
      }

      return updatedCheckedProducts;
    });
  };

  // Render loading message if products data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render error message if there is an error fetching products data
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {/* Page title */}
      <h2 className="page-title">Products</h2>
      <div className="product-list">
        {/* Display products */}
        {products &&
          products.map((product) => (
            <div className="product-menu" key={product.productId}>
              <div className="product-item">
                {/* Product name label */}
                <label>{product.productName}</label>
                {/* Checkbox to select product */}
                <input
                  type="checkbox"
                  checked={checkedProductIds[product.productId] || false}
                  onChange={() => handleProductChange(product.productId)}
                />
              </div>
              {checkedProductIds[product.productId] && (
                <Subcategories
                  productId={product.productId}
                  productSelectionState={productSelectionState}
                />
              )}
            </div>
          ))}
      </div>
      {/* Button to create new product. Currently disabled. */}
      <div className="product-btn">
        <button className="btn" disabled>
          Add Product
        </button>
      </div>
    </div>
  );
}
