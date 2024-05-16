import { createContext, useState, useContext } from "react";

// Create a context to hold the value of checkedProducts
const CheckedProductsContext = createContext();

// Custom hook to consume the context
export const useCheckedProducts = () => useContext(CheckedProductsContext);

// Context provider component
export const CheckedProductsProvider = ({ children }) => {
  // State variables to store checked products, subcategories, and subproducts
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [checkedSubcategories, setCheckedSubcategories] = useState([]);
  const [checkedSubproducts, setCheckedSubproducts] = useState([]);
  // State variables to manage the visibility of the new product modal and order list
  const [newProductVisible, setNewProductVisible] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);
  // State variables to store products, subcategories, and subproducts data
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subproducts, setSubproducts] = useState([]);

  // Function to update state and replace existing data with new data
  const updateStateAndReplaceData = (setter, newData) => {
    setter(newData);
  };

  // Function to update products data
  const updateProducts = (data) => {
    setProducts(data);
  };

  // Function to update subcategories data
  const updateSubcategories = (data) => {
    setSubcategories(data);
  };

  // Function to update subproducts data
  const updateSubproducts = (data) => {
    setSubproducts(data);
  };

  // Function to reset state variables to empty arrays
  const resetState = () => {
    setCheckedProducts([]);
    setCheckedSubcategories([]);
    setCheckedSubproducts([]);
  };

  // Function to toggle the visibility of the new product modal
  const toggleNewProduct = () => {
    setNewProductVisible(!newProductVisible);
  };

  // Function to toggle the visibility of the order list
  const toggleOrderList = () => {
    setOrderVisible(!orderVisible);
  };

  // Provide the state variables and functions to the context
  return (
    <CheckedProductsContext.Provider
      value={{
        checkedProducts,
        setCheckedProducts: (data) =>
          updateStateAndReplaceData(setCheckedProducts, data),
        checkedSubcategories,
        setCheckedSubcategories: (data) =>
          updateStateAndReplaceData(setCheckedSubcategories, data),
        checkedSubproducts,
        setCheckedSubproducts: (data) =>
          updateStateAndReplaceData(setCheckedSubproducts, data),
        resetState,
        toggleNewProduct,
        newProductVisible,
        toggleOrderList,
        orderVisible,
        products,
        subcategories,
        subproducts,
        updateProducts,
        updateSubcategories,
        updateSubproducts,
      }}
    >
      {children}
    </CheckedProductsContext.Provider>
  );
};
