import { useEffect, useState } from "react";
import "./ModalNewProduct.css";
import { useProductsData } from "../hooks/useProductsData";
import { useCheckedProducts } from "../context/CheckedProductsContext";

export default function ModalNewProduct() {
  // Access createSubProduct function from context
  const { createSubProduct } = useProductsData();
  // Access subproducts state from context
  const { subproducts } = useCheckedProducts();
  // Access newProductVisible, newSubproductCatId, and toggleNewProduct function from context
  const { newProductVisible, newSubproductCatId, toggleNewProduct } =
    useCheckedProducts();
  // State variable to store the value of the new subproduct
  const [newSubproduct, setNewSubproduct] = useState("");

  // Handler function to update the value of the new subproduct
  const handleSubProductChange = (event) => {
    setNewSubproduct(event.target.value);
  };

  // Handler function to submit the new subproduct
  const handleSubmit = (event) => {
    event.preventDefault();

    // Calculate the ID for the new subproduct
    const subProductTotal = subproducts.length;
    const nextSubProductId = subProductTotal + 1;

    // Construct the data for the new subproduct
    const subProductData = {
      subProductId: nextSubProductId,
      subProductName: newSubproduct,
      subCategoryId: newSubproductCatId, // subcategory ID of added subproduct
    };

    // Call the function to create the new subproduct
    createSubProduct(subProductData);
    console.log(subProductData);

    // Clear the input field after submission
    setNewSubproduct("");

    // Close the modal after submission
    toggleNewProduct();
  };

  // Close modal when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".modal");
      if (modal && !modal.contains(event.target)) {
        // Prevent the default behavior of the click event
        event.preventDefault();
        event.stopPropagation();
        toggleNewProduct();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [toggleNewProduct]);

  return (
    <>
      {newProductVisible && (
        <div className="modal new-product">
          <div className="modal-content new-product-content">
            {/* Close button */}
            <div className="np-close-btn">
              <button onClick={toggleNewProduct}>X</button>
            </div>
            <div className="np-title">
              <h2>Add a New Product</h2>
            </div>

            <form className="new-product-form" onSubmit={handleSubmit}>
              <label>
                <span>Add SubProduct</span>
                {/* Input field for entering the new subproduct */}
                <input
                  type="text"
                  value={newSubproduct}
                  onChange={handleSubProductChange}
                  required
                />
              </label>
              {/* Button to submit form */}
              <div className="order-btns">
                <div className="modal-btn">
                  <button className="close btn" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
