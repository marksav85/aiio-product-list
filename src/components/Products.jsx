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

  // Function to handle changes in product selection
  const handleProductChange = (productId) => {
    const newCheckedProductIds = checkedProductIds.includes(productId)
      ? checkedProductIds.filter((id) => id !== productId)
      : [...checkedProductIds, productId];
    setCheckedProductIds(newCheckedProductIds);
  };

  // Function to add selected products to checkedProducts
  const handleAddProduct = () => {
    setCheckedProducts(checkedProductIds);
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
                  checked={checkedProductIds.includes(product.productId)}
                  onChange={() => handleProductChange(product.productId)}
                />
              </div>
              {/* Display subcategories if product is selected */}
              {checkedProductIds.includes(product.productId) && (
                <Subcategories productId={product.productId} />
              )}
            </div>
          ))}
      </div>
      {/* Button to add selected products */}
      <div className="product-btn">
        <button className="btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}
