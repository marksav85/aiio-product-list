import { useState, useEffect } from "react";
// Import context hook for managing checked products
import { useCheckedProducts } from "../context/CheckedProductsContext";
// Import custom hook for fetching products data
import { useProductsData } from "../hooks/useProductsData";
// Import CSS
import "./ModalOrderList.css";

// Component for displaying the modal order list
export default function ModalOrderList() {
  // Retrieve products, subcategories, subproducts, saveOrderData, isLoading, and error from the useProductsData hook
  const { saveOrderData, isLoading, error } = useProductsData();

  // Retrieve products, subcategories, and subproducts from the useCheckedProducts hook
  const { products, subcategories, subproducts } = useCheckedProducts();

  // Retrieve checked products, subcategories, subproducts, and resetState function using the useCheckedProducts hook
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

  // Retrieve orderVisible and toggleOrderList function using the useCheckedProducts hook
  const { orderVisible } = useCheckedProducts();
  const { toggleOrderList } = useCheckedProducts();

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

  // Close modal when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".modal");
      if (modal && !modal.contains(event.target)) {
        // Prevent the default behavior of the click event
        event.preventDefault();
        event.stopPropagation();
        toggleOrderList();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [toggleOrderList]);

  // Display loading message while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Display error message if an error occurs during data fetching
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to save order data and reset state
  const saveOrder = () => {
    const productsArray = checkedProducts.map((product) => ({
      productId: product.productId,
      productName: product.productName,
    }));

    const subcategoriesArray = checkedSubcategories.map((subcategory) => ({
      subcategoryId: subcategory.subCategoryId,
      subcategoryName: subcategory.subCategoryName,
    }));

    const subproductsArray = checkedSubproducts.map((subproducts) => ({
      subproductsId: subproducts.subProductId,
      subproductsName: subproducts.subProductName,
    }));

    // Construct the orderData object
    const orderData = {
      products: productsArray,
      subcategories: subcategoriesArray,
      subproducts: subproductsArray,
    };

    // Call the saveOrderData function to save order data
    saveOrderData(orderData);

    // Reset state
    resetState();

    // Close the modal
    toggleOrderList();

    console.log("Order data saved:", orderData);
  };

  // Function to clear order and reset state
  const clearOrder = () => {
    // Reset state
    resetState();

    // Close the modal
    toggleOrderList();
  };

  return (
    <>
      {orderVisible && (
        // Modal container
        <div className="modal">
          <div className="modal-content">
            {/* Display selected products */}
            <div className="modal-products">
              <h4>Products:</h4>
              {modalProducts.length > 0 ? (
                modalProducts.map((productName, index) => (
                  <p key={index}>{productName}</p>
                ))
              ) : (
                <p>No products selected</p>
              )}
            </div>
            {/* Display selected subcategories */}
            <div className="modal-subcategories">
              <h4>SubCategories:</h4>
              {modalSubcategories.length > 0 ? (
                modalSubcategories.map((subcategory, index) => (
                  <p key={index}>{subcategory}</p>
                ))
              ) : (
                <p>No sub-categories selected</p>
              )}
            </div>
            {/* Display selected subproducts */}
            <div className="modal-subproducts">
              <h4>SubProducts:</h4>
              {modalSubproducts.length > 0 ? (
                modalSubproducts.map((subProductName, index) => (
                  <p key={index}>{subProductName}</p>
                ))
              ) : (
                <p>No sub-products selected</p>
              )}
            </div>
            {/* Buttons for clearing or saving order */}
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
      )}
    </>
  );
}
