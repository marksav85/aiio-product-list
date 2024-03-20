import Subcategories from "./Subcategories";
import "./Products.css";

export default function Products() {
  return (
    <div>
      <h2 className="page-title">Products</h2>
      <div className="project-list">
        <div className="checkbox-item">
          <label>Electric Motors</label>
          <input type="checkbox" />
        </div>
        <Subcategories />
        <div className="checkbox-item">
          <label>Communication Equipment</label>
          <input type="checkbox" />
        </div>
        <Subcategories />
      </div>
    </div>
  );
}
