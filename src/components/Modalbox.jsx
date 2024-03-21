import "./Modalbox.css";

export default function Modalbox({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <h4>Products:</h4>
          <p>Insert data here</p>
        </div>
        <div>
          <h4>SubCategories:</h4>
          <p>Insert data here</p>
        </div>
        <div>
          <h4>SubProducts:</h4>
          <p>Insert data here</p>
        </div>
        <span className="close" onClick={closeModal}>
          Close
        </span>
      </div>
    </div>
  );
}
