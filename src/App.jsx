import { useState } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import ModalOrderList from "./components/ModalOrderList";
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
        {modalVisible && <ModalOrderList saveModal={toggleModal} />}
      </div>
    </CheckedProductsProvider>
  );
}

export default App;
