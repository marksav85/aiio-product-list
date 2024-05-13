import { createContext, useState, useContext } from "react";

// Create a context to hold the value of checkedProducts
const CheckedProductsContext = createContext();

// Custom hook to consume the context
export const useCheckedProducts = () => useContext(CheckedProductsContext);

// Context provider component
export const CheckedProductsProvider = ({ children }) => {
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [checkedSubcategories, setCheckedSubcategories] = useState([]);
  const [checkedSubproducts, setCheckedSubproducts] = useState([]);

  // Function to update state and replace existing data with new data
  const updateStateAndReplaceData = (setter, newData) => {
    setter(newData);
  };

  // Function to reset state variables to empty arrays
  const resetState = () => {
    setCheckedProducts([]);
    setCheckedSubcategories([]);
    setCheckedSubproducts([]);
  };

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
      }}
    >
      {children}
    </CheckedProductsContext.Provider>
  );
};
