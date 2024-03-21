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
  console.log("productContext:", checkedProducts);
  console.log("subCategoryContext:", checkedSubcategories);
  console.log("subProductContext:", checkedSubproducts);

  return (
    <CheckedProductsContext.Provider
      value={{
        checkedProducts,
        setCheckedProducts,
        checkedSubcategories,
        setCheckedSubcategories,
        checkedSubproducts,
        setCheckedSubproducts,
      }}
    >
      {children}
    </CheckedProductsContext.Provider>
  );
};
