import { useState } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import ModalOrderList from "./components/ModalOrderList";
import ModalNewProduct from "./components/ModalNewProduct";
import { CheckedProductsProvider } from "./context/CheckedProductsContext";

import "./App.css";

function App() {
  // State to manage modal visibility
  const [orderVisible, setOrderVisible] = useState(false);
  const [newProductVisible, setNewProductVisible] = useState(false);

  // Function to toggle modal visibility
  const toggleOrderList = () => {
    setOrderVisible(!orderVisible);
  };

  const toggleNewProduct = () => {
    setNewProductVisible(!newProductVisible);
  };

  return (
    <CheckedProductsProvider>
      <div className="App">
        <Navbar
          toggleOrderList={toggleOrderList}
          toggleNewProduct={toggleNewProduct}
        />
        <Products />
        {/* Render Modal component if modalVisible is true */}
        {orderVisible && <ModalOrderList saveOrder={toggleOrderList} />}
        {newProductVisible && (
          <ModalNewProduct createProduct={toggleNewProduct} />
        )}
      </div>
    </CheckedProductsProvider>
  );
}

export default App;
