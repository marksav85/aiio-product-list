import "./Navbar.css";

// Component for displaying the navigation bar with buttons to toggle visibility of order list and new product form
export default function Navbar({ toggleOrderList, toggleNewProduct }) {
  // Function to handle toggling visibility of order list
  const handleOrder = (event) => {
    event.stopPropagation(); // Stop the event from propagating to the document
    toggleOrderList();
  };

  // Function to handle toggling visibility of new product form
  const handleNewProduct = (event) => {
    event.stopPropagation(); // Stop the event from propagating to the document
    toggleNewProduct();
  };

  return (
    <div className="navbar">
      <ul>
        {/* Logo */}
        <li className="logo">
          <span>Product List</span>
        </li>
        {/* Button to toggle New Product visibility */}
        <li>
          <button className="btn" onClick={handleNewProduct}>
            Create SubProduct
          </button>
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
