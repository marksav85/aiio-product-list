import "./Navbar.css";

export default function Navbar({ toggleModal }) {
  const handleClick = (event) => {
    event.stopPropagation(); // Stop the event from propagating to the document
    toggleModal();
  };
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <span>Product List</span>
        </li>

        <li>
          {/* Button to toggle modal visibility */}
          <button className="btn" onClick={handleClick}>
            Done
          </button>
        </li>
      </ul>
    </div>
  );
}
