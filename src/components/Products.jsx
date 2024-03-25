import { useState } from "react";
import Subcategories from "./Subcategories";
import { useCheckedProducts } from "../context/CheckedProductsContext";
import { useProductsData } from "../hooks/useProductsData";
import "./Products.css";

export default function Products() {
  const { products, isLoading, error } = useProductsData();
  const { checkedProducts, setCheckedProducts } = useCheckedProducts();
  const [checkedProductIds, setCheckedProductIds] = useState([]);

  const handleProductChange = (productId) => {
    const newCheckedProductIds = checkedProductIds.includes(productId)
      ? checkedProductIds.filter((id) => id !== productId)
      : [...checkedProductIds, productId];
    setCheckedProductIds(newCheckedProductIds);
  };

  const handleAddProduct = () => {
    setCheckedProducts(checkedProductIds);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="page-title">Products</h2>
      <div className="product-list">
        {products &&
          products.map((product) => (
            <div className="product-menu" key={product.productId}>
              <div className="product-item">
                <label>{product.productName}</label>
                <input
                  type="checkbox"
                  checked={checkedProductIds.includes(product.productId)}
                  onChange={() => handleProductChange(product.productId)}
                />
              </div>
              {checkedProductIds.includes(product.productId) && (
                <Subcategories productId={product.productId} />
              )}
            </div>
          ))}
      </div>
      <div className="product-btn">
        <button className="btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}
