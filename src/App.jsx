import { useState } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Modalbox from "./components/Modalbox";
import { CheckedProductsProvider } from "./context/CheckedProductsContext";

import "./App.css";

function App() {
  // State to manage modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <CheckedProductsProvider>
      <div className="App">
        <Navbar toggleModal={toggleModal} />
        <Products />
        {/* Render Modal component if modalVisible is true */}
        {modalVisible && <Modalbox closeModal={toggleModal} />}
      </div>
    </CheckedProductsProvider>
  );
}

export default App;
