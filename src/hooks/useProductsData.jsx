import { useState, useEffect } from "react";

export const useProductsData = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subproducts, setSubproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch("http://localhost:8000/products/");
        if (!productsRes.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await productsRes.json();
        setProducts(productsData);

        const subcategoriesRes = await fetch(
          "http://localhost:8000/subcategories/"
        );
        if (!subcategoriesRes.ok) {
          throw new Error("Failed to fetch subcategories");
        }
        const subcategoriesData = await subcategoriesRes.json();
        setSubcategories(subcategoriesData);

        const subproductsRes = await fetch(
          "http://localhost:8000/subproducts/"
        );
        if (!subproductsRes.ok) {
          throw new Error("Failed to fetch subproducts");
        }
        const subproductsData = await subproductsRes.json();
        setSubproducts(subproductsData);

        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      setSubproducts([...subproducts, newSubProduct]); // Update subproducts state with the newly added subproduct
      console.log("Subproduct added:", newSubProduct);
    } catch (error) {
      console.error("Error adding subproduct:", error.message);
    }
  };

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
      console.log("Order data saved:", responseData);
    } catch (error) {
      console.error("Error posting order data:", error.message);
    }
  };

  return {
    products,
    subcategories,
    subproducts,
    isLoading,
    error,
    createSubProduct,
    saveOrderData,
  };
};
