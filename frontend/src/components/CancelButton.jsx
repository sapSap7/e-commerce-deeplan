import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CancelButton = ({ to = "/" }) => {
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  if (!confirm) {
    return (
      <button type="button" onClick={() => setConfirm(true)}>
        Cancel
      </button>
    );
  }

  return (
    <div className="confirm-box">
      <p>Are you sure you want to exit?</p>
      <button type="button" onClick={() => navigate(to)}>
        Yes
      </button>
      <button type="button" onClick={() => setConfirm(false)}>
        No
      </button>
    </div>
  );
};
