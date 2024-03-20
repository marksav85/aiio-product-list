import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <span>Product List</span>
        </li>

        <li>
          <button className="btn">Done</button>
        </li>
      </ul>
    </div>
  );
}
