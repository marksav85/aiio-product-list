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
    setModalProducts(
      checkedProducts.map((productIdString) => {
        const productId = parseInt(productIdString, 10);
        const product = productsData.products.find(
          (prod) => prod.productId === productId
        );
        return product ? product.productName : "Product not found";
      })
    );
  }, [checkedProducts, productsData.products]);

  useEffect(() => {
    setModalSubcategories(
      checkedSubcategories.map((subcategoryIdString) => {
        const subcategoryId = parseInt(subcategoryIdString, 10);
        const subcategory = productsData.subcategories.find(
          (subcat) => subcat.subCategoryId === subcategoryId
        );
        return subcategory
          ? subcategory.subCategoryName
          : "Subcategory not found";
      })
    );
  }, [checkedSubcategories, productsData.subcategories]);

  useEffect(() => {
    setModalSubproducts(
      checkedSubproducts.map((subproductIdString) => {
        const subproductId = parseInt(subproductIdString, 10);
        const subproduct = productsData.subproducts.find(
          (subprod) => subprod.subProductId === subproductId
        );
        return subproduct ? subproduct.subProductName : "Subproduct not found";
      })
    );
  }, [checkedSubproducts, productsData.subproducts]);

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
        <div className="modal-products">
          <h4>Products:</h4>
          {/* Display added products */}
          {modalProducts.length > 0 ? (
            modalProducts.map((productName, index) => (
              <p key={index}>{productName}</p>
            ))
          ) : (
            <p>No products selected</p>
          )}
        </div>
        <div className="modal-subcategories">
          <h4>SubCategories:</h4>
          {/* Display added subcategories */}
          {modalSubcategories.length > 0 ? (
            modalSubcategories.map((subCategoryName, index) => (
              <p key={index}>{subCategoryName}</p>
            ))
          ) : (
            <p>No sub-categories selected</p>
          )}
        </div>
        <div className="modal-subproducts">
          <h4>SubProducts:</h4>
          {/* Display added subproducts */}
          {modalSubproducts.length > 0 ? (
            modalSubproducts.map((subProductName, index) => (
              <p key={index}>{subProductName}</p>
            ))
          ) : (
            <p>No sub-products selected</p>
          )}
        </div>
        {/* Close modal */}
        <div className="modal-btn">
          <button className="close btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
