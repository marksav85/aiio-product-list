import "./Navbar.css";

export default function Navbar({ toggleOrderList, toggleNewProduct }) {
  const handleOrder = (event) => {
    event.stopPropagation(); // Stop the event from propagating to the document
    toggleOrderList();
  };

  const handleNewProduct = (event) => {
    event.stopPropagation(); // Stop the event from propagating to the document
    toggleNewProduct();
  };

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <span>Product List</span>
        </li>
        <li>
          {/* Button to toggle New Product visibility */}
          <button className="btn" onClick={handleNewProduct}>
            Create SubProduct
          </button>
        </li>

        <li>
          {/* Button to toggle Order List visibility */}
          <button className="btn" onClick={handleOrder}>
            Done
          </button>
        </li>
      </ul>
    </div>
  );
}
