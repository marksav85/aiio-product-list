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
        console.log("productsData", productsData);

        const subcategoriesRes = await fetch(
          "http://localhost:8000/subcategories/"
        );
        if (!subcategoriesRes.ok) {
          throw new Error("Failed to fetch subcategories");
        }
        const subcategoriesData = await subcategoriesRes.json();
        setSubcategories(subcategoriesData);
        console.log("subcategoriesData", subcategoriesData);

        const subproductsRes = await fetch(
          "http://localhost:8000/subproducts/"
        );
        if (!subproductsRes.ok) {
          throw new Error("Failed to fetch subproducts");
        }
        const subproductsData = await subproductsRes.json();
        setSubproducts(subproductsData);
        console.log("subproductsData", subproductsData);

        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, subcategories, subproducts, isLoading, error };
};
