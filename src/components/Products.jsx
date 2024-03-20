import { useState } from "react";
import Subcategories from "./Subcategories"; // Import Subcategories component
import "./Products.css"; // Import CSS file for styling

// Define the JSON data for products
const productsData = {
  products: [
    { productId: 1, productName: "Electric Motors" },
    { productId: 2, productName: "Communication Equipment" },
  ],
};

export default function Products() {
  // State to keep track of checked status for each product
  const [productItems, setproductItems] = useState({});

  // Function to handle checkbox changes for each product
  const handleProductChange = (productId) => {
    // Toggle the checked status for the product
    setproductItems({
      ...productItems,
      [productId]: !productItems[productId],
    });
    // Log the updated productItems state
    console.log(productItems);
  };

  return (
    <div>
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
    </div>
  );
}
