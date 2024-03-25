import { useEffect, useState } from "react";
import "./ModalNewProduct.css";

export default function ModalNewProduct({ createProduct }) {
  const [subProduct, setSubProduct] = useState("");

  const handleSubProductChange = (event) => {
    setSubProduct(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle submitting the subProduct data
    console.log("Subproduct added:", subProduct);
    // Reset the form after submission
    setSubProduct("");
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
            <input
              type="text"
              value={subProduct}
              onChange={handleSubProductChange}
              required
            />
          </label>
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
