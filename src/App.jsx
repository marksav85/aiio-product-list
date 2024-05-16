import Products from "./components/Products";
import Navbar from "./components/Navbar";
import ModalOrderList from "./components/ModalOrderList";
import ModalNewProduct from "./components/ModalNewProduct";
import { CheckedProductsProvider } from "./context/CheckedProductsContext";
import "./App.css";

function App() {
  return (
    <CheckedProductsProvider>
      <div className="App">
        <Navbar />
        <Products />
        <ModalOrderList />
        <ModalNewProduct />
      </div>
    </CheckedProductsProvider>
  );
}

export default App;
