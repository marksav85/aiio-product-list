import "./Navbar.css";
import { useCheckedProducts } from "../context/CheckedProductsContext";

// Component for displaying the navigation bar with buttons to toggle visibility of order list and new product form
export default function Navbar() {
  const { toggleOrderList } = useCheckedProducts();
  // Function to handle toggling visibility of order list
  const handleOrder = (event) => {
    event.stopPropagation(); // Stop the event from propagating to the document
    toggleOrderList();
  };

  return (
    <div className="navbar">
      <ul>
        {/* Logo */}
        <li className="logo">
          <span>Product List</span>
        </li>
        {/* Button to toggle Order List visibility */}
        <li>
          <button className="btn" onClick={handleOrder}>
            Done
          </button>
        </li>
      </ul>
    </div>
  );
}
