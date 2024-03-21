import { useState, useEffect } from "react";
// Import context hook for managing checked products
import { useCheckedProducts } from "../context/CheckedProductsContext";
// Import JSON database
import db from "../assets/json_data/db";
// Import CSS
import "./Modalbox.css";

export default function Modalbox({ closeModal }) {
  // Get the JSON data for products
  const productsData = db;

  // Retrieve checked products, subcategories, and subproducts using context hook
  const { checkedProducts, setCheckedProducts } = useCheckedProducts();
  const { checkedSubcategories, setCheckedSubcategories } =
    useCheckedProducts();
  const { checkedSubproducts, setCheckedSubproducts } = useCheckedProducts();

  // State variables to store modal display data
  const [modalProducts, setModalProducts] = useState([]);
  const [modalSubcategories, setModalSubcategories] = useState([]);
  const [modalSubproducts, setModalSubproducts] = useState([]);

  // Update modal display data when checked items change
  useEffect(() => {
    setModalProducts(checkedProducts);
    setModalSubcategories(checkedSubcategories);
    setModalSubproducts(checkedSubproducts);
    console.log("Modal:", checkedProducts);
  }, [checkedProducts, checkedSubcategories, checkedSubproducts]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".modal");
      if (modal && !modal.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <h4>Products:</h4>
          {/* Display added products */}
          {modalProducts.map((productIdString) => {
            // Parse the productId from the string
            const productId = parseInt(productIdString, 10);
            // Find the product object with the matching productId
            const product = productsData.products.find(
              (prod) => prod.productId === productId
            );
            // Display its name if exists
            if (product) {
              return <p key={productId}>{product.productName}</p>;
            } else {
              // Display error if not exist
              return <p key={productId}>Product not found</p>;
            }
          })}
        </div>
        <div>
          <h4>SubCategories:</h4>
          {/* Display added subcategories */}
          {modalSubcategories.map((subcategoryIdString) => {
            // Parse the subcategoryId from the string
            const subcategoryId = parseInt(subcategoryIdString, 10);
            // Find the subcategory object with the matching subcategoryId
            const subcategory = productsData.subcategories.find(
              (subcat) => subcat.subcategoryId === subcategoryId
            );
            // Display its name if exists
            if (subcategory) {
              return <p key={subcategoryId}>{subcategory.subCategoryName}</p>;
            } else {
              // Display error if not exist
              return <p key={subcategoryId}>Subcategory not found</p>;
            }
          })}
        </div>
        <div>
          <h4>SubProducts:</h4>
          {/* Display added subproducts */}
          {modalSubproducts.map((subproductIdString) => {
            // Parse the subproductId from the string
            const subproductId = parseInt(subproductIdString, 10);
            // Find the subproduct object with the matching subproductId
            const subproduct = productsData.subproducts.find(
              (subprod) => subprod.subProductId === subproductId
            );
            // Display its name if exists
            if (subproduct) {
              return <p key={subproductId}>{subproduct.subProductName}</p>;
            } else {
              // Display error if not exist
              return <p key={subproductId}>Subproduct not found</p>;
            }
          })}
        </div>
        {/* Close modal */}
        <span className="close" onClick={closeModal}>
          Close
        </span>
      </div>
    </div>
  );
}
