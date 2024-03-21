import "./Navbar.css";

export default function Navbar({ toggleModal }) {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <span>Product List</span>
        </li>

        <li>
          {/* Button to toggle modal visibility */}
          <button className="btn" onClick={toggleModal}>
            Done
          </button>
        </li>
      </ul>
    </div>
  );
}
