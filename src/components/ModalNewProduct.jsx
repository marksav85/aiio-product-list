import { useEffect, useState } from "react";
import "./ModalNewProduct.css";
import { useProductsData } from "../hooks/useProductsData";

export default function ModalNewProduct({ createProduct }) {
  // Retrieve createSubProduct function and subproducts data using custom hook
  const { createSubProduct, subproducts } = useProductsData();

  // State variable to store the value of the new subproduct
  const [subProduct, setSubProduct] = useState("");

  // Handler function to update the value of the new subproduct
  const handleSubProductChange = (event) => {
    setSubProduct(event.target.value);
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
      subProductName: subProduct,
      subCategoryId: 10, // Example subcategory ID
    };

    // Call the function to create the new subproduct
    createSubProduct(subProductData);

    // Clear the input field after submission
    setSubProduct("");

    // Trigger the parent component to update after creating the new product
    createProduct();
  };

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

  return (
    <div className="modal new-product">
      <div className="modal-content new-product-content">
        <h2>Add a New Product</h2>
        <form className="new-product-form" onSubmit={handleSubmit}>
          <label>
            <span>Add SubProduct</span>
            {/* Input field for entering the new subproduct */}
            <input
              type="text"
              value={subProduct}
              onChange={handleSubProductChange}
              required
            />
          </label>
          {/* Button to submit the new subproduct */}
          <div className="modal-btn">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
