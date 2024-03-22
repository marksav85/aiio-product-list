import { useState } from "react";
// Import Subcategories component
import Subcategories from "./Subcategories";
// Import context hook for managing checked products
import { useCheckedProducts } from "../context/CheckedProductsContext";
// Import JSON database
import db from "../assets/json_data/db";
// Import CSS
import "./Products.css";

export default function Products() {
  // Get the JSON data for products
  const productsData = db;
  // State to keep track of checked status for each product
  const [productItems, setproductItems] = useState({});
  // State to hold the checked products
  const { checkedProducts, setCheckedProducts } = useCheckedProducts();

  // Function to handle checkbox changes for each product
  const handleProductChange = (productId) => {
    // Toggle the checked status for the product
    setproductItems({
      ...productItems,
      [productId]: !productItems[productId],
    });
  };

  // Function to handle click event on "Add Product" button
  const handleAddProduct = () => {
    // Filter checked products and get their IDs
    const checkedProductIds = Object.keys(productItems).filter(
      (productId) => productItems[productId]
    );
    // Update the state with the checked product IDs using the context function
    setCheckedProducts(checkedProductIds);
    // Pass the array of checked product IDs to another component
  };

  return (
    <div className="container">
      {/* Page title */}
      <h2 className="page-title">Products</h2>
      {/* Container for product list */}
      <div className="product-list">
        {/* Map through products and render each product */}
        {productsData.products.map((product) => (
          <div className="product-menu" key={product.productId}>
            {/* Individual product item */}
            <div className="product-item">
              {/* Label for product */}
              <label>{product.productName}</label>
              {/* Checkbox for product */}
              <input
                type="checkbox"
                // Set checked status based on productItems state
                checked={productItems[product.productId] || false}
                // Handle checkbox change
                onChange={() => handleProductChange(product.productId)}
              />
            </div>
            {/* Conditionally render Subcategories component if product is checked */}
            {productItems[product.productId] && (
              <Subcategories productId={product.productId} />
            )}
          </div>
        ))}
      </div>
      {/* Add Product button */}
      <div className="product-btn">
        <button className="btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}
