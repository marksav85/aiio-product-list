import { useState } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Modalbox from "./components/Modalbox";

import "./App.css";

function App() {
  // State to manage modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div className="App">
      <Navbar toggleModal={toggleModal} />
      <Products />
      {/* Render Modal component if modalVisible is true */}
      {modalVisible && <Modalbox closeModal={toggleModal} />}
    </div>
  );
}

export default App;
