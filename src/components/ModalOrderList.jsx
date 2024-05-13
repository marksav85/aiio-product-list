import { useState, useEffect } from "react";
// Import context hook for managing checked products
import { useCheckedProducts } from "../context/CheckedProductsContext";
// Import custom hook for fetching products data
import { useProductsData } from "../hooks/useProductsData";
// Import CSS
import "./ModalOrderList.css";

export default function ModalOrderList({ closeOrder }) {
  const {
    products,
    subcategories,
    subproducts,
    saveOrderData,
    isLoading,
    error,
  } = useProductsData();

  // Retrieve checked products, subcategories, and subproducts using context hook
  const {
    checkedProducts,
    checkedSubcategories,
    checkedSubproducts,
    resetState,
  } = useCheckedProducts();

  // State variables to store modal display data
  const [modalProducts, setModalProducts] = useState([]);

  const [modalSubcategories, setModalSubcategories] = useState([]);
  const [modalSubproducts, setModalSubproducts] = useState([]);

  // Update modal display data when checked items change
  useEffect(() => {
    if (checkedProducts && products) {
      setModalProducts(checkedProducts.map((product) => product.productName));
    }
  }, [checkedProducts, products]);

  useEffect(() => {
    if (checkedSubcategories && subcategories) {
      setModalSubcategories(
        checkedSubcategories.map((subcategory) => subcategory.subCategoryName)
      );
    }
  }, [checkedSubcategories, subcategories]);

  useEffect(() => {
    if (checkedSubproducts && subproducts) {
      setModalSubproducts(
        checkedSubproducts.map((subproduct) => subproduct.subProductName)
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
        closeOrder(); // Close the modal when clicking outside
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [closeOrder]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const saveOrder = () => {
    // Convert array data to objects with indices as keys
    const productsObj = modalProducts.reduce((obj, product, index) => {
      obj[index + 1] = product;
      return obj;
    }, {});

    const subcategoriesObj = modalSubcategories.reduce(
      (obj, subcategory, index) => {
        obj[index + 1] = subcategory;
        return obj;
      },
      {}
    );

    const subproductsObj = modalSubproducts.reduce((obj, subproduct, index) => {
      obj[index + 1] = subproduct;
      return obj;
    }, {});

    // Construct the orderData object with the converted data
    const orderData = {
      products: productsObj,
      subcategories: subcategoriesObj,
      subproducts: subproductsObj,
    };

    // Call the function from your hook to save order data
    saveOrderData(orderData);

    resetState();

    // Close the modal
    closeOrder();

    console.log("Order data saved:", orderData);
  };

  const clearOrder = () => {
    resetState();
  };

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
        <div className="order-btns">
          <div className="modal-btn">
            <button className="clear btn" onClick={clearOrder}>
              Clear
            </button>
            <button className="close btn" onClick={saveOrder}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
