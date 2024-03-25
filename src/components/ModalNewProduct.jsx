import { useEffect, useState } from "react";
import "./ModalNewProduct.css";
import { useProductsData } from "../hooks/useProductsData";

export default function ModalNewProduct({ createProduct }) {
  const { createSubProduct, subproducts } = useProductsData();
  const [subProduct, setSubProduct] = useState("");

  const handleSubProductChange = (event) => {
    setSubProduct(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subProductTotal = subproducts.length;
    const nextSubProductId = subProductTotal + 1;

    const subProductData = {
      subProductId: nextSubProductId,
      subProductName: subProduct,
      subCategoryId: 10,
    };
    console.log("Create subProductData", subProductData);

    createSubProduct(subProductData);

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
