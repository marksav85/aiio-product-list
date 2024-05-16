import { useState, useEffect, useCallback } from "react";
import { useCheckedProducts } from "../context/CheckedProductsContext";

// Custom hook to fetch products, subcategories, and subproducts data
export const useProductsData = () => {
  // State variables to store fetched data

  const { updateProducts } = useCheckedProducts();
  const { updateSubcategories } = useCheckedProducts();
  const { updateSubproducts } = useCheckedProducts();

  // State variables to handle loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data asynchronously
  const fetchData = useCallback(async () => {
    try {
      // Fetch products data
      const productsRes = await fetch("http://localhost:8000/products/");
      if (!productsRes.ok) {
        throw new Error("Failed to fetch products");
      }
      const productsData = await productsRes.json();
      updateProducts(productsData);

      // Fetch subcategories data
      const subcategoriesRes = await fetch(
        "http://localhost:8000/subcategories/"
      );
      if (!subcategoriesRes.ok) {
        throw new Error("Failed to fetch subcategories");
      }
      const subcategoriesData = await subcategoriesRes.json();
      updateSubcategories(subcategoriesData);

      // Fetch subproducts data
      const subproductsRes = await fetch("http://localhost:8000/subproducts/");
      if (!subproductsRes.ok) {
        throw new Error("Failed to fetch subproducts");
      }
      const subproductsData = await subproductsRes.json();
      updateSubproducts(subproductsData);

      // Update loading and error states
      setIsLoading(false);
      setError(null);
    } catch (error) {
      // Set error state if fetching data fails
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  // Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to add a new subproduct
  const createSubProduct = async (subProductData) => {
    try {
      const response = await fetch("http://localhost:8000/subproducts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subProductData),
      });
      if (!response.ok) {
        throw new Error("Failed to add subproduct", subProductData);
      }
      const newSubProduct = await response.json();
      updateSubproducts((prevSubproducts) => [
        ...prevSubproducts,
        newSubProduct,
      ]);
    } catch (error) {
      console.error("Error adding subproduct:", error.message);
    }
  };

  // Function to save order data
  const saveOrderData = async (orderData) => {
    try {
      const response = await fetch("http://localhost:8000/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Failed to post order data");
      }
      const responseData = await response.json();
    } catch (error) {
      console.error("Error posting order data:", error.message);
    }
  };

  // Return the state variables and functions to be used by components
  return {
    isLoading,
    error,
    createSubProduct,
    saveOrderData,
  };
};
