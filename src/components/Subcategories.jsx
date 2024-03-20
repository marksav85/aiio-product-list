import "./Subcategories.css";

export default function Subcategories() {
  return (
    <div className="subcategory-section">
      <h4 className="subcategory-title">Select subcategories</h4>
      <div className="subcategory-list">
        <div className="checkbox-item">
          <label>More categories</label>
          <input type="checkbox" />
        </div>
        <div className="checkbox-item">
          <label>More categories</label>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}
