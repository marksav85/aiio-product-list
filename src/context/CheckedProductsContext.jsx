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

  // Function to update state and preserve existing data
  const updateStateAndPreserveData = (setter, newData) => {
    setter((prevState) => [...prevState, ...newData]);
  };

  return (
    <CheckedProductsContext.Provider
      value={{
        checkedProducts,
        setCheckedProducts: (data) =>
          updateStateAndPreserveData(setCheckedProducts, data),
        checkedSubcategories,
        setCheckedSubcategories: (data) =>
          updateStateAndPreserveData(setCheckedSubcategories, data),
        checkedSubproducts,
        setCheckedSubproducts: (data) =>
          updateStateAndPreserveData(setCheckedSubproducts, data),
      }}
    >
      {children}
    </CheckedProductsContext.Provider>
  );
};
