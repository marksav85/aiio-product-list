import { useState, useEffect } from "react";
// Import context hook for managing checked products
import { useCheckedProducts } from "../context/CheckedProductsContext";
// Import custom hook for fetching products data
import { useProductsData } from "../hooks/useProductsData";
// Import CSS
import "./ModalOrderList.css";

export default function ModalOrderList({ saveModal }) {
  const { products, subcategories, subproducts, isLoading, error } =
    useProductsData();

  // Retrieve checked products, subcategories, and subproducts using context hook
  const { checkedProducts, checkedSubcategories, checkedSubproducts } =
    useCheckedProducts();

  // State variables to store modal display data
  const [modalProducts, setModalProducts] = useState([]);
  const [modalSubcategories, setModalSubcategories] = useState([]);
  const [modalSubproducts, setModalSubproducts] = useState([]);

  // Update modal display data when checked items change
  useEffect(() => {
    if (products) {
      setModalProducts(
        checkedProducts.map((productIdString) => {
          const productId = parseInt(productIdString, 10);
          const product = products.find((prod) => prod.productId === productId);
          return product ? product.productName : "Product not found";
        })
      );
    }
  }, [checkedProducts, products]);

  useEffect(() => {
    if (subcategories) {
      setModalSubcategories(
        checkedSubcategories.map((subcategoryIdString) => {
          const subcategoryId = parseInt(subcategoryIdString, 10);
          const subcategory = subcategories.find(
            (subcat) => subcat.subCategoryId === subcategoryId
          );
          return subcategory
            ? subcategory.subCategoryName
            : "Subcategory not found";
        })
      );
    }
  }, [checkedSubcategories, subcategories]);

  useEffect(() => {
    if (subproducts && subproducts) {
      setModalSubproducts(
        checkedSubproducts.map((subproductIdString) => {
          const subproductId = parseInt(subproductIdString, 10);
          const subproduct = subproducts.find(
            (subprod) => subprod.subProductId === subproductId
          );
          return subproduct
            ? subproduct.subProductName
            : "Subproduct not found";
        })
      );
    }
  }, [checkedSubproducts, subproducts]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".modal");
      if (modal && !modal.contains(event.target)) {
        // Prevent the default behavior of the click event
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            modalSubcategories.map((subcategory, index) => (
              <p key={index}>{subcategory}</p>
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
          <button className="close btn" onClick={saveModal}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}