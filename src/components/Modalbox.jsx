import { useEffect } from "react";
import "./Modalbox.css";

export default function Modalbox({ closeModal }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".modal");
      if (modal && !modal.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("click", handleClickOutside);
    console.log("Event listener added");

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeModal]);

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
